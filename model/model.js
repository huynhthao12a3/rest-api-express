const mongoose = require("mongoose");

// Author
const authorSchema = new mongoose.Schema({
	name: {
		type: String,
	},

	year: {
		type: Number,
	},

	books: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Book",
		},
	],
});

// Book
const bookSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},

	publishedDate: {
		type: String,
	},

	genres: {
		type: [String],
	},

	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Author",
	},
});

let Book = mongoose.model("Book", bookSchema);
let Author = mongoose.model("Author", authorSchema);

module.exports = { Author, Book };
