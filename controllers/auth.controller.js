import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js';

// req body: req.body is an object containing data from the client
// using the post request, as specified in authRoutes.js
// example: action parameter of form in html

export const signUp = async ( req, res, next ) => {
	// implement signup logic
	const session = await mongoose.startSession(); // not user session
	session.startTransaction();

	try{
		// logic to create new user
		const { name, email, password } = req.body;
		const existingUser = await User.findOne( {email} );

		if(existingUser){
			const error = new Error('User already exists');
			error.statusCode = 409;
			throw error;
		}

		// if user does not exist, create new user by hashing the password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUsers = await User.create([{ name, email, password: hashedPassword }], {session: session});
		const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

		await session.commitTransaction();
		session.endSession();

		res.status(201).json({
			success: true,
			message: 'User created successfully',
			data: {
				token,
				user: newUsers[0],
			}
		});
	}
	catch (error) {
		await session.abortTransaction();
		session.endSession();
		next(error);
	}
};

export const signIn = async ( req, res, next ) => {
};

export const signOut = async ( req, res, next ) => {
};
