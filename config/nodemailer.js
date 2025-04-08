import nodemailer from 'nodemailer';
import { EMAIL_PASSWORD } from '../config/env.js';

export const accountEmail = 'ojaswiom1234@gmail.com';

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'ojaswiom1234@gmail.com',
		pass: EMAIL_PASSWORD
	}
});

export default transporter;
