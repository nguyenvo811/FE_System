import * as React from "react";
import { getHomeProducts } from "../../api/apiServices";
import { Link, useNavigate } from "react-router-dom";
import slug from "../../resource/slug";
import FormatCurrency from "../../asset/FormatCurrency";

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
		return productRating?.totalRating ? productRating?.totalRating.toFixed(1) : 0
	}

	const listData = childArray?.map((val, index) => {
		return (
			<div
				key={index}
				class="m-auto sm:basis-[calc(100%/2-16px)] md:basis-[calc(100%/4-16px)] lg:basis-[calc(100%/5-16px)] mt-11 w-[230px] transform overflow-hidden rounded-xl shadow-md duration-300 hover:scale-105 hover:shadow-lg"
				onClick={() => handleClickDetail(val)}
			>
				<div className="relative">
					<img class="h-[250px] w-full rounded-t-xl overflow-hidden object-cover object-center " src={val.images[0]} alt="Product Image" />
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
				<div className="flex flex-wrap gap-4">
					{listData}
				</div>
			</div>
		</>
	);
}