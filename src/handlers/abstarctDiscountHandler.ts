import DiscountContext from '../utils/context';
import {DiscountHandler} from '../interfaces/shipment.interfaces';

/**
 * Abstract base class for discount handlers.
 *
 * @remarks
 * This abstract class implements the chain of responsibility pattern for processing discounts.
 * It allows handlers to be chained together and processes discounts in sequence, delegating
 * to the next handler in the chain if necessary.
 *
 * @example
 * ```typescript
 * const handler1 = new ThirdShipmentFreeHandler();
 * const handler2 = new MonthlyDiscountLimitHandler();
 * handler1.setNext(handler2);
 * handler1.process(discountContext);
 * ```
 */
abstract class AbstractDiscountHandler implements DiscountHandler {
  private nextHandler: DiscountHandler | null = null;

  /**
   * Sets the next handler in the chain.
   *
   * @param handler - The next discount handler to be set.
   * @returns The handler that was set as the next.
   */
  public setNext(handler: DiscountHandler): DiscountHandler {
    this.nextHandler = handler;
    return handler;
  }

  /**
   * Processes the discount by applying it and delegating to the next handler if available.
   *
   * @param context - The discount context containing shipment, shipment history and current discount.
   */
  public process(context: DiscountContext): void {
    this.applyDiscount(context);
    if (this.nextHandler) {
      this.nextHandler.process(context);
    }
  }

  /**
   * Applies the discount to the given context.
   *
   * @param context - The discount context containing shipment, shipment history and current discount.
   * @protected
   * @abstract
   */
  protected abstract applyDiscount(context: DiscountContext): void;
}

export default AbstractDiscountHandler;
