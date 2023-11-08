import * as React from "react";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import "react-toggle/style.css";
import StateContext from "./StateContext";

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
	const { open, setOpen } = useStateContext();
	const [isOpen, setIsOpen] = React.useState(false);
	const [getId, setGetId] = React.useState("");

	const { category, subCategory } = props;

	const listSubCategory = subCategory?.filter(val => val.parentId._id === getId);

	const renderCategory = category.map((val, index) => {
		return (
			<>
				<li 
					key={index} 
					class="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:text-gray-800 hover:bg-gray-100"
					onClick={() => navigate(`/${val.categoryName.toLowerCase()}`)}
					onMouseOver={() => {return setIsOpen(true), setGetId(val._id)}}
				>
					<a>
						{val.categoryName}
					</a>
				</li>
			</>
		)
	})

	const renderSubCategory = listSubCategory.map((val, index) => {
		return (
			<li
				key={index} 
				class="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:text-gray-800 hover:bg-gray-100"
				onClick={() => navigate(`/${val.categoryName.toLowerCase()}`)}
			>
					<a>
						{val.categoryName}
					</a>
			</li>
		)
	})

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

						<div class="flex items-center">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
							</svg>
							<span class="cursor-pointer ml-2 font-semibold text-white">What a Market</span>
						</div>

						<div class="ml-6 flex flex-1 gap-x-3">
							<input type="text" class="w-full rounded-md border border-[#DDE2E4] px-3 py-2 text-sm text-gray-800" placeholder="Searching..." />
						</div>

						<div class="ml-2 flex text-white">
							<div class="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:text-gray-800 hover:bg-gray-100">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
									<path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
									<path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd" />
								</svg>
								<span class="text-sm font-medium">Orders</span>
							</div>

							<div 
								class="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:text-gray-800 hover:bg-gray-100"
								onClick={() => navigate("/favorites")}
							>
								<div class="relative">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
										<path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
									</svg>
									<span class="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">3</span>
								</div>
								<span class="text-sm font-medium">Favorites</span>
							</div>

							<div 
								class="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:text-gray-800 hover:bg-gray-100"
								onClick={() => navigate("/cart")}
							>
								<div class="relative">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
										<path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
									</svg>
									<span class="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">3</span>
								</div>
								<span class="text-sm font-medium">Cart</span>
							</div>

							<button 
								type="button" 
								class="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md  py-2 px-4 bg-green-400 hover:text-gray-800 hover:bg-gray-100"
								onClick={() => navigate("/sign-in")}
							>
								<span class="text-sm font-medium">Sign in</span>
							</button>
						</div>
					</div>

					<div class="bg-blue-600 px-2 py-2 lg:px-5 lg:pl-3 flex justify-center">
						<ul class="flex gap-x-8 text-white" >
							{renderCategory}
						</ul>
					</div>
				</div>

				<div className="relative">
					<div
						class={`absolute w-full bg-white border-1 py-1 px-4 text-gray-800 ${isOpen ? "block" : "hidden"}`}
					>
						<ul onMouseLeave={() => {return setIsOpen(false), setGetId("")}}>
							{renderSubCategory}
						</ul>
					</div>
				</div>
			</div>
			
		</>
	)
}