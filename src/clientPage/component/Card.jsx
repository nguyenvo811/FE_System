import * as React from "react";
import { getHomeProducts } from "../../api/apiServices";
import { Link, useNavigate } from "react-router-dom";
import slug from "../../resource/slug";

export default function Card() {
	const navigate = useNavigate();
	const [listProduct, setListProduct] = React.useState([]);
	const [rating, setRating] = React.useState([])

	React.useEffect(() => {
		getHomeProducts()
			.then(res => {
				setListProduct(res.data.data.findProduct)
				setRating(res.data.data.findComment)
			})
			.catch(err => {
				console.log(err)
			})

	}, [])

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
		return productRating?.totalRating? productRating?.totalRating.toFixed(1) : 0
	}

	const listData = childArray?.map((val, index) => {
		return (
			<div 
				key={index} 
				class="mt-11 p-2 w-[250px] transform overflow-hidden rounded-xl bg-gray-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg"
				onClick={() => handleClickDetail(val)}
			>
				<div className="relative">
					<img class="h-[250px] w-full rounded-xl object-cover object-center " src={val.images[0]} alt="Product Image" />
					<p class="absolute rounded-full top-2 left-2 bg-gray-900 opacity-50 px-2 ml-auto text-base font-medium text-green-500">20% off</p>
				</div>
				<div class="p-">
					<div className="text-left">
						<h2 class="mb-2 text-lg font-medium dark:text-white text-white">{val.productName + " " + val.color}</h2>
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
										<svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
									</button>
								);
          	})}
					</div>
					<div class="flex items-center">
						<p class="mr-2 text-lg font-semibold text-white">{val.moreVariants[0].price}</p>
						<p class="text-base  font-medium text-gray-500 line-through dark:text-gray-300">$25.00</p>
					</div>
				</div>
			</div>
		)
	})

	return (
		<>
			<div className="w-full mx-auto">
				<div className="grid grid-cols-1 justify-between sm:grid-cols-2  lg:grid-cols-5 duration-700">
					{listData}
				</div>
			</div>
		</>
	);
}