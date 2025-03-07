import DiscountContext from '../utils/context';
import {PRICE_TABLE} from '../utils/types';
import AbstractDiscountHandler from './discountHandler';

/**
 * Handler for granting a free third 'L' size shipment with the LP provider.
 *
 * @remarks
 * This discount applies when a customer ships their third 'L' size package with 'LP' provider
 * in a given month. The full price of the third qualifying shipment is deducted as a discount.
 *
 * @example
 * ```typescript
 * const handler = new ThirdShipmentFreeHandler();
 * handler.setNext(nextHandler)
 * ```
 */
export class ThirdShipmentFreeHandler extends AbstractDiscountHandler {
  /**
   * Applies the third shipment free discount if applicable.
   *
   * @param context - The discount context containing the shipment details and shipment history and current discount.
   */
  protected applyDiscount(context: DiscountContext): void {
    const {shipment, shipments} = context;

    // Only apply to 'L' size packages from 'LP' provider
    if (shipment.packageSize !== 'L' || shipment.provider !== 'LP') return;

    // Define the current and next month for filtering shipments
    const currentMonth = new Date(
      shipment.date.getFullYear(),
      shipment.date.getMonth(),
      1,
    );
    const nextMonth = new Date(
      shipment.date.getFullYear(),
      shipment.date.getMonth() + 1,
      1,
    );

    // Filter past shipments for the same provider and package size in the current month
    const monthShipments = shipments.filter(
      s =>
        s.date >= currentMonth &&
        s.date < nextMonth &&
        s.packageSize === 'L' &&
        s.provider === 'LP',
    );

    // Check if a free shipment has already been applied this month
    const hadFreeShipment = monthShipments.some(
      s => s.discount === PRICE_TABLE.LP.L,
    );

    if (hadFreeShipment) return;

    // Apply the discount if this is the third qualifying shipment
    if (monthShipments.length === 2) {
      context.currentDiscount += shipment.price;
    }
  }
}

export default ThirdShipmentFreeHandler;
