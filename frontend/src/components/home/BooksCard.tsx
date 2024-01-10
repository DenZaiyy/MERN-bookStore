import BookSingleCard from "./BookSingleCard";
import bookInterface from "../../utils/interface.ts";

interface BooksCardProps {
	books: bookInterface[];
}

const BooksCard = ({books}: BooksCardProps) => {
	return (
		<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{books.map((item) => (
				<BookSingleCard key={item._id} book={item}/>
			))}
		</div>
	);
};

export default BooksCard;