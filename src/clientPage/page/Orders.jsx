import React, { useEffect, useState } from "react";
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useNavigate } from "react-router-dom";
import { getOrders } from "../../api/apiServices";

export default function Orders() {
  // const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    getOrders()
      .then(res => {
        setOrders(res.data.data)
        console.log(res.data.data)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  const steps = [
    'Pending',
    'Processing',
    'Shipped',
    'Delivered'
  ];

  const orderList = orders?.map((val, index) => {
    return (
      <div>
        <div key={index} class="my-4 space-y-4 lg:mt-0">
          <h2 class="text-2xl font-medium text-gray-800">Order #{val._id}</h2>
          <span class="block w-10 h-1 bg-green-400 rounded"></span>
          <div className="my-4">
            <Box sx={{ width: '100%' }}>
              <Stepper activeStep={steps.indexOf(val.status)} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </div>
          {val?.orderDetail?.map((value, indexItem) => {
            const findColor = value?.product?.variants?.map((val) => val)
            const getColor = findColor?.find(val => val._id === value.color)
            const findVersion = getColor?.moreVariants?.map(val => val)
            const getVersion = findVersion?.find(val => val._id === value.version)
            return (
              <div key={indexItem} class="pb-6 mb-2 border-b border-gray-400">
                <div className="flex md:items-center md:justify-center text-sm font-medium mt-6 gap-4">
                  <div className="h-[160px] w-[200px] max-sm:w-[300px]" >
                    <img className="w-full h-full object-cover rounded-lg" src={getColor?.images[0]} />
                  </div>
                  <div className="grid w-full md:grid-cols-3 gap-2 break-all justify-between md:items-center">
                    <div>
                      <h2 className="max-sm:hidden">Product Name</h2>
                      <span className="text-gray-700 max-sm:font-bold max-sm:text-lg">{value.product.productName}</span>
                    </div>
                    <div>
                      <h2 className="max-sm:hidden">Color</h2>
                      <span className="text-gray-700">{getColor?.color}</span>
                    </div>
                    <div>
                      <h2 className="max-sm:hidden">Version</h2>
                      <span className="text-gray-700">{getVersion?.version}</span>
                    </div>
                    <div>
                      <h2 className="max-sm:hidden">Price</h2>
                      <strong className="text-gray-700">{getVersion?.price}</strong>
                    </div>
                    <div>
                      <h2 className="max-sm:hidden">Quantity</h2>
                      <strong className="text-gray-700">{value.quantity}</strong>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
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
              {orderList}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}   