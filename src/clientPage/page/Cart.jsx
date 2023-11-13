import React, { useEffect, useState } from "react";
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import { addToCart, createOrder, deleteCart, deleteProductFromCart, viewCart } from "../../api/apiServices";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    viewCart()
      .then(res => {
        setProducts(res.data.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  console.log(products)

  const [shippingInfo, setShippingInfo] = useState({
    username: "",
    shippingAddress: "",
    phoneNumber: "",
    note: ""
  });

  const [error, setError] = useState({
    username: "",
    shippingAddress: "",
    phoneNumber: ""
  });

  const handleChangeInput = (e) => {
    let { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value })
    setError({ ...error, [name]: "" })
  }

  const validation = () => {
    let msg = {}
    if (shippingInfo.username === "") {
      msg.email = "Full name field is required!"
    } if (shippingInfo.phoneNumber === "") {
      msg.phoneNumber = "Phone number field is required!"
    } if (shippingInfo.shippingAddress === "") {
      msg.address = "Shipping address field is required!"
    }

    setError(msg)
    console.log("validating")
    if (Object.keys(msg).length > 0) {
      return false
    } else {
      return true
    }
  };

  const clearState = () => {
    setError({
      username: "",
      shippingAddress: "",
      phoneNumber: ""
    })
    setShippingInfo({
      username: "",
      shippingAddress: "",
      phoneNumber: "",
      note: ""
    })
  }

  const handleRemoveProduct = async (id, color, version) => {
    const data = {
      product: id,
      color: color,
      version: version
    }
    deleteProductFromCart(data)
      .then(() => {
        // setProducts(oldProducts => ({...oldProducts, cartItem: oldProducts.cartItem.filter(p => p.product._id != id)}));
        viewCart()
          .then(res => {
            setProducts(res.data.data)
          })
      })
      .catch(error => {
        console.log(error)
      })
  }

  const upadateQuantity = (id, color, version, quantity, number) => {
    const data = {
      product: id,
      color: color,
      version: version,
      quantity: number,
    }

    const totalQuantity = quantity + number
    if (totalQuantity < 1) {
      deleteProductFromCart(id)
        .then(() => {
          viewCart()
            .then(res => {
              setProducts(res.data.data)
            })
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      addToCart(data)
        .then(() => {
          viewCart()
            .then(res => {
              setProducts(res.data.data)
            })
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  const productsCart = products?.cartItem?.map((val, index) => {

    const getProductDetail = val?.product?.variants.find(value => value._id === val.color)
    const getColor = getProductDetail?.moreVariants?.map(value => value);
    const findVersion = getColor?.find(value => value._id === val.version)
    console.log(getProductDetail?.color)
    return (
      <div key={index} class="pb-6 mb-2 border-b border-gray-400">
        <div className="flex md:items-center md:justify-center text-sm font-medium mt-6 gap-4">
          <div className="h-[160px] w-[200px] max-sm:w-[300px]" >
            <img className="w-full h-full object-cover rounded-lg" src={getProductDetail?.images[0]} />
          </div>
          <div className="grid w-full md:grid-cols-3 gap-2 break-all justify-between md:items-center">
            <div>
              <h2 className="max-sm:hidden">Product Name</h2>
              <span className="text-gray-700 max-sm:font-bold max-sm:text-lg">{val?.product?.productName}</span>
            </div>
            <div>
              <h2 className="max-sm:hidden">Color</h2>
              <span className="text-gray-700">{getProductDetail?.color}</span>
            </div>
            <div>
              <h2 className="max-sm:hidden">Version</h2>
              <span className="text-gray-700">{findVersion?.version}</span>
            </div>
            <div>
              <h2 className="max-sm:hidden">Price</h2>
              <strong className="text-gray-700">{findVersion?.price}</strong>
            </div>
            <div>
              <h2 className="max-sm:hidden">Status</h2>
              <strong className="text-gray-700">{findVersion?.quantity} products left</strong>
            </div>
            <div>
              <h2 className="max-sm:hidden">Quantity</h2>
              <div className="md:mt-1 flex w-[90px] text-lg rounded-md border border-gray-400">
                <button
                  className="h-6 w-6 leading-6 text-gray-800 transition hover:opacity-75"
                  type="button"
                  onClick={() => upadateQuantity(val?.product?._id, val?.color, val?.version, val?.quantity, -1)}
                >-</button>
                <input
                  id="quantity"
                  className="h-6 w-10 border-r border-l border-gray-400 text-center [-moz-appearance:_textfield] md:text-sm max-sm:text-xs [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                  type="numer"
                  onChange={e => (e.target.value)}
                  value={val?.quantity}
                />
                <button
                  className="h-6 w-6 leading-6 text-gray-600 transition hover:opacity-75"
                  type="button"
                  onClick={() => upadateQuantity(val?.product?._id, val?.color, val?.version, val?.quantity, 1)}
                >+</button>
              </div>
            </div>
          </div>
          <IconButton
            aria-label="close"
            onClick={() => handleRemoveProduct(val?.product?._id, val?.color, val?.version)}
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
    )
  })

  const handleOrer = async () =>{
    const isValid = validation()
    if (isValid){
      const data = {
        username: shippingInfo.username,
        shippingAddress: shippingInfo.shippingAddress,
        phoneNumber: shippingInfo.phoneNumber,
        note: shippingInfo.note,
        orderDetail: products.cartItem,
        totalPrice: products.totalPrice
      }
      console.log(data)
      createOrder(data)
      .then(res => {
        console.log(res.data.data)
        deleteCart(products._id)
        .then(res => {
          clearState()
          // navigate("/orders")
          console.log(res.data.data)
        })
        .catch(error => {
          console.log(error)
        })
      })
      .catch(error => {
        console.log(error)
      })
    }
  }

  return (
    <div className="m-auto py-4 pt-10 relative">
      <div class="bg-white rounded-lg border">
        <div class="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
          <div class="lg:grid lg:grid-cols-2 text-left">
            <div class="py-8 border-b border-gray-400 lg:order-last lg:border-b-0 lg:border-l lg:py-16 lg:pl-10">
              <div class="block text-green-400 lg:hidden">
              </div>

              <div class="mt-8 space-y-4 lg:mt-0">
                <h2 class="text-2xl font-medium text-gray-800">Order's Information</h2>
                <span class="block w-10 h-1 bg-green-400 rounded"></span>
                <div>
                  <form class="w-full">
                    <div class="lg:col-span-2">
                      <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">

                        <div className="md:col-span-5">
                          <label htmlFor="username" className="font-medium text-gray-800">Full name</label>
                          <div class="p-1 mt-1 border border-gray-400 rounded-md focus-within:ring sm:flex sm:items-center sm:gap-4">
                            <input
                              name="username"
                              id="username"
                              type="text"
                              class="w-full border-none border-transparent focus:border-transparent focus:ring-0 sm:text-sm"
                              placeholder="Your full name"
                              value={shippingInfo.username}
                              onChange={handleChangeInput}
                            />
                          </div>
                          <p class="mt-1 text-sm text-red-500"> 
                            {error.username}
                          </p>
                        </div>

                        <div className="md:col-span-5">
                          <label htmlFor="phoneNumber" className="font-medium text-gray-800">Phone number</label>
                          <div class="p-1 mt-1 border border-gray-400 rounded-md focus-within:ring sm:flex sm:items-center sm:gap-4">
                            <input
                              id="phoneNumber"
                              name="phoneNumber"
                              type="text"
                              class="w-full border-none border-transparent focus:border-transparent focus:ring-0 sm:text-sm"
                              placeholder="+84123456789"
                              value={shippingInfo.phoneNumber}
                              onChange={handleChangeInput}
                            />
                          </div>
                          <p class="mt-1 text-sm text-red-500"> 
                            {error.phoneNumber}
                          </p>
                        </div>

                        <div className="md:col-span-5">
                          <label htmlFor="shippingAddress" className="font-medium text-gray-800">Shipping address</label>
                          <div class="p-1 mt-1 border border-gray-400 rounded-md focus-within:ring sm:flex sm:items-center sm:gap-4">
                            <input
                              id="shippingAddress"
                              name="shippingAddress"
                              type="text"
                              class="w-full border-none border-transparent focus:border-transparent focus:ring-0 sm:text-sm"
                              placeholder="Your address details to deliver"
                              value={shippingInfo.shippingAddress}
                              onChange={handleChangeInput}
                            />
                          </div>
                          <p class="mt-1 text-sm text-red-500"> 
                            {error.shippingAddress}
                          </p>
                        </div>

                        <div className="md:col-span-5">
                          <label htmlFor="note" className="font-medium text-gray-800">Note</label>
                          <div class="p-1 mt-1 border border-gray-400 rounded-md focus-within:ring sm:flex sm:items-center sm:gap-4">
                            <textarea                                        
                              id="note"
                              name="note"
                              type="text"
                              class="w-full border-none border-transparent focus:border-transparent focus:ring-0 sm:text-sm"
                              placeholder="Please describe your product color and version here!"
                              value={shippingInfo.note}
                              onChange={handleChangeInput}
                            />
                          </div>
                          <p class="mt-1 text-sm text-red-500"> 
                            {error.note}
                          </p>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div class="md:col-span-5 mt-4 text-right">
                    <div class="inline-flex items-end">
                      <button
                        onClick={() => handleOrer()}
                        class="w-full px-6 py-3 mt-1 text-sm font-bold tracking-wide text-white uppercase transition-none bg-green-400 rounded hover:bg-teal-600 sm:mt-0 sm:w-auto sm:flex-shrink-0">Purchase</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="py-8 lg:py-16 lg:pr-10">
              <div class="mt-8 space-y-4 lg:mt-0">
                <h2 class="text-2xl font-medium text-gray-800">Your Cart</h2>
                <span class="block w-10 h-1 bg-green-400 rounded"></span>
                {productsCart}
                <div class="grid justify-end items-center">
                  <span class="title-font font-bold text-2xl text-gray-800">Total: {products.totalPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}   