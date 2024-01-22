import Listing from "../models/listing.model.js";

export const createListing = async (req, res, next) => {
	try {
		const listing = await Listing.create(req.body);
		return res.status(201).json(listing);
	} catch (error) {
		next(error);
	}
};

export const deleteListing = async (req, res, next) => {
	const listing = await Listing.findById(req.params.id);
	if (!listing) return next(errorHandler(404, "Listing not found!")); // Not found

	if (req.user.id !== listing.userRef)
		return next(errorHandler(401, "You can only delete your own listings!"));

	try {
		await Listing.findByIdAndDelete(req.params.id);
		res.status(200).json("Listing has been deleted successfully!");
	} catch (error) {
		next(error);
	}
};

export const updateListing = async (req, res, next) => {
	// Find the existing listing by id and populate it with its user information
	const listing = await Listing.findById(req.params.id);
	if (!listing) return next(errorHandler(404, "Listing not found!"));

	if (req.user.id !== listing.userRef) {
		// Only allow admins or the owner of the listing to edit a listing
		return next(errorHandler(401, "You can only update your own listings!"));
	}

	try {
		const updatedListing = await Listing.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true } // Return the updated document rather than the original one
		);
		res.status(200).json(updatedListing);
	} catch (error) {
		next(error);
	}
};
