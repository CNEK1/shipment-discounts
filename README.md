# Backend Homework Assignment

This hometask calculates shipment discounts for Vinted's shipping options in France, specifically focusing on the services provided by 'Mondial Relay' (MR) and 'La Poste' (LP). The design emphasizes flexibility and ease of modification to accommodate potential future requirements.

## Technical Implementation

The project uses a Chain of Responsibility pattern to process discount rules in a specific sequence. This pattern was chosen because:

* The order of applying discounts matters (e.g., the monthly limit should be applied after calculating all other discounts)
* It allows for independent testing of each rule
* It provides flexibility to add, remove, or modify rules without changing the core logic

Dependency Injection is used throughout the project to:

* Increase testability by allowing mock dependencies
* Make components loosely coupled
* Enable easier unit testing of individual rules

In the folder structure, 'handlers' contains all the different types of discount handlers as well as an abstract class for them. The 'services' folder contains the file with the main logic - the shipment service. This architecture was deliberately designed to minimize interaction with the service file, allowing for better separation of concerns and making the system more maintainable and extensible.

# Tests Description
1. S shipments should apply a discount matching the lowest S package price for MR.
2. S shipments should apply a discount matching the lowest S package price for LP.
3. Should limit monthly discount and adjust shipment price.
4. Discount limit resets at the start of a new month.
5. Given three shipments in the same month, all from LP and size L, the third shipment should be free.
6. Given three shipments in the same month, two from LP of size L and one from MR, the third shipment should not receive any discount.
7. Should not apply discount if a free shipment was already given in the month.
8. Shipments discount resets at the start of a new month.
9. Third Shipment L by LP should be free but must not exceed the monthly limit.
10. S shipments by any provider should receive a discount matching the lowest S package price.

# How to use

1. Git clone this repo
2. Run `npm install`
3. Run `npm run build`
4. Run `npm start`

# Scripts

- `npm run build`: build an application
- `npm start`: run the application
- `npm run test`: run tests for application

# Requirements

* Node v21.1.0 (I am using this version, but it should run smoothly on earlier versions of Node.js as well.) 😊
* Git