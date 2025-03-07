# Backend Homework Assignment

This hometask calculates shipment discounts for Vinted's shipping options in France, specifically focusing on the services provided by 'Mondial Relay' (MR) and 'La Poste' (LP). The design emphasizes flexibility and ease of modification to accommodate potential future requirements.

## Language and Framework Choice

The hometask is implemented in Node.js using TypeScript. This choice was made because of testing. In the past I worked with Jest, and for example, in C++, I did not touch the frameworks for testing, which would have taken me some extra time.

## Technical Implementation

The project uses a Chain of Responsibility pattern to process discount rules in a specific sequence. This pattern was chosen because:
----------------------------
* The order of applying discounts matters (e.g., the monthly limit should be applied after calculating all other discounts)
* It allows for independent testing of each rule
* It provides flexibility to add, remove, or modify rules without changing the core logic

Dependency Injection is used throughout the project to:
----------------------------
* Increase testability by allowing mock dependencies
* Make components loosely coupled
* Enable easier unit testing of individual rules

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