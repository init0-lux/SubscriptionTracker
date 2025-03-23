const errorMiddleware = (err, req, res, next) => {
	try{
		let error = { ... err };
		error.message = err.message;

		console.error(err);

		// Mongoose bad ObjectId
		if (err.name === 'CastError') {
			const message = `Resource not found with id of ${err.value}`;
			error = new ErrorResponse(message, 404);
		}

		// Mongoose Duplicate Key
		if (err.code === 11000) {
			const message = 'Duplicate field value entered';
			error = new ErrorResponse(message, 400);
		}

		// Mongoose Validation Error
		if (err.name === 'ValidationError') {
			const message = Object.values(err.errors).map(val => val.message);
			error = new ErrorResponse(message.join(', '), 400);
		}

		res.status(error.statusCode || 500).json({
			success: false,
			error: error.message || 'Server Error'
		});
	}
	catch (error){
		next(error);
	}
}

// create a subscription -> middleware ( check for renewal date ) -> middleware (check for errors) -> controller
// controller handles the actual logic

export default errorMiddleware;
