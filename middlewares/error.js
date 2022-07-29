const errorHandling = (err, req, res, next) => {
	console.error(err.stack)
	res.status(500).send('Something went wrong...');
	next()
};

module.exports = {
	errorHandling
}
