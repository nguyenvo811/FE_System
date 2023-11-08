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
  

const getProducts = async () => {
	return await axios.get("http://localhost:8081/products", config)
}

const getHomeProducts = async () => {
	return await axios.get("http://localhost:8081/home/products", config)
}

const createWatch = async (data) => {
	return await axios.post("http://localhost:8081/products/watchs/add-watch", data, config)
}

const createLaptop = async (data) => {
	return await axios.post("http://localhost:8081/products/laptops/add-latop", data, config)
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

export {
	signIn,
	createUser,
	getUsers,
	updateUser,
	changePass,
	removeUser,
	viewProfile,
	getProducts,
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
	createWatch,
	createLaptop,
	createTV,
	createSmartPhone,
	createTablet,
	removeProduct,
}