# Blink-frontend-interview
Home assignment for a FE position

## Problem Definition

A busy hospital has a paper list of patients waiting to see a doctor.
Once there is availability, the front desk calls each patient to offer the appointment in the same order they were added to the waitlist.
The staff member from the front desk has noticed that they waste time trying to find an available patient because the paper list contains too much information.

She would like to view all the waitlist patients, filter them by their age and/or by their average reply time. This view will increase their chances to find an available patient in the first few calls.

## Interview Task
Given the list (see sample-data/patients.json), create a card view that will display all the information about each patient in the waiting list (name, age, averageReplyTime, acceptedOffers, canceledOffers);
The front desk should filter the card view by age and by averageReplyTime and sort it by name and by age.
Take into consideration that the list may contain many patients.

## Patient Model

- ID
- Age (in years)
- acceptedOffers (integer)
- canceledOffers (integer)
- averageReplyTime (integer, in seconds)

## Deliverables
You should write the code in Angular, and work with the mock data provided (sample-data/patients.json).
Your application should contain a card list view that includes all patients' information and an option to filter and sort the list.
You can take inspiration from the following card views, but you can do whatever you want:

https://dribbble.com/shots/5538143-Project-management-tool-Projects-Card-view
https://dribbble.com/shots/6849239-Online-Course-Dashboard-Card-View-Data
https://dribbble.com/shots/6350078-Project-management-tool-Team

