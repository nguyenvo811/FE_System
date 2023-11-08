import React, { useEffect, useState } from "react";
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";

export default function Cart() {
  // const [products, setProducts] = useState([]);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

	const products = {
		cartItem: [{
		product: {
			images: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
			productName: "iPhone 15",

		}
	}]
}

  const productsCart = products?.cartItem?.map((val, index) => {
    return (
      <div key={index} class="pb-6 mb-2 border-b border-gray-400">
        <div className="flex md:items-center md:justify-center text-sm font-medium mt-6 gap-4">
          <div className="h-[160px] w-[200px] max-sm:w-[300px]" >
            <img className="w-full h-full object-cover rounded-lg" src={val.product.images} />
          </div> 
          <div className="grid w-full md:grid-cols-3 gap-2 break-all justify-between md:items-center">
            <div>
              <h2 className="max-sm:hidden">Product Name</h2>
              <span className="text-gray-700 max-sm:font-bold max-sm:text-lg">{val.product.productName}</span>
            </div>
            <div>
              <h2 className="max-sm:hidden">Color</h2>
              <span className="text-gray-700">Describe in note</span>
            </div>
            <div>
              <h2 className="max-sm:hidden">Version</h2>
              <span className="text-gray-700">Describe in note</span>
            </div>
            <div>
              <h2 className="max-sm:hidden">Price</h2>
              <strong className="text-gray-700">0</strong>
            </div>
            <div>
              <h2 className="max-sm:hidden">Status</h2>
              <strong className="text-gray-700">0 products left</strong>
            </div>
            <div>
              <h2 className="max-sm:hidden">Quantity</h2>
              <div className="md:mt-1 flex w-[90px] text-lg rounded-md border border-gray-400">
                <button 
                  className="h-6 w-6 leading-6 text-gray-800 transition hover:opacity-75"
                  type="button" 
                  // onClick={() => upadateQuantity(val.product._id, val.quantity, -1)}
									>-</button>
                <input 
                  id="quantity"
                  className="h-6 w-10 border-r border-l border-gray-400 text-center [-moz-appearance:_textfield] md:text-sm max-sm:text-xs [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                  type="numer"
                  // onChange={e => (e.target.value)}
                  // value={val.quantity}
                  />
                <button 
                  className="h-6 w-6 leading-6 text-gray-600 transition hover:opacity-75"
                  type="button" 
                  // onClick={() => upadateQuantity(val.product._id, val.quantity, 1)}
									>+</button>
              </div>
            </div>
          </div>
          <IconButton
                aria-label="close"
                // onClick={() => handleRemoveProduct(val.product._id)}
                sx={{
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon fontSize="small"/>
            </IconButton>
        </div>
      </div>
    )
  })
    

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
                          <label htmlFor="fullName" className="font-medium text-gray-800">Full Name</label>
                          <div class="p-1 mt-1 border border-gray-400 rounded-md focus-within:ring sm:flex sm:items-center sm:gap-4">
                            <input 
                              name="fullName" 
                              id="fullName"
                              type="text"
                              class="w-full border-none border-transparent focus:border-transparent focus:ring-0 sm:text-sm" 
                              placeholder="Your name"
                            //   value={user.fullName}
                            //   onChange={handleChangeInput}
                              />
                          </div>
                          {/* <p class="mt-1 text-sm text-red-500"> 
                            {error.fullName}
                          </p> */}
                        </div>

                        <div className="md:col-span-5">
                          <label htmlFor="email" className="font-medium text-gray-800">Email Address</label>
                          <div class="p-1 mt-1 border border-gray-400 rounded-md focus-within:ring sm:flex sm:items-center sm:gap-4">
                            <input 
                              type="email" 
                              name="email" 
                              id="email" 
                              class="w-full border-none border-transparent focus:border-transparent focus:ring-0 sm:text-sm" 
                              placeholder="email@domain.com" 
                              // value={user.email}
                              // onChange={handleChangeInput}
                              />
                          </div>
                          {/* <p class="mt-1 text-sm text-red-500"> 
                            {error.email}
                          </p> */}
                        </div>

                        <div className="md:col-span-5">
                          <label htmlFor="phoneNumber" className="font-medium text-gray-800">Phone number</label>
                          <div class="p-1 mt-1 border border-gray-400 rounded-md focus-within:ring sm:flex sm:items-center sm:gap-4">
                            <input 
                              type="text" 
                              name="phoneNumber" 
                              id="phoneNumber" 
                              class="w-full border-none border-transparent focus:border-transparent focus:ring-0 sm:text-sm" 
                              placeholder="+84123456789" 
                              // value={user.phoneNumber}
                              // onChange={handleChangeInput}
                              />                     
                          </div>
                          {/* <p class="mt-1 text-sm text-red-500"> 
                            {error.phoneNumber}
                          </p> */}
                        </div>

                        <div className="md:col-span-5">
                          <label htmlFor="address" className="font-medium text-gray-800">Address</label>
                          <div class="p-1 mt-1 border border-gray-400 rounded-md focus-within:ring sm:flex sm:items-center sm:gap-4">
                            <input 
                              type="text" 
                              name="address" 
                              id="address" 
                              class="w-full border-none border-transparent focus:border-transparent focus:ring-0 sm:text-sm" 
                              placeholder="Address/Ward/District/City/Province" 
                              // value={newAddress}
                              // onChange={handleNewAddress}
                              />
                          </div>
                          {/* <p class="mt-1 text-sm text-red-500"> 
                            {error.address}
                          </p> */}
                        </div>

                        <div className="md:col-span-5">
                          <label htmlFor="note" className="font-medium text-gray-800">Note</label>
                          <div class="p-1 mt-1 border border-gray-400 rounded-md focus-within:ring sm:flex sm:items-center sm:gap-4">
                            <textarea
                              type="text" 
                              name="note" 
                              id="note" 
                              class="w-full border-none border-transparent focus:border-transparent focus:ring-0 sm:text-sm" 
                              placeholder="Please describe your product color and version here!" 
                              // value={note}
                              // onChange={handleNote}
                              />
                          </div>
                          {/* <p class="mt-1 text-sm text-red-500"> 
                            {error.note}
                          </p> */}
                        </div>
                      </div>
                    </div>
                  </form>
                  <div class="md:col-span-5 mt-4 text-right">
                    <div class="inline-flex items-end">
                      <button 
                        // onClick={() => handleOrer()}
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
                  <span class="title-font font-bold text-2xl text-gray-800">Total: 0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}   