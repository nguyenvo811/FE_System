import { Outlet } from "react-router-dom";
import * as React from 'react';
import { Footer } from "flowbite-react"
import { MdFacebook } from "react-icons/md"
import { FaDribbble, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import StateContext from "../component/StateContext";
import Bottom from "../component/Bottom";
import Header from "../component/Header";
import ASide from "../component/ASide";
import { getCategories } from "../../api/apiServices";

export default function LayoutClient(){
  // State variable here
  const [open, setOpen] = React.useState(false);

  const [selectCategory, setSelectCategory] = React.useState([]);
  const [selectBrand, setSelectBrand] = React.useState([]);

	// Get categories 
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
  }, []);

  return (
    <>
      <StateContext.Provider value={{ open, setOpen }}>
        <Header category={selectCategory} />
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