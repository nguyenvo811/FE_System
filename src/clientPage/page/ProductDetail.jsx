import { React, useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import FormatPrice from "../../components/FormatPrice/FormatPrice";
import queryString from "query-string";
import { getProduct, addToWishLish, viewWishList, addToCart } from "../../api/apiServices";
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import Rating from "../component/Rating";
import Comment from "../component/Comment";
import FormatCurrency from "../../asset/FormatCurrency";
import StateContext from "../component/StateContext";

function useStateContext() {
  // Get the context value
  const context = useContext(StateContext);

  // Throw an error if the context is undefined
  if (context === undefined) {
    throw new Error('useStateContext must be used within a StateContext.Provider');
  }

  // Return the context value
  return context;
}

export default function ProductDetail() {
  const { countCartTotal, countFavTotal, isSignIn } = useStateContext();
  const navigate = useNavigate();
  const [fav, setFav] = useState(true);
  const [product, setProduct] = useState([]);
  const [userComment, setUserComment] = useState([]);
  const location = useLocation();
  const productID = queryString.parse(location.search);

  // Select color and version options to change attributes
  const [color, setColor] = useState("");
  const [colorChange, setColorChange] = useState("");
  const [version, setVersion] = useState("");
  const [versionChange, setVersionChange] = useState("");
  const [price, setPrice] = useState("");


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    getProduct(productID._id)
      .then((res) => {
        setProduct(res.data.data.findProduct);
        setUserComment(res.data.data.findComment);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productID._id]);

  useEffect(() => {
    // Fetch the wishlist data only if the user is signed in
    if (isSignIn) {
      viewWishList()
        .then((wishlistRes) => {
          const findItem = wishlistRes?.data?.data?.wishListItem?.find((p) => {
            const isSameProduct = p.product._id === productID._id;
            const isSameColor = color ? color === p.color : false;
            const isSameVersion = version ? version === p.version : false;

            return isSameProduct && isSameColor && isSameVersion;
          });

          setFav(!!findItem);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // When the user is not signed in, make sure fav is false
      setFav(false);
    }
  }, [isSignIn, productID, color, version]);

  const selectValue = product?.variants?.find(val => val._id === location.state)

  const handleSelectColor = (event) => {
    // Get the selected color value
    const selectedColor = event.target.value;
    const selectValue = product?.variants?.find(val => val._id === selectedColor)
    // Update the color state variable
    setColor(selectedColor)
    setColorChange(selectValue);
    setPrice(selectValue?.moreVariants[0]?.price);
    setVersion(selectValue?.moreVariants[0]?._id);
  };

  const handleSelectVersion = (event) => {
    const selectedVersion = event.target.value;
    const selectValue = product?.variants?.find(val => val._id === color)
    const value = selectValue?.moreVariants?.find(val => val._id === selectedVersion);
    // Set the state variable to the selected value.
    setVersion(selectedVersion);
    setVersionChange(value)
    setPrice(value.price);
  }

  const getComment = userComment?.map(val => val)
  const findComment = getComment?.find(val => val.color === color)

  const listProductDetail = product?.variants?.map(val => { return val._id });
  const defaultColor = listProductDetail?.find((id) => { return id === selectValue?._id });

  useEffect(() => {
    setColor(defaultColor);
    setVersion(selectValue?.moreVariants[0]?._id);
  }, [defaultColor]);

  const [currentIndex, setCurrentIndex] = useState(0)
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? selectValue?.images?.length - 1 : currentIndex - 1;
    if (selectValue?.images?.length > 0) {
      setCurrentIndex(newIndex);
    }
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === selectValue?.images?.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    if (selectValue?.images?.length > 0) {
      setCurrentIndex(newIndex);
    }
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  // const findItem = isFav?.wishListItem?.find((p) => {
  //   const isSameProduct = p.product._id === product._id;
  //   const isSameColor = color ? color === p.color : false;
  //   const isSameVersion = version ? version === p.version : false;

  //   return isSameProduct && isSameColor && isSameVersion;
  // });

  const handleAddToCart = (id, number) => {
    const data = {
      product: id,
      quantity: number,
      color: color ? color : colorChange.color,
      version: version ? version : versionChange.version
    }
    console.log(data)
    addToCart(data)
      .then(res => {
        console.log(res.data.data)
        countCartTotal();
      })
      .then(err => console.log(err))
  }

  const handleAddToWishList = async (id) => {
    const data = {
      product: id,
      isLiked: fav,
      color: color ? color : colorChange.color,
      version: version ? version : versionChange.version
    }
    addToWishLish(data)
      .then((res) => {
        console.log(res.data.data)
        countFavTotal();
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div class="m-auto py-4 pt-10 relative">
      <div class="bg-white rounded-lg border">
        <div class="max-w-screen-xl px-6 py-4 mx-auto">
          <div class="border-b-2 grid lg:grid-cols-2 max-sm:grid text-left">
            <div className='max-md:h-[480px] h-full w-[350px] m-auto max-sm:py-2 relative group'>
              <div
                style={{ backgroundImage: `url(${color ? color === selectValue?._id ? selectValue?.images[currentIndex] : colorChange?.images[currentIndex] : selectValue?.images[currentIndex]})` }}
                className='w-full md:h-[400px] max-md:h-[350px] bg-center bg-cover duration-700'
              />
              <div className='hidden group-hover:block absolute top-[40%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 duration-500 hover:bg-gray-300 text-gray-500 hover:text-white cursor-pointer'>
                <BsChevronCompactLeft onClick={prevSlide} size={30} />
              </div>
              <div className='hidden group-hover:block absolute top-[40%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full duration-500 hover:bg-gray-300 p-2 text-gray-500 hover:text-white cursor-pointer'>
                <BsChevronCompactRight onClick={nextSlide} size={30} />
              </div>
              <div className='flex justify-center py-4'>
                <ul className="flex">
                  {
                    color ?
                      color === defaultColor ?
                        selectValue?.images?.map((val, index) => {
                          return (
                            <li key={index}
                              onClick={() => goToSlide(index)}
                              className={`w-full flex justify-center items-center cursor-pointer duration-300 ${currentIndex === index ? "border-2 border-blue-400" : ""}`}>
                              <img src={val} className="py-1" />
                            </li>
                          )
                        })
                        :
                        colorChange?.images?.map((val, index) => {
                          return (
                            <li key={index}
                              onClick={() => goToSlide(index)}
                              className={`w-full flex justify-center items-center cursor-pointer duration-300 ${currentIndex === index ? "border-2 border-blue-400" : ""}`}>
                              <img src={val} className="py-1" />
                            </li>
                          )
                        })
                      :
                      selectValue?.images?.map((val, index) => {
                        return (
                          <li key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-full flex justify-center items-center cursor-pointer duration-300 ${currentIndex === index ? "border-2 border-blue-400" : ""}`}>
                            <img src={val} className="py-1" />
                          </li>
                        )
                      })
                  }
                </ul>
              </div>
            </div>
            <div class="max-md:pb-6 w-full lg:py-6 mt-6 lg:mt-0">
              <h2 class="text-sm title-font text-gray-500 tracking-widest">{product?.brand?.brandName}</h2>
              <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{product.productName}</h1>
              <div class="flex mb-4">
                <div class="flex items-center text-yellow-300">
                  {Array(5)
                    .fill(0)
                    .map((star, index) => {
                      index += 1;
                      return (
                        <button
                          type="button bf"
                          key={index}
                          className={index <= findComment?.totalRating ? "text-yellow-300" : "text-gray-400"}
                          value={findComment?.totalRating}
                          checked={index === findComment?.totalRating}
                        >
                          <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                        </button>
                      );
                    })}
                  <span class="text-gray-500 ml-3 underline cursor-pointer hover:text-gray-900">{findComment?.commentList?.length > 0 ? findComment?.commentList?.length > 1 ? findComment?.commentList?.length + " Reviews" : findComment?.commentList?.length + " Review" : "0 Review"}</span>
                </div>
                <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                  <a class="text-gray-500">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a class="ml-2 text-gray-500">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a class="ml-2 text-gray-500">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p class="leading-relaxed">{product.description}</p>
              <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <div class="flex items-center">
                  <span class="mr-3">Color</span>
                  <div class="relative">
                    <select
                      class="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10"
                      id="color"
                      name="color"
                      required
                      value={color}
                      onChange={handleSelectColor}
                    >
                      {product?.variants?.map((option) => (
                        <option key={option._id} value={option._id}>
                          {option.color}
                        </option>
                      ))}
                    </select>
                    <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
                <div class="flex ml-6 items-center">
                  <span class="mr-3">Version</span>
                  <div class="relative">
                    <select
                      class="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10"
                      id="version"
                      name="version"
                      required
                      value={version}
                      onChange={handleSelectVersion}
                    >
                      {
                        color ?
                          color === selectValue?._id ?
                            selectValue?.moreVariants?.map((option) => (
                              <option key={option._id} value={option._id}>
                                {option.version}
                              </option>
                            ))
                            :
                            colorChange?.moreVariants?.map((option) => (
                              <option key={option._id} value={option._id}>
                                {option.version}
                              </option>
                            ))
                          :
                          selectValue?.moreVariants?.map((option) => (
                            <option key={option._id} value={option._id}>
                              {option.version}
                            </option>
                          ))
                      }
                    </select>
                    <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div class="flex">
                <p className="">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    {colorChange ? (
                      // Display price when color changes
                      <FormatCurrency price={price} />
                    ) : (
                      // Display price based on version or selectValue
                      version === selectValue?.moreVariants[0]?._id ? (
                        <FormatCurrency price={selectValue?.moreVariants[0]?.price} />
                      ) : (
                        <FormatCurrency price={versionChange?.price} />
                      )
                    )}
                  </span>
                </p>
                <button
                  onClick={() => isSignIn ? handleAddToCart(product._id, 1) : navigate("/sign-in")}
                  class="flex ml-auto text-white transition-none bg-teal-500 hover:bg-teal-600 sm:mt-0 sm:w-auto sm:flex-shrink-0 border-0 py-2 px-6 focus:outline-none rounded"
                >Add to cart</button>
                <button
                  onClick={() => {
                    if (isSignIn) {
                      setFav(!fav);
                      handleAddToWishList(product._id);
                    } else {
                      navigate("/sign-in");
                    }
                  }}
                  className={`rounded-full w-10 h-10 p-0 border-0 inline-flex items-center justify-center transition-all ease-in-out duration-300 ml-4 ${fav ? "text-red-500 bg-red-200" : "text-gray-500 bg-gray-200"}`}
                >
                  <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="my-4 relative overflow-x-auto shadow-md sm:rounded-lg">
            {
              product?.category?.categoryName === "Smart phone" ?
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <tbody>
                    <tr class="border-b border-gray-200 dark:border-gray-700">
                      <th scope="row" class="w-1/2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                        Resolution
                      </th>
                      <td class="w-1/2 px-6 py-4">
                        {product?.moreAttribute?.resolution}
                      </td>
                    </tr>
                    <tr class="border-b border-gray-200 dark:border-gray-700">
                      <th scope="row" class="w-1/2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                        Screen size
                      </th>
                      <td class="w-1/2 px-6 py-4">
                        {product?.moreAttribute?.screenSize}
                      </td>
                    </tr>
                    <tr class="border-b border-gray-200 dark:border-gray-700">
                      <th scope="row" class="w-1/2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                        Sreen Technology
                      </th>
                      <td class="w-1/2 px-6 py-4">
                        {product?.moreAttribute?.screenTech}
                      </td>
                    </tr>
                    <tr class="border-b border-gray-200 dark:border-gray-700">
                      <th scope="row" class="w-1/2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                        Processor
                      </th>
                      <td class="w-1/2 px-6 py-4">
                        {product?.moreAttribute?.processor}
                      </td>
                    </tr>
                    <tr class="border-b border-gray-200 dark:border-gray-700">
                      <th scope="row" class="w-1/2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                        Operating system
                      </th>
                      <td class="w-1/2 px-6 py-4">
                        {product?.moreAttribute?.operatingSystem}
                      </td>
                    </tr>
                    <tr class="border-b border-gray-200 dark:border-gray-700">
                      <th scope="row" class="w-1/2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                        RAM
                      </th>
                      <td class="w-1/2 px-6 py-4">
                        {product?.moreAttribute?.ram}
                      </td>
                    </tr>
                    <tr class="border-b border-gray-200 dark:border-gray-700">
                      <th scope="row" class="w-1/2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                        Internal memory
                      </th>
                      <td class="w-1/2 px-6 py-4">
                        {product?.moreAttribute?.internalMemory}
                      </td>
                    </tr>
                    <tr class="border-b border-gray-200 dark:border-gray-700">
                      <th scope="row" class="w-1/2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                        Mobile network
                      </th>
                      <td class="w-1/2 px-6 py-4">
                        {product?.moreAttribute?.mobileNetwork}
                      </td>
                    </tr>
                    <tr class="border-b border-gray-200 dark:border-gray-700">
                      <th scope="row" class="w-1/2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                        Sim slot
                      </th>
                      <td class="w-1/2 px-6 py-4">
                        {product?.moreAttribute?.simSlot}
                      </td>
                    </tr>
                    <tr class="border-b border-gray-200 dark:border-gray-700">
                      <th scope="row" class="w-1/2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                        Battery capacity
                      </th>
                      <td class="w-1/2 px-6 py-4">
                        {product?.moreAttribute?.batteryCapacity}
                      </td>
                    </tr>
                  </tbody>
                </table>
                : product?.category?.categoryName === "Watch" ?
                  <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <tbody>
                      <tr class="border-b border-gray-200 dark:border-gray-700">
                        <th scope="row" class="w-1/2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                          Screen size
                        </th>
                        <td class="w-1/2 px-6 py-4">
                          {product?.moreAttribute?.screenSize}
                        </td>
                      </tr>
                      <tr class="border-b border-gray-200 dark:border-gray-700">
                        <th scope="row" class="w-1/2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                          Weight
                        </th>
                        <td class="w-1/2 px-6 py-4">
                          {product?.moreAttribute?.weight}
                        </td>
                      </tr>
                      <tr class="border-b border-gray-200 dark:border-gray-700">
                        <th scope="row" class="w-1/2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                          Battery capacity
                        </th>
                        <td class="w-1/2 px-6 py-4">
                          {product?.moreAttribute?.batteryCapacity}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  : product?.category?.categoryName === "Television" ?
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <tbody>
                        <tr class="border-b border-gray-200 dark:border-gray-700">
                          <th scope="row" class="w-1/2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                            Resolution
                          </th>
                          <td class="w-1/2 px-6 py-4">
                            {product?.moreAttribute?.resolution}
                          </td>
                        </tr>
                        <tr class="border-b border-gray-200 dark:border-gray-700">
                          <th scope="row" class="w-1/2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                            Screen size
                          </th>
                          <td class="w-1/2 px-6 py-4">
                            {product?.moreAttribute?.screenSize}
                          </td>
                        </tr>
                        <tr class="border-b border-gray-200 dark:border-gray-700">
                          <th scope="row" class="w-1/2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                            Product type
                          </th>
                          <td class="w-1/2 px-6 py-4">
                            {product?.moreAttribute?.productType}
                          </td>
                        </tr>
                        <tr class="border-b border-gray-200 dark:border-gray-700">
                          <th scope="row" class="w-1/2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                            Port
                          </th>
                          <td class="w-1/2 px-6 py-4">
                            {product?.moreAttribute?.port}
                          </td>
                        </tr>
                        <tr class="border-b border-gray-200 dark:border-gray-700">
                          <th scope="row" class="w-1/2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                            Weight
                          </th>
                          <td class="w-1/2 px-6 py-4">
                            {product?.moreAttribute?.weight}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    : product?.category?.categoryName === "Laptop" ?
                      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <tbody>
                          <tr class="border-b border-gray-200 dark:border-gray-700">
                            <th scope="row" class="w-1/2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                              Resolution
                            </th>
                            <td class="w-1/2 px-6 py-4">
                              {product?.moreAttribute?.resolution}
                            </td>
                          </tr>
                          <tr class="border-b border-gray-200 dark:border-gray-700">
                            <th scope="row" class="w-1/2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                              CPU number
                            </th>
                            <td class="w-1/2 px-6 py-4">
                              {product?.moreAttribute?.cpuNumber}
                            </td>
                          </tr>
                          <tr class="border-b border-gray-200 dark:border-gray-700">
                            <th scope="row" class="w-1/2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                              Base clock
                            </th>
                            <td class="w-1/2 px-6 py-4">
                              {product?.moreAttribute?.baseClock}
                            </td>
                          </tr>
                          <tr class="border-b border-gray-200 dark:border-gray-700">
                            <th scope="row" class="w-1/2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                              Operating system
                            </th>
                            <td class="w-1/2 px-6 py-4">
                              {product?.moreAttribute?.operatingSystem}
                            </td>
                          </tr>
                          <tr class="border-b border-gray-200 dark:border-gray-700">
                            <th scope="row" class="w-1/2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                              RAM
                            </th>
                            <td class="w-1/2 px-6 py-4">
                              {product?.moreAttribute?.ram}
                            </td>
                          </tr>
                          <tr class="border-b border-gray-200 dark:border-gray-700">
                            <th scope="row" class="w-1/2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                              Dimensions
                            </th>
                            <td class="w-1/2 px-6 py-4">
                              {product?.moreAttribute?.dimensions}
                            </td>
                          </tr>
                          <tr class="border-b border-gray-200 dark:border-gray-700">
                            <th scope="row" class="w-1/2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                              Weight
                            </th>
                            <td class="w-1/2 px-6 py-4">
                              {product?.moreAttribute?.weight}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      : product?.category?.categoryName === "Tablet" ?
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          <tbody>
                            <tr class="border-b border-gray-200 dark:border-gray-700">
                              <th scope="row" class="w-1/2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                Sreen Technology
                              </th>
                              <td class="w-1/2 px-6 py-4">
                                {product?.moreAttribute?.screenTech}
                              </td>
                            </tr>
                            <tr class="border-b border-gray-200 dark:border-gray-700">
                              <th scope="row" class="w-1/2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                Processor chip
                              </th>
                              <td class="w-1/2 px-6 py-4">
                                {product?.moreAttribute?.processorChip}
                              </td>
                            </tr>
                            <tr class="border-b border-gray-200 dark:border-gray-700">
                              <th scope="row" class="w-1/2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                Graphics chip
                              </th>
                              <td class="w-1/2 px-6 py-4">
                                {product?.moreAttribute?.graphicsChip}
                              </td>
                            </tr>
                            <tr class="border-b border-gray-200 dark:border-gray-700">
                              <th scope="row" class="w-1/2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                Operating system
                              </th>
                              <td class="w-1/2 px-6 py-4">
                                {product?.moreAttribute?.operatingSystem}
                              </td>
                            </tr>
                            <tr class="border-b border-gray-200 dark:border-gray-700">
                              <th scope="row" class="w-1/2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                RAM
                              </th>
                              <td class="w-1/2 px-6 py-4">
                                {product?.moreAttribute?.ram}
                              </td>
                            </tr>
                            <tr class="border-b border-gray-200 dark:border-gray-700">
                              <th scope="row" class="w-1/2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                Wi-Fi
                              </th>
                              <td class="w-1/2 px-6 py-4">
                                {product?.moreAttribute?.wifi}
                              </td>
                            </tr>
                            <tr class="border-b border-gray-200 dark:border-gray-700">
                              <th scope="row" class="w-1/2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                Bluetooth
                              </th>
                              <td class="w-1/2 px-6 py-4">
                                {product?.moreAttribute?.bluetooth}
                              </td>
                            </tr>
                            <tr class="border-b border-gray-200 dark:border-gray-700">
                              <th scope="row" class="w-1/2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                Internal memory
                              </th>
                              <td class="w-1/2 px-6 py-4">
                                {product?.moreAttribute?.internalMemory}
                              </td>
                            </tr>
                            <tr class="border-b border-gray-200 dark:border-gray-700">
                              <th scope="row" class="w-1/2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                Dimensions and weight
                              </th>
                              <td class="w-1/2 px-6 py-4">
                                {product?.moreAttribute?.dimensionsNWeight}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        : "Error"
            }
          </div>

          <Comment product={product._id} color={color ? color : colorChange.color} setUserComment={setUserComment} />
          <Rating user={findComment} />
        </div>
      </div>
    </div>
  )
}