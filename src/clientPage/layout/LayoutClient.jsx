import { Outlet } from "react-router-dom";
import * as React from 'react';
import { Footer } from "flowbite-react"
import { MdFacebook } from "react-icons/md"
import { FaDribbble, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import StateContext from "../component/StateContext";
import Bottom from "../component/Bottom";
import Header from "../component/Header";
import ASide from "../component/ASide";
import { getCategories, viewCart, viewProfile, viewWishList } from "../../api/apiServices";

export default function LayoutClient(){
  // State variable here
  const [open, setOpen] = React.useState(false);

  const [selectCategory, setSelectCategory] = React.useState([]);
  const [cartCount, setCartCount] = React.useState(0);
  const [favCount, setFavCount] = React.useState(0);
  const [profile, setProfile] = React.useState([]);
  const [isSignIn, setIsSignIn] = React.useState(false);

  const countCartTotal = () => {
    viewCart()
    .then(res => {
      setCartCount(res.data.data.cartItem.length);
    })
    .catch(error => {
      console.log(error)
    })
  };
  
  const countFavTotal = () => {
    viewWishList()
    .then(res => {
      console.log(res.data.data)
      setFavCount(res.data.data.wishListItem.length);
    })
    .catch(error => {
      console.log(error)
    })
  };

  React.useEffect(() => {
    getCategories()
      .then(res => {
        setSelectCategory(res.data.data)
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response.data.result);
          console.log(err.response.status);
          console.log(err.response.data.message);
        }
      })
      viewProfile()
      .then(res => {
        console.log(res.data.data)
        setProfile(res.data.data)
        countCartTotal()
        countFavTotal()
        setIsSignIn(true)
      })
      .catch(error => {
        console.log(error)
      })
  }, []);

  return (
    <>
      <StateContext.Provider value={{ open, setOpen, cartCount, countCartTotal, favCount, countFavTotal, profile, isSignIn }}>
        <Header category={selectCategory} isSignIn={isSignIn} setIsSignIn={setIsSignIn}/>
          <ASide category={selectCategory} />
          <MainContent />
        <div className="mt-4">
          <Bottom />
        </div>
      </StateContext.Provider>
    </>
  )
}

const MainContent = function() {
  return (
    <div className="text-ellipsis flex items-start p-8 max-md:pt-12">
      <div className=" h-full w-full">
        <div className="max-md:pt-0">
            <Outlet />
        </div>
      </div>
    </div>
  )
}