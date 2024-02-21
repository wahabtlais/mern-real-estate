import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

const ListingCard = ({ listing }) => {
	return (
		<di className="bg-slate-100 shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[300px]">
			<Link to={`/listing/${listing._id}`}>
				<img
					src={listing.imageUrls[0]}
					alt="listing cover"
					className="h-[320px] sm:h-[220px] object-cover hover:scale-105 transition-scale duration-500 ease-in-out"
				/>
				<div className="p-3 flex flex-col gap-2 w-full">
					<p className="truncate text-lg font-semibold text-slate-900">
						{listing.title}
					</p>
					<div className="flex items-center gap-1 text-sm text-gray-600 w-full">
						<MdLocationOn className="h-4 w-4 text-blue-700" />
						<p>{listing.address}</p>
					</div>
					<p className="text-sm text-gray-600 line-clamp-2">
						{listing.description}
					</p>
					<p className="text-slate-700 font-semibold mt-2 ">
						$
						{listing.offer
							? (+listing.regularPrice - +listing.discountPrice).toLocaleString(
									"en-US"
							  )
							: listing.regularPrice.toLocaleString("en-US")}
						{listing.type === "rent" && " / month"}
					</p>
					<div className="flex gap-3">
						<div className="font-bold text-xs rounded bg-blue-700 px-2 py-1 text-white">
							{listing.bedrooms > 1
								? `${listing.bedrooms} Bedrooms`
								: `${listing.bedrooms} Bedroom`}
						</div>
						<div className="font-bold text-xs rounded bg-blue-700 px-2 py-1 text-white">
							{listing.bathrooms > 1
								? `${listing.bathrooms} Bathrooms`
								: `${listing.bathrooms} Bathroom`}
						</div>
					</div>
				</div>
			</Link>
		</di>
	);
};

export default ListingCard;
