import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Header = () => {
	const { currentUser } = useSelector((state) => state.user);
	const [searchTerm, setSearchTerm] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		const urlParams = new URLSearchParams(window.location.search);
		urlParams.set("searchTerm", searchTerm);
		const searchQuery = urlParams.toString();
		navigate(`/search?${searchQuery}`);
	};

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const searchTermFromUrl = urlParams.get("searchTerm");
		if (searchTermFromUrl) {
			setSearchTerm(searchTermFromUrl);
		}
	}, [location.search]);

	return (
		<header className="bg-slate-200 shadow-md">
			<div className="flex justify-between items-center max-w-6xl mx-auto p-3">
				<Link to="/">
					<h1 className="font-bold text-sm sm:text-xl flex flex-wrap cursor-pointer">
						<span className="text-slate-500">Urban</span>
						<span className="text-slate-700">Abode</span>
					</h1>
				</Link>
				<form
					onSubmit={handleSubmit}
					className="bg-slate-100 p-2 rounded-lg flex items-center"
				>
					<input
						type="search"
						name="search"
						id="search"
						placeholder="Search..."
						className="bg-transparent focus:outline-none w-24 sm:w-64 p-1 text-slate-700"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<button>
						<FaSearch className="text-slate-700" />
					</button>
				</form>
				<ul className="flex gap-4 font-semibold text-slate-700 cursor-pointer">
					<Link to="/">
						<li className="hidden sm:inline hover:text-slate-500 transition-colors">
							Home
						</li>
					</Link>
					<Link to="/about">
						<li className="hidden sm:inline hover:text-slate-500 transition-colors">
							About
						</li>
					</Link>
					<Link to="/profile">
						{currentUser ? (
							<img
								src={currentUser.profilePicture}
								alt="profile"
								className="h-7 w-7 rounded-full object-cover"
							/>
						) : (
							<li>Sign In</li>
						)}
					</Link>
				</ul>
			</div>
		</header>
	);
};

export default Header;
