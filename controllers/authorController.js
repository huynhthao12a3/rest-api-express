const { Book, Author } = require("../model/model");

const authorController = {
	// ADD AUTHOR
	addAuthor: async (req, res) => {
		try {
			const newAuthor = new Author(req.body);
			const savedAuthor = await newAuthor.save();
			res.json({
				success: true,
				data: savedAuthor,
			});
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// GET ALL AUTHOR
	getAllAuthor: async (req, res) => {
		try {
			const authors = await Author.find();
			res.json({ success: true, data: authors });
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// GET AN AUTHOR
	getAnAuthor: async (req, res) => {
		try {
			const author = await Author.findById(req.params.id).populate("books");
			res.json({ success: true, data: author });
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// UPDATE AN AUTHOR
	updateAnAuthor: async (req, res) => {
		try {
			const author = await Author.findById(req.params.id);
			await author.updateOne({ $set: req.body });
			res.json({ success: true, data: await Author.findById(req.params.id) });
		} catch (error) {
			res.status(500).json(error);
		}
	},
};

module.exports = authorController;
