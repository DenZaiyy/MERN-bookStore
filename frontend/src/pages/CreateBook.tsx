import {useState} from "react";
import BackButton from "../components/BackButton.tsx";
import Spinner from "../components/Spinner.tsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useSnackbar} from "notistack";

const CreateBook = () => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [publishYear, setPublishYear] = useState('')
	const [loading, setLoading] = useState(false)

	const navigate = useNavigate()

	const {enqueueSnackbar} = useSnackbar()

	const handleSaveBook = () => {
		const data = {
			title,
			author,
			publishYear
		}
		setLoading(true)

		axios
			.post('http://localhost:5555/books', data)
			.then(() => {
				setLoading(false)
				enqueueSnackbar('Book saved successfully', {variant: 'success'})
				navigate('/')
			})
			.catch((err) => {
				setLoading(false)
				enqueueSnackbar('Error', {variant: 'error'})
				console.log(err)
			})
	}


	return (
		<div className="p-4">
			<BackButton aria-label="Back button"/>
			<h1 className="text-3xl my-4">Create Book</h1>
			{loading ? (
				<Spinner aria-label="Loading"/>
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
					<button className="p-2 bg-sky-300 m-8" onClick={handleSaveBook}>Save</button>
				</div>
			)}
		</div>
	);
};

export default CreateBook;
