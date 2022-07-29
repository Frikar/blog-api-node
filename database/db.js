const moongose = require("mongoose");

const connectDb = async () => {
	await moongose.connect(process.env.DATABASE_URL);
};

module.exports = {
	connectDb
}
