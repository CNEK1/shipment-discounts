import DiscountContext from '../utils/context';
import AbstractDiscountHandler from './discountHandler';
/**
 * Handler for enforcing a 10-euro discount limit per month..
 *
 * @remarks
 * This handler enforces a discount limit of 10 euros for each month.
 * If the total discounts for a customer exceed this limit within a given month,
 * any additional discounts will not be applied until the next month.
 * @example
 * ```typescript
 * const handler = new MonthlyDiscountLimitHandler();
 * handler.setNext(nextHandler)
 * ```
 */
class MonthlyDiscountLimitHandler extends AbstractDiscountHandler {
  private readonly MONTHLY_LIMIT = 10;
  /**
   * Applies a discount limit of 10 euros for each month.
   *
   * @param context - The discount context containing the shipment details, shipment history, and current discounts.
   */
  protected applyDiscount(context: DiscountContext): void {
    const {shipment, shipments} = context;
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
    // Calculate the total discounts used in the current month
    const usedDiscount = shipments
      .filter(s => s.date >= currentMonth && s.date < nextMonth)
      .reduce((sum, s) => sum + s.discount, 0);
    // Determine the available discount by subtracting used discounts from the monthly limit
    const availableDiscount = Math.max(0, this.MONTHLY_LIMIT - usedDiscount);
    // Set the current discount to the minimum of the available discount and the context's current discount
    context.currentDiscount = Math.min(
      availableDiscount,
      context.currentDiscount,
    );
  }
}

export default MonthlyDiscountLimitHandler;
