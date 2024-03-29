import {useState, useEffect} from "react";
import axios from "axios";
import Spinner from "../components/Spinner.tsx";
import {Link} from "react-router-dom";
import {MdOutlineAddBox} from "react-icons/md";
import bookInterface from "../utils/interface.ts";
import BooksTable from "../components/home/BooksTable.tsx";
import BooksCard from "../components/home/BooksCard.tsx";

const Home = () => {
	const [books, setBooks] = useState<bookInterface[]>([])
	const [loading, setLoading] = useState(false)
	const [showType, setShowType] = useState('table')

	const apiUrl = import.meta.env.VITE_APP_API_URL

	useEffect(() => {
		setLoading(true)
		axios
			.get(`${apiUrl}/books`)
			.then((res) => {
				setBooks(res.data.data)
				setLoading(false)
			})
			.catch((err) => {
				console.log(err)
				setLoading(false)
			})
	}, []);

	return (
		<div className="p-4">
			<div className='flex justify-center items-center gap-x-4'>
				<button
					className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
					onClick={() => setShowType('table')}
				>
					Table
				</button>
				<button
					className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
					onClick={() => setShowType('card')}
				>
					Card
				</button>
			</div>
			<div className="flex justify-center items-center">
				<h1 className="text-3xl my-8">Books List</h1>
				<Link to="/books/create">
					<MdOutlineAddBox className="text-sky-800 text-4xl"/>
				</Link>
			</div>
			{loading ? (
				<Spinner aria-label="Loading"/>
			) : showType === 'table' ? (
				<BooksTable books={books} />
			) : (
				<BooksCard books={books} />
			)}
		</div>
	);
};

export default Home;
