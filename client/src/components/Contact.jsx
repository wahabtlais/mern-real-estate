import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Contact = ({ listing }) => {
	const [landlord, setLandlord] = useState(null);
	const [message, setMessage] = useState("");
	const handleChange = (e) => {
		setMessage(e.target.value);
	};

	useEffect(() => {
		const fetchLandlord = async () => {
			try {
				const res = await fetch(`/api/user/${listing.userRef}`);
				const data = await res.json();
				setLandlord(data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchLandlord();
	}, [listing.userRef]);

	return (
		<>
			{landlord && (
				<div className="flex flex-col gap-2">
					<p>
						Contact <span className="font-semibold">{landlord.username}</span>{" "}
						for{" "}
						<span className="font-semibold">{listing.title.toLowerCase()}</span>
					</p>
					<textarea
						name="message"
						id="message"
						rows="2"
						value={message}
						onChange={handleChange}
						placeholder="Enter your message..."
						className="w-full border p-3 rounded-lg resize-none border-slate-700"
					></textarea>
					<Link
						to={`mailto:${landlord.email}?subject=Regarding ${listing.title}&body=${message}`}
						className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
					>
						Send Message
					</Link>
				</div>
			)}
		</>
	);
};

export default Contact;
