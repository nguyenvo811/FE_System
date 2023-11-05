import React, { useState, useEffect, useRef } from "react";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import "react-toggle/style.css"
import Header from "../component/Header";
import Carousel from "../component/Carousel";

export default function Home() {

	return (
		<>
			<div className="relative p-8">
				<Carousel />
			</div>
		</>
	)
}