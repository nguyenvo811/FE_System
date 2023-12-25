import React, { useState, useEffect, useRef } from "react";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "react-toggle/style.css";
import { viewOrderDetail } from "../../api/apiServices";
import FormatCurrency from "../../asset/FormatCurrency";

function formatDateTime(dateTimeString) {
  return new Date(dateTimeString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'UTC'
  });
}

export default function OrderDetail() {
	const location = useLocation();
	const [order, setOrder] = useState([]);

	React.useEffect(() => {
		viewOrderDetail(location.state)
		.then(res => {
			console.log(res.data.data)
			setOrder(res.data.data)
		})
		.catch(error => {
			console.log(error)
		})
	}, [])

	const orderDetail = order?.orderDetail?.map((val, index) => {
		const findColor = val?.product?.variants?.map((value) => value)
		const getColor = findColor?.find(value => value._id === val.color)
		console.log(findColor)
		const findVersion = getColor?.moreVariants?.map(value => value)
		const getVersion = findVersion?.find(value => value._id === val.version)
		return (
			<div key={index} class="w-full text-left my-4 space-y-4 lg:mt-0">
				<div class="pb-6 mb-2 border-b border-gray-400">
					<div className="flex md:items-center md:justify-center text-sm font-medium mt-6 gap-4">
						<div className="h-[160px] w-[200px] max-sm:w-[300px]" >
							<img className="w-full h-full object-cover rounded-lg" src={getColor?.images[0]} />
						</div>
						<div className="grid w-full md:grid-cols-3 gap-2 break-all justify-between md:items-center">
							<div>
								<h2 className="max-sm:hidden">Product Name</h2>
								<span className="text-gray-700 max-sm:font-bold max-sm:text-lg">{val?.product?.productName}</span>
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
								<strong className="text-gray-700"><FormatCurrency price={getVersion?.price} /></strong>
							</div>
							<div>
								<h2 className="max-sm:hidden">Quantity</h2>
								<strong className="text-gray-700">{val.quantity}</strong>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	})

	return (
		<>
			<div className="relative">
				<div class="px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
					<div class="text-left flex justify-start item-starty space-y-2 flex-col">
						<h1 class="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Order #{order?._id}</h1>
						<p class="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">Create at {formatDateTime(order.createdAt)}</p>
					</div>
					<div class="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
						<div class="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
							{orderDetail}
							<div class="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
								<div class="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
									<h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">Summary</h3>
									<div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
										<div class="flex justify-between w-full">
											<p class="text-base dark:text-white leading-4 text-gray-800">Subtotal</p>
											<p class="text-base dark:text-gray-300 leading-4 text-gray-600"><FormatCurrency price={order?.totalPrice} /></p>
										</div>
										<div class="flex justify-between items-center w-full">
											<p class="text-base dark:text-white leading-4 text-gray-800">Discount</p>
											<p class="text-base dark:text-gray-300 leading-4 text-gray-600">0%</p>
										</div>
										<div class="flex justify-between items-center w-full">
											<p class="text-base dark:text-white leading-4 text-gray-800">Shipping</p>
											<p class="text-base dark:text-gray-300 leading-4 text-gray-600">$0</p>
										</div>
									</div>
									<div class="flex justify-between items-center w-full">
										<p class="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
										<p class="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600"><FormatCurrency price={order?.totalPrice} /></p>
									</div>
								</div>
								<div class="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
									<h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">Shipping</h3>
									<div class="flex justify-between items-start w-full">
										<div class="flex justify-center items-center space-x-4">
											<div class="w-8 h-8">
												<img class="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
											</div>
											<div class="flex flex-col justify-start items-center">
												<p class="text-lg leading-6 dark:text-white font-semibold text-gray-800">DPD Delivery<br /><span class="font-normal">Delivery with 24 Hours</span></p>
											</div>
										</div>
										<p class="text-lg font-semibold leading-6 dark:text-white text-gray-800">$0</p>
									</div>
									<div class="w-full flex justify-center items-center">
										<button class="hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">View Carrier Details</button>
									</div>
								</div>
							</div>
						</div>
						<div class="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
							<h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">Customer</h3>
							<div class="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
								<div class="flex flex-col justify-start items-start flex-shrink-0">
									<div class="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
										{/* <img src="https://i.ibb.co/5TSg7f6/Rectangle-18.png" alt="avatar" /> */}
										<div class="flex justify-start items-start flex-col space-y-2">
											<p class="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">{order?.user?.fullName}</p>
										</div>
									</div>

									<div class="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
											<path d="M3 7L12 13L21 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
										</svg>
										<p class="cursor-pointer text-sm leading-5 ">{order?.user?.email}</p>
									</div>
								</div>
								<div class="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
									<div class="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
										<div class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
											<p class="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address</p>
											<p class="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{order?.shippingAddress}</p>
										</div>
										<div class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
											<p class="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Billing Address</p>
											<p class="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{order?.shippingAddress}</p>
										</div>
									</div>
									{/* <div class="flex w-full justify-center items-center md:justify-start md:items-start">
										<button class="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base font-medium leading-4 text-gray-800">Edit Details</button>
									</div> */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}