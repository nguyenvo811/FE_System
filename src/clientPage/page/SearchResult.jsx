import { React, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getHomeProducts, searchProducts } from "../../api/apiServices";
import FormatCurrency from "../../asset/FormatCurrency";
import slug from "../../resource/slug";

export default function SearchResult() {
	const location = useLocation()
	const navigate = useNavigate();
	const [listProduct, setListProduct] = useState([]);
	const [rating, setRating] = useState([])
	const [error, setError] = useState("")
	useEffect(() => {
		searchProducts(location?.state)
			.then(res => {
				console.log(res.data.data)
				setListProduct(res.data.data.searching)
				setRating(res.data.data.findComment)
				// setProducts(oldProducts => ({...oldProducts, cartItem: oldProducts.cartItem.filter(p => p.product._id != id)}));
			})
			.catch(error => {
				console.log(error)
				setError(error.response.data.message)
			})
	}, [location?.state])
	console.log(error)

	const childArray = listProduct?.map(val => val?.variants?.map(variant => (
		{ ...variant, productName: val?.productName, productId: val?._id }
	))).flat();


	const handleClickDetail = (val) => {
		navigate({
			pathname: slug.DETAIL,
			search: `?_id=${val.productId}`,
		}, { state: val._id })
	}

	console.log(rating)

	const listRating = (product) => {
		const getComment = rating?.map(val => val)
		const productRating = getComment?.find(val => val.color === product)
		return productRating?.totalRating ? productRating?.totalRating.toFixed(1) : 0
	}

	const listData = childArray?.map((val, index) => {
		return (
			<div
				key={index}
				class="mt-11 w-[230px] transform overflow-hidden rounded-xl shadow-md duration-300 hover:scale-105 hover:shadow-lg"
				onClick={() => handleClickDetail(val)}
			>
				<div className="relative">
					<img class="h-[250px] w-full rounded-t-xl overflow-hidden object-cover object-center " src={val.images[0]} alt="Product Image" />
					{/* <p class="absolute rounded-full top-2 left-2 bg-gray-900 opacity-50 px-2 ml-auto text-base font-medium text-green-500">20% off</p> */}
				</div>
				<div class="p-2">
					<div className="text-left">
						<h2 className="mb-2 text-lg font-medium text-gray-900">
							<span className="block overflow-hidden whitespace-nowrap overflow-ellipsis">
								{val.productName + " " + val.color}
							</span>
						</h2>
					</div>
					<div className="text-left">
						{Array(5)
							.fill(0)
							.map((star, index) => {
								index += 1;
								return (
									<button
										type="button bf"
										key={index}
										className={index <= listRating(val._id) ? "text-yellow-300" : "text-gray-400"}
										value={listRating(val._id)}
										checked={index === listRating(val._id)}
									>
										<svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
									</button>
								);
							})}
					</div>
					<div class="flex items-center">
						<p class="mr-2 text-lg font-semibold text-gray-900"><FormatCurrency price={val?.moreVariants[0]?.price} /></p>
					</div>
				</div>
			</div>
		)
	})

	return (
		<>
			<div className="w-full mx-auto">
				<div className="flex text-left">
					<span>Products related to
						{/* <span className="font-bold"> "{new URLSearchParams(location.search).toString().slice(7, location.search.length).split("+")}"</span> */}
						<span className="font-bold"> "{location?.state}"</span>
					</span>
				</div>
				<div className="flex flex-wrap gap-4">
					{listData}
				</div>
			</div>
		</>
	);
}