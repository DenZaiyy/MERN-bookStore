import {useState, useEffect} from "react";
import BackButton from "../components/BackButton.tsx";
import Spinner from "../components/Spinner.tsx";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const EditBook = () => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [publishYear, setPublishYear] = useState('')
	const [loading, setLoading] = useState(false)

	const navigate = useNavigate()

	const {id} = useParams()

	useEffect(() => {
		setLoading(true)
		axios
			.get(`http://localhost:5555/books/${id}`)
			.then((res) => {
				setTitle(res.data.title)
				setAuthor(res.data.author)
				setPublishYear(res.data.publishYear)
				setLoading(false)
			})
			.catch((err) => {
				setLoading(false)
				alert('An error happened. Please check console')
				console.log(err)
			})
	}, []);

	const handleEditBook = () => {
		const data = {
			title,
			author,
			publishYear
		}
		setLoading(true)

		axios
			.put(`http://localhost:5555/books/${id}`, data)
			.then(() => {
				setLoading(false)
				navigate('/')
			})
			.catch((err) => {
				setLoading(false)
				alert('An error happened. Please check console')
				console.log(err)
			})
	}


	return (
		<div className="p-4">
			<BackButton/>
			<h1 className="text-3xl my-4">Edit Book</h1>
			{loading ? (
				<Spinner/>
			) : (
				<div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
					<div className="my-4">
						<label htmlFor="title" className="text-xl mr-4 text-gray-500">Title</label>
						<input
							type="text"
							id="title"
							name="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="border-2 border-gray-500 px-4 py-2 w-full"
						/>
					</div>
					<div className="my-4">
						<label htmlFor="author" className="text-xl mr-4 text-gray-500">Author</label>
						<input
							type="text"
							id="author"
							name="author"
							value={author}
							onChange={(e) => setAuthor(e.target.value)}
							className="border-2 border-gray-500 px-4 py-2 w-full"
						/>
					</div>
					<div className="my-4">
						<label htmlFor="publishyear" className="text-xl mr-4 text-gray-500">PublishYear</label>
						<input
							type="number"
							id="publishyear"
							name="publishyear"
							value={publishYear}
							onChange={(e) => setPublishYear(e.target.value)}
							className="border-2 border-gray-500 px-4 py-2 w-full"
						/>
					</div>
					<button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>Edit</button>
				</div>
			)}
		</div>
	);
};

export default EditBook;
