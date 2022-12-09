const { Book, Author } = require("../model/model");

const bookController = {
	// ADD BOOK
	addBook: async (req, res) => {
		try {
			const newBook = new Book(req.body);
			const savedBook = await newBook.save();
			if (req.body.author) {
				const author = Author.findById(req.body.author);
				await author.updateOne({ $push: { books: savedBook._id } });
			}
			res.json({ success: true, data: savedBook });
		} catch (error) {
			res.json(error);
		}
	},

	// GET ALL BOOK
	getAllBook: async (req, res) => {
		try {
			const books = await Book.find();
			res.json({ success: true, data: books });
		} catch (error) {
			res.json(error);
		}
	},

	// GET A BOOK
	getABook: async (req, res) => {
		try {
			const book = await Book.findById(req.params.id).populate("author");
			res.json({ success: true, data: book });
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// UPDATE A BOOK
	updateABook: async (req, res) => {
		try {
			const book = await Book.findById(req.params.id);
			await book.updateOne({ $set: req.body });
			res.json({ success: true, data: await Book.findById(req.params.id) });
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// DELETE A BOOK
	deleteABook: async (req, res) => {
		try {
			await Author.updateMany(
				{
					books: req.params.id,
				},
				{
					$pull: { books: req.params.id },
				}
			);
			await Book.findByIdAndDelete(req.params.id);
			res.json({ success: true, data: await Book.findById(req.params.id) });
		} catch (error) {
			res.status(500).json(error);
		}
	},
};

module.exports = bookController;
