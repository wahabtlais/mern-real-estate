const CreateListing = () => {
	return (
		<main className="p-3 max-w-4xl mx-auto">
			<h1 className="text-3xl font-semibold text-center my-7 ">
				Create a Listing
			</h1>
			<form className="flex flex-col sm:flex-row gap-4">
				<div className="flex flex-col gap-4 flex-1">
					<input
						type="text"
						placeholder="Title"
						className="p-3 rounded-lg border"
						id="title"
						maxLength="62"
						minLength="10"
						required
					/>
					<textarea
						type="text"
						placeholder="Description"
						className="p-3 rounded-lg border"
						id="description"
						required
					/>
					<input
						type="text"
						placeholder="Address"
						className="p-3 rounded-lg border"
						id="address"
						required
					/>
					<div className="flex gap-6 flex-wrap">
						<div className="flex gap-2">
							<input type="checkbox" id="sale" className="w-4" />
							<label htmlFor="sale" className="font-semibold">
								Sell
							</label>
						</div>
						<div className="flex gap-2">
							<input type="checkbox" id="rent" className="w-4" />
							<label htmlFor="rent" className="font-semibold">
								Rent
							</label>
						</div>
						<div className="flex gap-2">
							<input type="checkbox" id="parking" className="w-4" />
							<label htmlFor="parking" className="font-semibold">
								Parking Spot
							</label>
						</div>
						<div className="flex gap-2">
							<input type="checkbox" id="furnished" className="w-4" />
							<label htmlFor="furnished" className="font-semibold">
								Furnished
							</label>
						</div>
						<div className="flex gap-2">
							<input type="checkbox" id="offer" className="w-4" />
							<label htmlFor="offer" className="font-semibold">
								Offer
							</label>
						</div>
					</div>

					<div className="flex flex-wrap gap-6">
						<div className="flex gap-2 items-center">
							<input
								type="number"
								id="bedrooms"
								min="1"
								max="10"
								required
								className="p-3 border border-gray-400 rounded-lg"
							/>
							<label htmlFor="bedrooms" className="font-semibold">
								Bedrooms
							</label>
						</div>
						<div className="flex gap-2 items-center">
							<input
								type="number"
								id="bathrooms"
								min="1"
								max="10"
								required
								className="p-3 border border-gray-400 rounded-lg"
							/>
							<label htmlFor="bathrooms" className="font-semibold">
								Bathrooms
							</label>
						</div>
						<div className="flex gap-2 items-center">
							<input
								type="number"
								id="regularPrice"
								min="1"
								max="10"
								required
								className="p-3 border border-gray-400 rounded-lg"
							/>
							<label htmlFor="regularPrice" className="font-semibold">
								Regular Price <span className="text-sm">($ / Month)</span>
							</label>
						</div>
						<div className="flex gap-2 items-center">
							<input
								type="number"
								id="discountedPrice"
								min="1"
								max="10"
								required
								className="p-3 border border-gray-400 rounded-lg"
							/>
							<label htmlFor="discountedPrice" className="font-semibold">
								Discounted Price <span className="text-sm">($ / Month)</span>
							</label>
						</div>
					</div>
				</div>
				<div className="flex flex-col flex-1 gap-4">
					<p className="font-semibold">
						Images:
						<span className="font-normal text-gray-700 ml-2">
							The first image will be the cover (max 6)
						</span>
					</p>
					<div className="flex gap-4">
						<input
							className="p-3 border border-gray-300 rounded w-full"
							type="file"
							id="images"
							accept="image/*"
							multiple
						/>
						<button className="p-3 text-blue-700 border border-blue-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
							Upload
						</button>
					</div>
					<button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
						Create Listing
					</button>
				</div>
			</form>
		</main>
	);
};

export default CreateListing;
