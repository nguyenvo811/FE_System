import React, { useState, useEffect, useRef } from "react";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import "react-toggle/style.css"
import { viewProfile } from "../../api/apiServices";
import ChangePassword from "../page/user/ChangePassword";

export default function NavBar() {
	const navigate = useNavigate();
	const [showSearch, setShowSearch] = useState(false);
	const [profile, setProfile] = useState([]);
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleLogOut = () => {
		localStorage.clear();
		navigate("/sign-in")
	}

	useEffect(() => {
		viewProfile()
			.then(res => {
				console.log(res.data.data)
				setProfile(res.data.data)
			})
			.catch(error => {
				console.log(error)
			})
	}, [])

	return (
		<>
			<nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
				<div className="px-3 py-3 lg:px-5 lg:pl-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center justify-start">
							<button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
								<span className="sr-only">Open sidebar</span>
								<svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
									<path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
								</svg>
							</button>
							<div class="flex items-center" onClick={() => navigate("/")}>
								<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
									<path stroke-linecap="round" stroke-linejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
								</svg>
								<span class="cursor-pointer ml-2 font-semibold text-black">DeviceDex</span>
							</div>
						</div>
						<div className="flex items-center">
							<div className="flex items-center ml-3">
								<div>
									<button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
										<span className="sr-only">Open user menu</span>
										<img className="w-8 h-8 rounded-full object-cover object-center" src={profile.image} />
									</button>
								</div>
								<div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
									<div className="px-4 py-3" role="none">
										<p className="text-sm text-gray-900 dark:text-white" role="none">
											{profile.fullName}
										</p>
										<p className="text-sm font-medium text-gray-900 truncate " role="none">
											{profile.email}
										</p>
									</div>
									<ul className="py-1" role="none">
										<li>
											<a onClick={() => navigate("/")} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Home</a>
										</li>
										<li>
											<a onClick={handleClickOpen} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Change password</a>
										</li>
										<li>
											<a onClick={() => handleLogOut()}
												className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav>
			<ChangePassword open={open} close={handleClose} />
		</>
	)
}