import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
=======
import ListingCard from "../components/ListingCard";
>>>>>>> 9b068e5 (Create listing card component and show listings)

const Search = () => {
	const navigate = useNavigate();
	const [sidebarData, setSidebarData] = useState({
		type: "all",
		parking: false,
		furnished: false,
		offer: false,
		sort: "created_at",
		order: "desc",
	});

	const [loading, setLoading] = useState(false);
	const [listings, setListings] = useState([]);

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const typeFromUrl = urlParams.get("type");
		const parkingFromUrl = urlParams.get("parking");
		const furnishedFromUrl = urlParams.get("furnished");
		const offerFromUrl = urlParams.get("offer");
		const sortFromUrl = urlParams.get("sort");
		const orderFromUrl = urlParams.get("order");

		if (
			typeFromUrl ||
			parkingFromUrl ||
			furnishedFromUrl ||
			offerFromUrl ||
			sortFromUrl ||
			orderFromUrl
		) {
			setSidebarData({
				type: typeFromUrl || "all",
				parking: parkingFromUrl === "true" ? true : false,
				furnished: furnishedFromUrl === "true" ? true : false,
				offer: offerFromUrl === "true" ? true : false,
				sort: sortFromUrl || "created_at",
				order: orderFromUrl || "desc",
			});
		}

		const fetchListings = async () => {
			setLoading(true);
			const searchQuery = urlParams.toString();
			const res = await fetch(`/api/listing/get?${searchQuery}`);
			const data = await res.json();
			setListings(data);
			setLoading(false);
		};
		fetchListings();
	}, [location.search]);

	const handleChange = (e) => {
		if (
			e.target.id === "all" ||
			e.target.id === "rent" ||
			e.target.id === "sale"
		) {
			setSidebarData({ ...sidebarData, type: e.target.id });
		}

		if (
			e.target.id === "parking" ||
			e.target.id === "furnished" ||
			e.target.id === "offer"
		) {
			setSidebarData({
				...sidebarData,
				[e.target.id]:
					e.target.checked || e.target.checked === "true" ? true : false,
			});
		}

		if (e.target.id === "sort_order") {
			const sort = e.target.value.split("_")[0] || "created_at";
			const order = e.target.value.split("_")[1] || "desc";

			setSidebarData({ ...sidebarData, sort, order });
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const urlParams = new URLSearchParams();
		urlParams.set("type", sidebarData.type);
		urlParams.set("parking", sidebarData.parking);
		urlParams.set("furnished", sidebarData.furnished);
		urlParams.set("offer", sidebarData.offer);
		urlParams.set("sort", sidebarData.sort);
		urlParams.set("order", sidebarData.order);

		const searchQuery = urlParams.toString();
		navigate(`/search?${searchQuery}`);
	};
	return (
		<div className="flex flex-col md:flex-row ">
			<div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
				<form onSubmit={handleSubmit} className="flex flex-col gap-8">
					<div className="flex gap-2 flex-wrap items-center">
						<label className="font-bold">Type:</label>
						<div className="flex gap-2">
							<input
								type="checkbox"
								id="all"
								className="w-5"
								onChange={handleChange}
								checked={sidebarData.type === "all"}
							/>
							<span className="font-semibold">Rent & Sale</span>
						</div>
						<div className="flex gap-2">
							<input
								type="checkbox"
								id="rent"
								className="w-5"
								onChange={handleChange}
								checked={sidebarData.type === "rent"}
							/>
							<span className="font-semibold">Rent</span>
						</div>
						<div className="flex gap-2">
							<input
								type="checkbox"
								id="sale"
								className="w-5"
								onChange={handleChange}
								checked={sidebarData.type === "sale"}
							/>
							<span className="font-semibold">Sale</span>
						</div>
						<div className="flex gap-2">
							<input
								type="checkbox"
								id="offer"
								className="w-5"
								onChange={handleChange}
								checked={sidebarData.offer}
							/>
							<span className="font-semibold">Offer</span>
						</div>
					</div>
					<div className="flex gap-2 flex-wrap items-center">
						<label className="font-bold">Amenities:</label>
						<div className="flex gap-2">
							<input
								type="checkbox"
								id="parking"
								className="w-5"
								onChange={handleChange}
								checked={sidebarData.parking}
							/>
							<span className="font-semibold">Parking</span>
						</div>
						<div className="flex gap-2">
							<input
								type="checkbox"
								id="furnished"
								className="w-5"
								onChange={handleChange}
								checked={sidebarData.furnished}
							/>
							<span className="font-semibold">Furnished</span>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<label className="font-bold">Sort:</label>
						<select
							id="sort_order"
							className="border rounded-lg p-3 font-semibold border-slate-700"
							onChange={handleChange}
							defaultValue={"created_at_desc"}
						>
							<option className="font-semibold" value="regularPrice_asc">
								Price - Low to High
							</option>
							<option className="font-semibold" value="regularPrice_desc">
								Price - High to Low
							</option>
							<option className="font-semibold" value="createdAt_desc">
								Latest
							</option>
							<option className="font-semibold" value="createdAt_asc">
								Oldest
							</option>
						</select>
					</div>
					<button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
						Search
					</button>
				</form>
			</div>
			<div className="flex-1">
				<h1 className="text-2xl font-semibold border-b p-3 text-slate-900 mt-2">
					Listing results:
				</h1>
				<div className="p-7 flex flex-wrap gap-4">
					{!loading && listings.length === 0 && (
						<p className="text-xl text-slate-700 font-bold text-center w-full">
							No matching listings found!
						</p>
					)}
					{loading && (
						<p className="text-xl text-slate-700 text-center w-full">
							Loading...
						</p>
					)}
					{!loading &&
						listings &&
						listings.map((listing) => (
							<ListingCard key={listing._id} listing={listing} />
						))}
				</div>
			</div>
		</div>
	);
};

export default Search;
