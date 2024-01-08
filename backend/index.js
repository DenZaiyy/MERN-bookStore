import express from 'express';
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"

dotenv.config();

//routes
import booksRoute from "./routes/booksRoute.js"

const app = express();
const port = process.env.SERV_PORT;

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow all Origins with Default of cors (*)
app.use(cors());
// Option 2: Allow custom Origins
/*app.use(cors({
	origin: "http://localhost:5173",
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-Type']
}))*/

app.get('/', ( req, res ) => {
	console.log(req)
	return res.status(234).send('Hello World!');
})

app.use("/books", booksRoute)

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("MongoDB connected")
		app.listen(port, () => {
			console.log(`Server listening on ${port}`);
		})
	})
	.catch(err => console.log(err));