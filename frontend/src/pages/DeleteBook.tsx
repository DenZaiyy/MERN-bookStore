import {useState} from "react";
import BackButton from "../components/BackButton.tsx";
import Spinner from "../components/Spinner.tsx";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {useSnackbar} from "notistack";


const DeleteBook = () => {
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const {id} = useParams()
	const {enqueueSnackbar} = useSnackbar()

	const apiUrl = import.meta.env.VITE_APP_API_URL

	const handleDeleteBook = () => {
		setLoading(true)
		axios
			.delete(`${apiUrl}/books/${id}`)
			.then(() => {
				setLoading(false)
				enqueueSnackbar('Book deleted successfully', {variant: 'success'})
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
			<h1 className="text-3xl my-4">Delete Book</h1>
			{loading && (<Spinner aria-label="Loading"/>)}
			<div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
				<h3 className="text-2xl">Are you sure you want to delete this book ?</h3>
				<button className="p-4 bg-red-600 text-white w-full m-8" onClick={handleDeleteBook}>Yes, delete it</button>
			</div>
		</div>
	);
};

export default DeleteBook;
