import React, { useState, useEffect, useRef } from "react";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import "react-toggle/style.css"
import Carousel from "../component/Carousel";
import Card from "../component/Card";

export default function Home() {

	return (
		<>
			<div className="relative">
				<Carousel />
				<div>
					<Card />
				</div>
			</div>
		</>
	)
}