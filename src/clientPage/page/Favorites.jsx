import React, { useContext, useEffect, useState } from "react";
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import { viewWishList, addToCart, deleteProductFromWishList} from "../../api/apiServices";
import FormatCurrency from "../../asset/FormatCurrency";
import StateContext from "../component/StateContext";

function useStateContext() {
  // Get the context value
  const context = useContext(StateContext);

  // Throw an error if the context is undefined
  if (context === undefined) {
    throw new Error('useStateContext must be used within a StateContext.Provider');
  }

  // Return the context value
  return context;
}

export default function Favorites() {
  const { countCartTotal, countFavTotal } = useStateContext();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    viewWishList()
    .then(res => {
      console.log(res.data.data)
      setProducts(res.data.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  const handleRemoveProduct = (id, color, version) => {
    const data = {
      product: id,
      color: color,
      version: version
    }
    deleteProductFromWishList(data)
    .then(res => {
      console.log(res);
      countFavTotal();
      // Remove the deleted product from the products state
      setProducts(oldProducts => ({
        ...oldProducts,
        wishListItem: oldProducts.wishListItem.filter(p => !(p.product._id === id && p.color === color && p.version === version))
      }));
    })
    .catch(error => {
      console.log(error);
    });
  } 

  const handleAddToCart = (id, number, color, version) => {
    const data = {
      product: id,
      quantity: number,
      color: color,
      version: version
    }
    console.log(data)
    addToCart(data)
      .then(res => { 
        console.log(res)
        countCartTotal()
        handleRemoveProduct(id, color, version) 
        countFavTotal()
      })
      .then(err => console.log(err))
  }

  const productsCart = products?.wishListItem?.map((val, index) => {
    console.log(val)
    const getProductDetail = val?.product?.variants.find(value => value._id === val.color)
    const getColor = getProductDetail?.moreVariants?.map(value => value);
    const findVersion = getColor?.find(value => value._id === val.version)
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
              <strong className="text-gray-700"><FormatCurrency price={findVersion?.price}/></strong>
            </div>
            <div>
              <h2 className="max-sm:hidden">Status</h2>
              <strong className="text-gray-700">{findVersion?.quantity} products left</strong>
            </div>
            <div>
              <h2 className="max-sm:hidden">Action</h2>
              <div className="md:mt-1 flex text-lg rounded-md">
                <button 
                onClick={() => handleAddToCart(val?.product?._id, 1, val?.color, val?.version)}
                type="button" class="flex cursor-pointer gap-x-1 rounded-xl py-2 px-4 text-white bg-green-400 hover:text-gray-800 hover:bg-gray-100">
									<span class="text-sm font-medium">Add to cart</span>
								</button>
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
          <div class="text-left">
            <div class="py-8 lg:py-16 lg:pr-10">
              <div class="mt-8 space-y-4 lg:mt-0">
                <h2 class="text-2xl font-medium text-gray-800">Your Favorites</h2>
                <span class="block w-10 h-1 bg-green-400 rounded"></span>
                  {productsCart}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}   