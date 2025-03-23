import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [ true, "Subscription name is required"],
		trim: true,
		minLength: 2,
		maxLength: 100,
	},

	price: {
		type: Number,
		required: [ true, "Subscription price is required"],
		min: [0, "Subscription price must be greater than 0"],
	},

	currency: {
		type: String,
		enum: ['INR', 'USD', 'EUR', 'GBP'],
		default: 'INR',
	},

	frequency: {
		type: String,
		enum: ['daily', 'weekly', 'monthly', 'yearly'],
	},

	category: {
		type: String,
		enum: ['sports', 'entertainment', 'news', 'lifestyle', 'education', 'health', 'other'],
		required: true,
	},

	paymentMethod: {
		type: String,
		required: true,
		trim: true,
	},

	status: {
		type: String,
		enum: ['active', 'inactive', 'canceled'],
		default: 'active',
	},

	startDate: {
		type: Date,
		required: true,
		validation: {
			validator: function(value) {
				return value > new Date();
			},
			message: "Start date must be a future date",
		},
	},

	renewalDate: {
		type: Date,
		validation: {
			validator: function(value) {
				return value > this.startDate;
			},
			message: "Renewal date must be after start date",
		},
	},

	// index: true sets indexing on the field
	// which helps in faster search
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
		index: true,
	},

}, {timestamps: true});

// auto calculate renewal date if missing
// based on startDate and renewalPeriod
subscriptionSchema.pre('save', (next) => {
	if (!this.renewalDate) {
		const renewalPeriods = {
			daily: 1,
			weekly: 7,
			monthly: 30,
			yearly: 365,
		};

		this.renewalDate = new Date(this.startDate);
		this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
	}

	// auto update status if renewal date has passed
	if (this.renewalDate < new Date()) {
		this.status = 'inactive';
	}

	next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;
