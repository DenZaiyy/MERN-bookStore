import BackButton from "../components/BackButton";
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import Spinner from "../components/Spinner.tsx";
import bookInterface from "../utils/interface";

const ShowBook = () => {
	const [book, setBook] = useState<bookInterface>({
		_id: 0,
		title: "",
		author: "",
		publishYear: 0,
		createdAt: "",
		updatedAt: "",
	});

	const [loading, setLoading] = useState(false);
	const {id} = useParams();

	const apiUrl = import.meta.env.VITE_APP_API_URL

	useEffect(() => {
		setLoading(true);
		axios
			.get(`${apiUrl}/books/${id}`)
			.then((res) => {
				const data: bookInterface = res.data;
				setBook(data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	}, []);

	return (
		<div className="p-4">
			<BackButton aria-label="Back button"/>
			<h1 className="text-3xl my-4">Show Book</h1>
			{loading ? (
				<Spinner aria-label="Loading"/>
			) : (
				<div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
					<div className="my-4">
						<span className="text-xl mr-4 text-gray-500">Id</span>
						<span>{book._id}</span>
					</div>
					<div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">
                            Title
                        </span>
						<span>{book.title}</span>
					</div>
					<div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">
                            Author
                        </span>
						<span>{book.author}</span>
					</div>
					<div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">
                            Publish Year
                        </span>
						<span>{book.publishYear}</span>
					</div>
					<div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">
                            Create Time
                        </span>
						<span>{new Date(book.createdAt).toString()}</span>
					</div>
					<div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">
                            Last Update Time
                        </span>
						<span>{new Date(book.updatedAt).toString()}</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default ShowBook;
