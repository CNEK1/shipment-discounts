import {Shipment} from '../interfaces/shipment.interfaces';

/**
 * Context class for managing shipment discount calculations.
 *
 * @remarks
 * This class serves as a data structure for tracking shipments and their associated discount processing.
 * It holds a single shipment, a list of shipments, and the current discount being applied.
 *
 * @example
 * ```typescript
 * const shipment: Shipment = { date, packageSize, provider, price: basePrice, discount: 0 };
 * const allShipments = [anotherShipments];
 * const discountContext = new DiscountContext(shipment, allShipments, 5);
 * console.log(discountContext.currentDiscount); // Output: 5
 * ```
 */
class DiscountContext {
  /**
   * Creates a new Discount Context for some shipment.
   *
   * @param shipment - shipment
   * @param shipments - history of shipments
   * @param currentDiscount - discount for this shipment
   */
  constructor(
    public readonly shipment: Shipment,
    public readonly shipments: Shipment[],
    public currentDiscount: number = 0,
  ) {}
}

export default DiscountContext;
