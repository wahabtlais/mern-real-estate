import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
	const { currentUser } = useSelector((state) => state.user);
	return (
		<header className="bg-slate-200 shadow-md">
			<div className="flex justify-between items-center max-w-6xl mx-auto p-3">
				<Link to="/">
					<h1 className="font-bold text-sm sm:text-xl flex flex-wrap cursor-pointer">
						<span className="text-slate-500">Urban</span>
						<span className="text-slate-700">Abode</span>
					</h1>
				</Link>
				<form className="bg-slate-100 p-2 rounded-lg flex items-center">
					<input
						type="search"
						name="search"
						id="search"
						placeholder="Search..."
						className="bg-transparent focus:outline-none w-24 sm:w-64 p-1 text-slate-700"
					/>
					<FaSearch className="text-slate-700" />
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
