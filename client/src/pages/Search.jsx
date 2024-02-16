const Search = () => {
	return (
		<div className="flex flex-col md:flex-row ">
			<div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
				<form className="flex flex-col gap-8">
					<div className="flex gap-2 flex-wrap items-center">
						<label className="font-bold">Type:</label>
						<div className="flex gap-2">
							<input type="checkbox" id="all" className="w-5" />
							<span className="font-semibold">Rent & Sale</span>
						</div>
						<div className="flex gap-2">
							<input type="checkbox" id="rent" className="w-5" />
							<span className="font-semibold">Rent</span>
						</div>
						<div className="flex gap-2">
							<input type="checkbox" id="sale" className="w-5" />
							<span className="font-semibold">Sale</span>
						</div>
						<div className="flex gap-2">
							<input type="checkbox" id="offer" className="w-5" />
							<span className="font-semibold">Offer</span>
						</div>
					</div>
					<div className="flex gap-2 flex-wrap items-center">
						<label className="font-bold">Amenities:</label>
						<div className="flex gap-2">
							<input type="checkbox" id="parking" className="w-5" />
							<span className="font-semibold">Parking</span>
						</div>
						<div className="flex gap-2">
							<input type="checkbox" id="furnished" className="w-5" />
							<span className="font-semibold">Furnished</span>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<label className="font-bold">Sort:</label>
						<select
							id="sort_order"
							className="border rounded-lg p-3 font-semibold border-slate-700"
						>
							<option className="font-semibold">Price - Low to High</option>
							<option className="font-semibold">Price - High to Low</option>
							<option className="font-semibold">Latest</option>
							<option className="font-semibold">Oldest</option>
						</select>
					</div>
					<button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
						Search
					</button>
				</form>
			</div>
			<div className="">
				<h1 className="text-2xl font-semibold border-b p-3 text-slate-900 mt-2">
					Listing results:
				</h1>
			</div>
		</div>
	);
};

export default Search;
