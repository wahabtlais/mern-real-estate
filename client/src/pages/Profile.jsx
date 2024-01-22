import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import {
	updateUserStart,
	updateUserSuccess,
	updateUserFailure,
	deleteUserStart,
	deleteUserSuccess,
	deleteUserFailure,
	signOut,
} from "../redux/user/userSlice";
import { Link } from "react-router-dom";

const Profile = () => {
	const fileRef = useRef(null);
	const dispatch = useDispatch();
	const [image, setImage] = useState(undefined);
	const [imagePercent, setImagePercent] = useState(0);
	const [imageError, setImageError] = useState(false);
	const [formData, setFormData] = useState({});
	const [updateSuccess, setUpdateSuccess] = useState(false);
	const [showListingsError, setShowListingsError] = useState(false);
	const [userListings, setUserListings] = useState([]);

	const { currentUser, loading, error } = useSelector((state) => state.user);
	const handleFileUpload = (image) => {
		const storage = getStorage(app);
		const fileName = new Date().getTime() + image.name;
		const storageRef = ref(storage, fileName);
		const uploadTask = uploadBytesResumable(storageRef, image);
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setImagePercent(Math.round(progress));
			},
			() => {
				setImageError(true);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setFormData({ ...formData, profilePicture: downloadURL });
				});
			}
		);
	};
	useEffect(() => {
		if (image) {
			handleFileUpload(image);
		}
	}, [image]);
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			dispatch(updateUserStart());
			const res = await fetch(`/api/user/update/${currentUser._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			const data = await res.json();
			if (data.success === false) {
				dispatch(updateUserFailure(data));
				return;
			}
			dispatch(updateUserSuccess(data));
			setUpdateSuccess(true);
		} catch (error) {
			dispatch(updateUserFailure(error));
		}
	};
	const handleDeleteAccount = async () => {
		try {
			dispatch(deleteUserStart());
			const res = await fetch(`/api/user/delete/${currentUser._id}`, {
				method: "DELETE",
			});
			const data = await res.json();
			if (data.success === false) {
				dispatch(deleteUserFailure(data));
				return;
			}
			dispatch(deleteUserSuccess(data));
		} catch (error) {
			dispatch(deleteUserFailure(error));
		}
	};
	const handleSignOut = async () => {
		try {
			await fetch("/api/auth/signout");
			dispatch(signOut());
		} catch (error) {
			console.log(error);
		}
	};
	const handleShowListings = async () => {
		try {
			setShowListingsError(false);
			const res = await fetch(`api/user/listings/${currentUser._id}`);
			const data = await res.json();
			if (data.success === false) {
				setShowListingsError(true);
				return;
			}
			setUserListings(data);
		} catch (error) {
			setShowListingsError(true);
		}
	};
	const handleListingDelete = async (listingId) => {
		try {
			const res = await fetch(`/api/listing/delete/${listingId}`, {
				method: "DELETE",
			});
			const data = await res.json();
			if (data.success === false) {
				console.log(data.message);
				return;
			}

			setUserListings((prev) =>
				prev.filter((listing) => listing._id !== listingId)
			);
		} catch (error) {
			console.log(error.message);
		}
	};
	return (
		<div className="p-3 max-w-lg mx-auto">
			<h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<input
					type="file"
					ref={fileRef}
					hidden
					accept="image/*"
					onChange={(e) => setImage(e.target.files[0])}
				/>
				<img
					src={formData.profilePicture || currentUser.profilePicture}
					alt="profile"
					className="h-24 w-24 self-center cursor-pointer rounded-full object-cover"
					onClick={() => fileRef.current.click()}
				/>
				<p className="text-sm self-center">
					{imageError ? (
						<span className="text-red-600">
							Error uploading image (File size be less than 2 MB)
						</span>
					) : imagePercent > 0 && imagePercent < 100 ? (
						<span className="text-slate-700">{`Uploading: ${imagePercent}%`}</span>
					) : imagePercent === 100 ? (
						<span className="text-green-700">Image uploaded successfully</span>
					) : null}
				</p>
				<input
					defaultValue={currentUser.username}
					type="text"
					id="username"
					placeholder="Username"
					className="bg-slate-200 rounded-lg p-3"
					onChange={handleChange}
				/>
				<input
					defaultValue={currentUser.email}
					type="email"
					id="email"
					placeholder="Email"
					className="bg-slate-200 rounded-lg p-3"
					onChange={handleChange}
				/>
				<input
					type="password"
					id="password"
					placeholder="Change Password"
					className="bg-slate-200 rounded-lg p-3"
					onChange={handleChange}
				/>
				<button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
					{loading ? "Loading..." : "Update"}
				</button>
				<Link
					className="bg-blue-950 text-center text-white p-3 rounded-lg uppercase hover:opacity-95"
					to="/create-listing"
				>
					Create Listing
				</Link>
				<button
					onClick={handleShowListings}
					type="button"
					className="bg-blue-900 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
				>
					Show Listings
				</button>
			</form>
			<div className="flex justify-between mt-4">
				<span
					onClick={handleDeleteAccount}
					className="text-red-600 cursor-pointer font-semibold"
				>
					Delete Account
				</span>
				<span
					onClick={handleSignOut}
					className="text-red-600 cursor-pointer font-semibold"
				>
					Sign out
				</span>
			</div>
			<div className="text-center">
				<p className="text-red-700 mt-3">{error && "Something went wrong!"}</p>
				<p className="text-green-700 mt-3">
					{updateSuccess && "Profile updated successfully!"}
				</p>
			</div>
			<p className="text-red-700 mt-3">
				{showListingsError && "Error showing listings!"}
			</p>

			{userListings && userListings.length > 0 && (
				<div className="flex flex-col gap-4">
					<h1 className="text-center mt-7 text-2xl font-semibold">
						Your Listings
					</h1>
					{userListings.map((listing) => (
						<div
							key={listing._id}
							className=" flex items-center gap-4 border justify-between m-3 shadow-md p-3 rounded-lg"
						>
							<Link to={`/listing/${listing._id}`}>
								<img
									src={listing.imageUrls[0]}
									alt="listing cover"
									className="h-16 w-16 object-contain rounded-lg"
								/>
							</Link>
							<Link
								className="text-slate-700 font-semibold hover:underline truncate flex-1"
								to={`/listing/${listing._id}`}
							>
								<p>{listing.title}</p>
							</Link>
							<div className="flex flex-col items-center">
								<button
									onClick={() => handleListingDelete(listing._id)}
									className="text-red-600 uppercase font-semibold text-sm hover:opacity-90"
								>
									Delete
								</button>
								<button className="text-blue-700 uppercase font-semibold text-sm hover:opacity-90">
									Edit
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Profile;
