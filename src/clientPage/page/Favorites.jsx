import React, { useEffect, useState } from "react";
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";

export default function Favorites() {
  // const [products, setProducts] = useState([]);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

	const products = {
		favoritesItem: [{
		product: {
			images: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
			productName: "iPhone 15",

		}
	}]
}

  const productsCart = products?.favoritesItem?.map((val, index) => {
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
              <div className="md:mt-1 flex text-lg rounded-md">
                <button type="button" class="flex cursor-pointer gap-x-1 rounded-xl py-2 px-4 text-white bg-green-400 hover:text-gray-800 hover:bg-gray-100">
									<span class="text-sm font-medium">Add to cart</span>
								</button>
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
          <div class="text-left">
            <div class="py-8 lg:py-16 lg:pr-10">
              <div class="mt-8 space-y-4 lg:mt-0">
                <h2 class="text-2xl font-medium text-gray-800">Your Cart</h2>
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