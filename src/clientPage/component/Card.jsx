import * as React from "react";
import { getHomeProducts } from "../../api/apiServices";

export default function Card() {
	const [listProduct, setListProduct] = React.useState([]);

	React.useEffect(() => {
		getHomeProducts()
			.then(res => {
				setListProduct(res.data.data)
			})
			.catch(err => {
				console.log(err)
			})

	}, [])

	console.log(listProduct)

	const listData = listProduct.map((val, index) => {
		return (
			<>
				<div class="mt-11 p-2 w-[250px] transform overflow-hidden rounded-xl bg-gray-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
					<div className="relative">
						<img class="h-[250px] w-full rounded-xl object-cover object-center " src={val.variants[0].images[0]} alt="Product Image" />
						<p class="absolute rounded-full top-2 left-2 bg-gray-900 opacity-50 px-2 ml-auto text-base font-medium text-green-500">20% off</p>
					</div>
					<div class="p-">
						<div className="text-left">
							<h2 class="mb-2 text-lg font-medium dark:text-white text-white">{val.productName}</h2>
							{/* <p class="mb-2 text-base dark:text-gray-300 text-gray-700">Product description goes here.</p> */}
						</div>
						<div class="flex items-center">
							<p class="mr-2 text-lg font-semibold text-white">{val.variants[0].moreVariants[0].price}</p>
							<p class="text-base  font-medium text-gray-500 line-through dark:text-gray-300">$25.00</p>
						</div>
						<div className="mt-2 flex justify-between items-center">
							<svg
								class="h-7 w-7 cursor-pointer fill-white"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 512 512">
								<path
									d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
							</svg>

							<button type="button" class="flex cursor-pointer gap-x-1 rounded-xl py-2 px-4 text-white bg-green-400 hover:text-gray-800 hover:bg-gray-100">
								<span class="text-sm font-medium">Add to cart</span>
							</button>
						</div>
					</div>
				</div>
			</>
		)
	})

	return (
		<>
			<div className="w-full mx-auto">
				<div className="flex justify-between items-center duration-700">
					{listData}
				</div>
			</div>
		</>
	);
}