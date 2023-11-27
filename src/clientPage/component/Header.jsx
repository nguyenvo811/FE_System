import * as React from "react";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import "react-toggle/style.css";
import StateContext from "./StateContext";
import { getHomeProducts } from "../../api/apiServices";
import slugify from 'slugify';
import slug from "../../resource/slug";

// Create a custom hook to use the context
function useStateContext() {
  // Get the context value
  const context = React.useContext(StateContext);

  // Throw an error if the context is undefined
  if (context === undefined) {
    throw new Error('useStateContext must be used within a StateContext.Provider');
  }

  // Return the context value
  return context;
}

export default function Header(props) {
  const navigate = useNavigate();
  const { open, setOpen, cartCount, favCount, profile } = useStateContext();
  const [isDropdownOpen, setDropdownOpen] = React.useState(false);
  const { category, isSignIn, setIsSignIn } = props;

  const [products, setProducts] = React.useState([]);
	const [showSearch, setShowSearch] = React.useState(true);

	React.useEffect(() => {
		getHomeProducts()
			.then(res => {
				setProducts(res.data.data.findProduct)
			})
			.catch(err => {
				console.log(err)
			})

	}, [])

  const handleLogOut = () => {
    localStorage.clear();
    setIsSignIn(false)
    navigate("/")
  }

  const handleClickDetails = React.useCallback(
		async (val) => {
			// Define the logic for handling click details
			console.log("Item Clicked:", val);

			// Example: Navigate to the product details page
			const categoryNameSlug = slugify(val?.categoryName, { lower: true, locale: 'vi' });
			const categoryPath = `/search/${categoryNameSlug}`;

			navigate({
				pathname: categoryPath
			}, {state : val?._id});
		},
		[navigate]
	);

  const handleClickProductDetails = React.useCallback(
		async (val, value) => {
      console.log(val)
      console.log(value)
			// Define the logic for handling click details
			navigate({
        pathname: slug.DETAIL, 
        search: `?_id=${val._id}`,
      }, { state: value._id })
		},
		[navigate]
	);

  const renderCategory = category.map((val, index) => {
    return (
      <>
        <li
          key={index}
          class="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:text-gray-800 hover:bg-gray-100"
          onClick={() => handleClickDetails(val)}
        >
          <a>
            {val.categoryName}
          </a>
        </li>
      </>
    )
  })

  const [filteredData, setFilteredData] = React.useState([]);
  const [wordEntered, setWordEntered] = React.useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = products.filter((value) => {
      return value.productName.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
		setShowSearch(searchWord !== "");
  };
 
  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  const handleSearch = (val) => {
    setWordEntered(val.productName)
    setShowSearch(false)
    clearInput()
  }

  // search

  const search = (searchWord, e) => {
    e.preventDefault();
    setShowSearch(false)
    navigate({
      pathname: slug.SEARCH, 
      search: `?search=${searchWord}`
    }, {state: searchWord})
  }

  console.log(wordEntered)

  const showData = filteredData.length !== 0 && (
		<div className="absolute left-0 top-1 w-[300px] sm:w-[380px] rounded-md overflow-x-auto bg-white border py-2 mx-auto">
			{filteredData.slice(0, 15).map((val, index) => (
				<div key={index} onClick={() => {return handleSearch(val)}}
					className="cursor-pointer text-sm sm:text-lg flex">
					<div className="px-2 w-full">
						{val?.variants?.map((value, indexColor) => (
							<div className="grid items-center grid-cols-3 sm:gap-2 py-2 hover:bg-gray-100" onClick={() => handleClickProductDetails(val, value)}>
								<img key={indexColor} src={value?.images[0]} className="w-[70px] h-[60px] object-center object-cover" alt={`Slide ${indexColor + 1}`} />
								<div className="text-left pl-2 text-gray-500 overflow-hidden scroll-m-0">
									<a>{val.productName}</a>
									<br></br>
									<a>{value.color}</a>
								</div>
								<div className="flex justify-center items-center">
                  <a className="flex items-center text-sm text-gray-500">More details
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1 transform rotate-90"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  </a>
                </div>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);

  return (
    <>
      <div class="bg-gray-800">
        <div class="">
          <div class="px-3 py-3 lg:px-5 lg:pl-3 flex justify-between">
            <button
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              onClick={() => setOpen(!open)}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
              </svg>
            </button>

            <div class="flex items-center" onClick={() => navigate("/")}>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
              <span class="cursor-pointer ml-2 font-semibold text-white">DeviceDex</span>
            </div>

            <div class="ml-6 w-full sm:w-[500px]">
            <form onSubmit={(e) => search(wordEntered, e)}>
									<div class="relative w-full">
										<div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
												<svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
										</div>
										<input 
											type="search" 
											class="block w-full pl-10 rounded-md border border-[#DDE2E4] px-3 py-2 text-sm text-gray-800" 
											placeholder="Tên sản phẩm..." 
											value={wordEntered}
            					onChange={handleFilter}
											required/>
										<button 
											type="submit" 
											class="text-white absolute top-0 right-0 bottom-0 bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-transparent font-medium rounded-md text-xs sm:text-sm px-2 sm:px-4 sm:py-2"
											onClick={(e) => search(wordEntered, e)}
										>Tìm kiếm</button>
									</div>
								</form>
								<div className={`relative flex border-t-none z-10 bg-gray-50 justify-center ${showSearch? "" : "hidden"}`} onMouseLeave={() => { return setShowSearch(false) }}> 
									<div className="mx-auto" > 
										{showData}
									</div>
								</div>
            </div>

            <div class="ml-2 flex text-white">
              <div
                class="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:text-gray-800 hover:bg-gray-100"
                onClick={() => isSignIn? navigate("/orders") : navigate("/sign-in")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                  <path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd" />
                </svg>
                <span class="text-sm font-medium">Orders</span>
              </div>

              <div
                class="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:text-gray-800 hover:bg-gray-100"
                onClick={() => isSignIn? navigate("/favorites") : navigate("/sign-in")}
              >
                <div class="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  <span class="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">{favCount}</span>
                </div>
                <span class="text-sm font-medium">Favorites</span>
              </div>

              <div
                class="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:text-gray-800 hover:bg-gray-100"
                onClick={() => isSignIn? navigate("/cart") : navigate("/sign-in")}
              >
                <div class="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  <span class="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">{cartCount}</span>
                </div>
                <span class="text-sm font-medium">Cart</span>
              </div>

              {!isSignIn ? (
                <button
                  type="button"
                  class="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 bg-green-400 hover:text-gray-800 hover:bg-gray-100"
                  onClick={() => navigate("/sign-in")}
                >
                  <span class="text-sm font-medium">Sign in</span>
                </button>
              ) : (
                <>

                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    onMouseOver={() => setDropdownOpen(true)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img className="w-8 h-8 rounded-full object-cover object-center" src={profile.image} />
                  </button>

                  {isDropdownOpen && (
                    <div
                      className="absolute right-0 top-10 z-10 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                      id="dropdown-user"
                      onMouseLeave={() => setDropdownOpen(false)}
                    >
                      <div className="px-4 py-3" role="none">
                        <p className="text-sm text-gray-900 dark:text-white" role="none">
                          {profile.fullName}
                        </p>
                        <p className="text-sm font-medium text-gray-900 truncate " role="none">
                          {profile.email}
                        </p>
                      </div>
                      <ul className="py-1" role="none">
                       { profile?.role === "Admin" || profile?.role === "Staff"?
                        <li>
                          <a onClick={() => navigate("/managements/products")} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Management</a>
                        </li>
                        : ""}
                        {/* <li>
                          <a onClick={handleClickOpen} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Change password</a>
                        </li> */}
                        <li>
                          <a onClick={() => handleLogOut()}
                            className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</a>
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div class="bg-blue-600 px-2 py-2 lg:px-5 lg:pl-3 flex justify-center">
            <ul class="flex gap-x-8 text-white" >
              {renderCategory}
            </ul>
          </div>
        </div>
      </div>

    </>
  )
}