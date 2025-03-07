import DiscountContext from '../utils/context';
import {lowerPrice} from '../utils/types';
import AbstractDiscountHandler from './abstarctDiscountHandler';
/**
 * Handler for All S shipments to match the lowest S package price among the providers.
 *
 * @remarks
 * This discount is applied when a customer ships an 'S' size package with any provider
 * ensuring the price matches the lowest available rate for 'S' size packages across all providers
 *
 * @example
 * ```typescript
 * const handler = new LowerPriceForTypesHandler();
 * handler.setNext(nextHandler)
 * ```
 */
export class LowerPriceForTypesHandler extends AbstractDiscountHandler {
  /**
   * Applies the S shipment discount if applicable.
   *
   * @param context - The discount context containing the shipment details and shipment history and current discount.
   */
  protected applyDiscount(context: DiscountContext): void {
    const {shipment} = context;
    // Only apply to 'S' size packages
    if (shipment.packageSize !== 'S') return;
    // Apply the discount if shipment price is more than a lower price for S for this provider
    if (shipment.price > lowerPrice) {
      context.currentDiscount += shipment.price - lowerPrice;
    }
  }
}
export default LowerPriceForTypesHandler;
