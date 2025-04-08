## Workflows

Workflows are the algorithmic logic that define how the system operates. They are responsible for managing the flow of data and control between different components of the system. Workflows can be thought of as a series of steps or stages that data passes through, with each step performing a specific function or operation.

Steps:

- Triggering the Workflow - the workflow is triggered whenever a user creates/submits a new subscription. We pass the subscription ID to our workflow
- Retrieving Sub Details
-- The process extracts the subscription ID from the context
-- It then searches for the corresponding subscription in the database

- Validation Checks 
-- if sub doesnt exist, error is logged
-- It sub exists, its status is checked
--- If inactive, the status is logged and system exits
--- If active, renewal date is verified

- Renewal Date Check
-- If the renewal date is in the past, the system logs and exits
-- If the renewal date is in the future, the system adds it to the reminder loop

- Reminder Scheduling
-- For each predefined reminder:
-- The reminder date is calculated
-- The system checks if the reminder date is in the past, and sends an email if true
-- Otherwise, sys waits till the time

- Completion
-- Task repeats for all reminders in the list
-- All processing All reminders, workflow concludes
