import dayjs from 'dayjs';
import Subscription from '../models/subscription.model.js';
import { workflowClient } from '../config/upstash.js';

import { sendReminderEmail } from '../utils/send-email.js';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
// this enables 'require' in esm, which the rest of the project is using

const { serve } = require('@upstash/workflow/express'); // upstash was written using commonjs, therefore no esm

const REMINDERS = [7, 5, 2, 1];

export const sendReminders = serve( async ( context ) => {
	const { subscriptionId } = context.requestPayload;
	const subscription = await fetchSubscription( context, subscriptionId );

	if ( !subscription || subscription.status !== 'active' ) return;

	const renewalDate = dayjs(subscription.renewalDate);

	// renewal date has passed.
	if( renewalDate.isBefore(dayjs()) ){
		console.log(`Subscription ${subscriptionId} is overdue for renewal. Stopping Workflow`);
		return;
	}

	// actual workflow logic
	for(const daysBefore of REMINDERS){
		const reminderDate = renewalDate.subtract(daysBefore, 'day');

		// if reminderDate is 22 feb, reminders will be set for 15, 17, 20, 21 feb

		if ( reminderDate.isAfter(dayjs()) ){
			// pause the reminder
			// sleepUntilReminder(context, label, reminderDate);
			await sleepUntilReminder( context, `Reminder: ${daysBefore} days before`, reminderDate );
			return;
		}

		if ( now.isSame(reminderDate, 'day') ){
			await triggerReminder(context, `${daysBefore} days before reminder`, subscription);
		}

		await triggerReminder( context, `${daysBefore} days before reminder`, subscription);
	}

	// getting out of the workflow is sorted, now we figure out what to do in the workflow
});

const fetchSubscription = async ( context, subscriptionId ) => {
	return await context.run('get subscription', () => {
		return Subscription.findById(subscriptionId).populate('user', 'name email');
	});
};

const sleepUntilReminder = async ( context, label, date ) => {
	console.log(`Sleeping until ${label} at ${date}`);
	await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async ( context, label, subscription ) => {
	return await context.run(label, async () => {
		// any custom logic goes here
		console.log(`Triggering ${label} reminder`);

		await sendReminderEmail({
			to: subscription.user.email,
			type: label,
			subscription: subscription
		});
	});
};
