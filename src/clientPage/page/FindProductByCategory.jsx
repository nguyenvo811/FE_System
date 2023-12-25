import * as React from "react";
import { getBrands, getHomeProducts, getProductsByCategory } from "../../api/apiServices";
import { Link, useLocation, useNavigate } from "react-router-dom";
import slug from "../../resource/slug";
import FormatCurrency from "../../asset/FormatCurrency";

export default function FindProductByCategory() {
	const navigate = useNavigate();
	const [listProduct, setListProduct] = React.useState([]);
	const [rating, setRating] = React.useState([]);
	const [brand, setBrand] = React.useState([]);
	const location = useLocation();

	React.useEffect(() => {
		getProductsByCategory(location?.state)
			.then(res => {
				console.log(res.data.data.filtering)
				setListProduct(res.data.data.filtering)
				setRating(res.data.data.findComment)
			})
			.catch(err => {
				console.log(err)
			})
		getBrands()
			.then(res => {
				console.log(res.data.data)
				setBrand(res.data.data)
			})
			.catch(err => {
				console.log(err)
			})
	}, [location?.state]);

	const childArray = listProduct?.map(val => val?.variants?.map(variant => (
		{ ...variant, category: val.category, productName: val?.productName, productId: val?._id, brand: val?.brand._id, productBrand: val?.productBrand }
	))).flat();

	const productsByCategoryAndBrand = {};

	childArray.forEach(product => {
		if (!productsByCategoryAndBrand[product.category?._id]) {
			productsByCategoryAndBrand[product.category?._id] = {};
		}

		const matchingBrand = brand.find(b => b.variants.some(v => v._id === product.productBrand));

		if (matchingBrand) {
			if (!productsByCategoryAndBrand[product.category?._id][matchingBrand._id]) {
				productsByCategoryAndBrand[product.category?._id][matchingBrand._id] = {
					brandName: matchingBrand.brandName,
					products: [],
				};
			}

			productsByCategoryAndBrand[product.category?._id][matchingBrand._id].products.push(product);
		}
	});

	console.log(productsByCategoryAndBrand)

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

	const listData = Object.entries(productsByCategoryAndBrand).map(([categoryId, brands]) => (
		<div key={categoryId}>
			{Object.values(brands).map(brand => (
				<div className="pb-8" key={brand.brandName}>
					<strong className="flex text-left text-2xl font-bold">{brand.brandName}</strong>
					<span class="block mt-2 w-10 h-1 bg-green-400 rounded"></span>
					<div className="flex flex-wrap gap-4">
						{brand.products.map((product, index) => (
							<div
								key={index}
								class="m-auto mt-11 w-[230px] transform overflow-hidden rounded-xl shadow-md duration-300 hover:scale-105 hover:shadow-lg"
								onClick={() => handleClickDetail(product)}
							>
								<div className="relative">
									<img class="h-[250px] w-full rounded-t-xl overflow-hidden object-cover object-center " src={product?.images[0]} alt="Product Image" />
									{/* <p class="absolute rounded-full top-2 left-2 bg-gray-900 opacity-50 px-2 ml-auto text-base font-medium text-green-500">20% off</p> */}
								</div>
								<div class="p-2">
								<div className="text-left">
						<h2 className="mb-2 text-lg font-medium text-gray-900">
							<span className="block overflow-hidden whitespace-nowrap overflow-ellipsis">
								{product.productName + " " + product.color}
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
														className={index <= listRating(product?._id) ? "text-yellow-300" : "text-gray-400"}
														value={listRating(product?._id)}
														checked={index === listRating(product?._id)}
													>
														<svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
													</button>
												);
											})}
									</div>
									<div class="flex items-center">
										<p class="mr-2 text-lg font-semibold text-gray-900"><FormatCurrency price={product?.moreVariants[0]?.price} /></p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	));

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