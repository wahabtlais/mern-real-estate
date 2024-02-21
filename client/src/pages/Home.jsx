import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import ListingCard from "../components/ListingCard";

const Home = () => {
	const [offerListings, setOfferListings] = useState([]);
	const [saleListings, setSaleListings] = useState([]);
	const [rentListings, setRentListings] = useState([]);
	SwiperCore.use([Navigation]);

	useEffect(() => {
		const fetchOfferListings = async () => {
			try {
				const res = await fetch(
					"/api/listing/get?searchTerm=&type=all&parking=false&furnished=false&offer=true&sort=created_at&order=desc&limit=4"
				);
				const data = await res.json();
				setOfferListings(data);
				fetchRentListings();
			} catch (error) {
				console.log(error);
			}
		};
		const fetchRentListings = async () => {
			try {
				const res = await fetch(
					"/api/listing/get?searchTerm=&type=rent&parking=false&furnished=false&offer=false&sort=created_at&order=desc&limit=4"
				);
				const data = await res.json();
				setRentListings(data);
				fetchSaleListings();
			} catch (error) {
				console.log(error);
			}
		};

		const fetchSaleListings = async () => {
			try {
				const res = await fetch(
					"/api/listing/get?searchTerm=&type=sale&parking=false&furnished=false&offer=false&sort=created_at&order=desc&limit=4"
				);
				const data = await res.json();
				setSaleListings(data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchOfferListings();
	}, []);
	return (
		<div>
			{/* Top */}
			<div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
				<h1 className="text-slate-700 font-bold text-3xl lg:text-6xl uppercase">
					Find your next <span className="text-slate-500">perfect</span>
					<br />
					place with ease
				</h1>
				<div className="text-gray-500 text-md flex flex-col gap-8">
					Urban Abode is the best place to find your dream home.
					<br />
					We have a wide range of properties for you to choose from.
					<Link to={"/search"}>
						<button className="btn btn-primary bg-blue-900 text-white p-3 rounded-3xl items-center text-sm  hover:bg-blue-800 transition duration-200">
							Explore Now &#8594;
						</button>
					</Link>
				</div>
			</div>

			{/* Swiper */}
			<Swiper navigation>
				{offerListings &&
					offerListings.length > 0 &&
					offerListings.map((listing) => (
						<SwiperSlide key={listing._id}>
							<div
								style={{
									background: `url(${listing.imageUrls[0]}) center no-repeat`,
									backgroundSize: "cover",
								}}
								className="h-[700px]"
							></div>
						</SwiperSlide>
					))}
			</Swiper>

			{/* Listing results for offer, sale and rent */}
			<div className="max-w-7xl mx-auto p-3 flex flex-col gap-8 my-10 ">
				{offerListings && offerListings.length > 0 && (
					<div className="flex flex-col gap-2">
						<div>
							<h2 className="text-2xl font-semibold text-slate-600">
								Recent Offers
							</h2>
						</div>
						<div className="flex flex-wrap gap-4">
							{offerListings.map((listing) => (
								<ListingCard listing={listing} key={listing._id} />
							))}
						</div>
						<Link
							to={
								"/search?searchTerm=&type=all&parking=false&furnished=false&offer=true&sort=created_at&order=asc"
							}
							className="text-sm text-blue-700 hover:underline font-semibold"
						>
							View All Offers
						</Link>
					</div>
				)}
				{rentListings && rentListings.length > 0 && (
					<div className="flex flex-col gap-2">
						<div>
							<h2 className="text-2xl font-semibold text-slate-600">
								Recent Places for Rent
							</h2>
						</div>
						<div className="flex flex-wrap gap-4">
							{rentListings.map((listing) => (
								<ListingCard listing={listing} key={listing._id} />
							))}
						</div>
						<Link
							to={
								"/search?searchTerm=&type=rent&parking=false&furnished=false&offer=false&sort=created_at&order=asc"
							}
							className="text-sm text-blue-700 hover:underline font-semibold"
						>
							View All Places
						</Link>
					</div>
				)}
				{saleListings && saleListings.length > 0 && (
					<div className="flex flex-col gap-2">
						<div>
							<h2 className="text-2xl font-semibold text-slate-600">
								Recent Places for Sale
							</h2>
						</div>
						<div className="flex flex-wrap gap-4">
							{saleListings.map((listing) => (
								<ListingCard listing={listing} key={listing._id} />
							))}
						</div>
						<Link
							to={
								"/search?searchTerm=&type=sale&parking=false&furnished=false&offer=false&sort=created_at&order=asc"
							}
							className="text-sm text-blue-700 hover:underline font-semibold"
						>
							View All Places
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default Home;
