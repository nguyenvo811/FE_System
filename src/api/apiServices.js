import axios from "axios";

const config = {
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${JSON.parse(localStorage.getItem("Authentication"))}`
	},
}

const signIn = async (data) => {
	return axios.post("http://localhost:8081/sign-in", data)
		.then((response) => {
			localStorage.setItem('Authentication', JSON.stringify(response.data.data));
			axios.defaults.headers.common['Authorization'] = response.data.data;
			return response
		})
}

const getUsers = async () => {
  return await axios.get("http://localhost:8081/user-list", config)
}

const createUser = async (data) => {
  return await axios.post("http://localhost:8081/register", data, config)
}

const userSignUp = async (data) => {
	return await axios.post("http://localhost:8081/user-register", data, config)
  }

const updateUser = async (id, data) => {
  return await axios.patch(`http://localhost:8081/user-list/${id}`, data, config)
}

const changePass = async (data) => {
	return await axios.post("http://localhost:8081/user-list/change-password", data, config)
	.then(response => {
		return response
	})
  }

const removeUser = async (id) => {
  return await axios.delete(`http://localhost:8081/user-list/${id}`, config)
}

const viewProfile = async () => {
	return await axios.get("http://localhost:8081/view-profile", config)
}
 
const searchProducts = async (search) => {
	const data = {search: search}
	console.log(data)
	return await axios.get(`http://localhost:8081/search-products?search=${search}`)
  }

const getProducts = async () => {
	return await axios.get("http://localhost:8081/products", config)
}

const getProductsByCategory = async (id) => {
	return await axios.get(`http://localhost:8081/products/products-category/${id}`, config)
}

const findProduct = async (id) => {
	return await axios.get(`http://localhost:8081/find/products/${id}`, config)
}

const getProduct = async (id) => {
	return await axios.get(`http://localhost:8081/home/products/${id}`, config)
}

const getHomeProducts = async () => {
	return await axios.get("http://localhost:8081/home/products", config)
}

const createWatch = async (data) => {
	return await axios.post("http://localhost:8081/products/watches/add-watch", data, config)
}

const createLaptop = async (data) => {
	return await axios.post("http://localhost:8081/products/laptops/add-laptop", data, config)
}

const createTV = async (data) => {
	return await axios.post("http://localhost:8081/products/televisions/add-television", data, config)
}

const createTablet = async (data) => {
	return await axios.post("http://localhost:8081/products/tablets/add-tablet", data, config)
}

const createSmartPhone = async (data) => {
	return await axios.post("http://localhost:8081/products/smart-phones/add-smart-phone", data, config)
}

const updateTablet = async (id, data) => {
	return await axios.patch(`http://localhost:8081/products/tablets/${id}`, data, config)
}

const updateLaptop = async (id, data) => {
	return await axios.patch(`http://localhost:8081/products/laptops/${id}`, data, config)
}

const updateTV = async (id, data) => {
	return await axios.patch(`http://localhost:8081/products/televisions/${id}`, data, config)
}

const updateWatch = async (id, data) => {
	return await axios.patch(`http://localhost:8081/products/watches/${id}`, data, config)
}

const updateSmartPhone = async (id, data) => {
	return await axios.patch(`http://localhost:8081/products/smart-phones/${id}`, data, config)
}

const removeProduct = async (id) => {
	return await axios.delete(`http://localhost:8081/products/${id}`, config)
}

const getCategories = async () => {
	return await axios.get("http://localhost:8081/categories", config)
}

const getCategory = async (id) => {
	return await axios.get(`http://localhost:8081/categories/${id}`, config)
}

const createCategory = async (data) => {
	return await axios.post("http://localhost:8081/categories/addcategory", data, config)
}

const removeCategory = async (id) => {
	return await axios.delete(`http://localhost:8081/categories/${id}`, config)
}

const updateCategory = async (id, data) => {
	return await axios.patch(`http://localhost:8081/categories/${id}`, data, config)
}

const getBrands = async () => {
	return await axios.get("http://localhost:8081/brands", config)
}

const createBrand = async (data) => {
	return await axios.post("http://localhost:8081/brands/add-brand", data, config)
		.then(response => {
			return response
		})
}

const removeBrand = async (id) => {
	return await axios.delete(`http://localhost:8081/brands/${id}`, config)
}

const updateBrand = async (id, data) => {
	return await axios.patch(`http://localhost:8081/brands/${id}`, data, config)
		.then(response => {
			return response
		})
}

const addToWishLish = async (data) => {
	return await axios.post("http://localhost:8081/add-to-wish-list", data, config)
  }
  
  const viewWishList = async () => {
	return await axios.get("http://localhost:8081/view-wish-list", config)
  }
  
  const deleteProductFromWishList = async (data) => {
	return await axios.delete("http://localhost:8081/delete-from-wish-list", {headers: {
	  "Content-Type": "application/json",
	  Authorization: `Bearer ${JSON.parse(localStorage.getItem("Authentication"))}`
	}, data})
  }

  const createComment = async (data) => {
	return await axios.post("http://localhost:8081/create-comment", data, config)
  }

  const viewCart = async () => {
	return await axios.get("http://localhost:8081/view-cart", config)
  }

  const addToCart = async (data) => {
	return await axios.post("http://localhost:8081/add-to-cart", data, config)
  }
  
  const deleteProductFromCart = async (data) => {
	return await axios.delete("http://localhost:8081/delete-from-cart", {headers: {
	  "Content-Type": "application/json",
	  Authorization: `Bearer ${JSON.parse(localStorage.getItem("Authentication"))}`
	}, data})
  }
  
  const deleteCart = async (id) => {
	return await axios.delete(`http://localhost:8081/delete-cart/${id}`, config)
  }

  const createOrder = async (data) => {
	return await axios.post("http://localhost:8081/create-order", data, config)
  }
  
  const viewOrders = async () => {
	return await axios.get("http://localhost:8081/orders", {headers: {
	  "Content-Type": "application/json",
	  Authorization: `Bearer ${JSON.parse(localStorage.getItem("Authentication"))}`
	}})
  }

  const viewOrderDetail = async (id) => {
	return await axios.get(`http://localhost:8081/view-order-detail/${id}`, {headers: {
	  "Content-Type": "application/json",
	  Authorization: `Bearer ${JSON.parse(localStorage.getItem("Authentication"))}`
	}})
  }
  
  const getOrders = async () => {
	return await axios.get("http://localhost:8081/view-orders", config)
  }
  
  const deleteOrder = async (id) => {
	return await axios.delete(`http://localhost:8081/delete-order/${id}`, config)
  }
  
  const updateOrder = async (id, data) => {
	return await axios.patch(`http://localhost:8081/update-order/${id}`, data, config)
  }

  
export {
	signIn,
	createUser,
	userSignUp,
	getUsers,
	updateUser,
	changePass,
	removeUser,
	viewProfile,
	findProduct,
	getProducts,
	getProductsByCategory,
	getProduct,
	getHomeProducts,
	getCategories,
	getCategory,
	createCategory,
	updateCategory,
	removeCategory,
	getBrands,
	createBrand,
	removeBrand,
	updateBrand,
	searchProducts,
	createWatch,
	createLaptop,
	createTV,
	createSmartPhone,
	createTablet,
	updateSmartPhone,
	updateLaptop,
	updateTV,
	updateWatch,
	updateTablet,
	removeProduct,
	viewWishList,
	addToWishLish,
	deleteProductFromWishList,
	createComment,
	viewCart,
	addToCart,
	deleteProductFromCart,
	deleteCart,
	viewOrders,
	viewOrderDetail,
	createOrder,
	deleteOrder,
	updateOrder,
	getOrders
}