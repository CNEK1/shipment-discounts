import ShipmentService from './services/shipmentService';
import LowerPriceForTypesHandler from './handlers/lowerPricesForTypesHandler';
import MonthlyDiscountLimitHandler from './handlers/monthlyDiscountLimitHandler';
import ThirdShipmentFreeHandler from './handlers/thirdShipmentFreeHandler';
import {processShippingDiscounts} from './utils/fileProcessor';

/**
 * Main entry point for processing shipment discounts.
 *
 * @remarks
 * This function initializes the discount handlers, sets up the chain of responsibility,
 * creates a shipment service, and processes shipments from an input file.
 *
 * The discount handlers are linked in the following order:
 * - Lower price handler
 * - Third shipment free handler
 * - Monthly discount limit handler
 *
 * After setting up the handlers, the shipment service processes the input file and outputs the results.
 *
 * @example
 * ```typescript
 * // Run the main function to process shipments
 * main();
 * ```
 */
const main = (): void => {
  const thirdShipmentHandler = new ThirdShipmentFreeHandler();
  const monthlyLimitHandler = new MonthlyDiscountLimitHandler();
  const lowerPriceHandler = new LowerPriceForTypesHandler();

  lowerPriceHandler.setNext(thirdShipmentHandler).setNext(monthlyLimitHandler);

  const shipmentService = new ShipmentService(lowerPriceHandler);

  const inputFile = 'src/data/input.txt';
  const results = processShippingDiscounts(inputFile, shipmentService);

  console.log(results.join('\n'));
};

main();
