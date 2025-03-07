import DiscountContext from '../utils/context';
import {PackageSize, Provider} from '../utils/types';

/**
 * Represents a shipment with pricing and discount details.
 */
export interface Shipment {
  /** The date of the shipment. */
  date: Date;
  /** The size category of the package. */
  packageSize: PackageSize;
  /** The provider handling the shipment. */
  provider: Provider;
  /** The base price of the shipment. */
  price: number;
  /** The discount applied to the shipment. */
  discount: number;
}

/**
 * Represents a processed shipment, including the original input and processing details.
 */
export interface ProcessedShipment {
  /** The original input line as a string. */
  original: string;
  /** The parsed shipment data or null if parsing failed. */
  shipment: Shipment | null;
  /** Indicates if the shipment was ignored due to invalid data. */
  isIgnored: boolean;
}

/**
 * Interface for discount handlers in the chain of responsibility pattern.
 */
export interface DiscountHandler {
  /**
   * Sets the next discount handler in the chain.
   * @param handler - The next handler to process the shipment.
   * @returns The next discount handler.
   */
  setNext(handler: DiscountHandler): DiscountHandler;

  /**
   * Processes a shipment's discount using the given context.
   * @param context - The discount context containing shipment details.
   */
  process(context: DiscountContext): void;
}
