import DiscountContext from '../utils/context';
import {
  DiscountHandler,
  Shipment,
  ProcessedShipment,
} from '../interfaces/shipment.interfaces';
import {PackageSize, Provider, PRICE_TABLE} from '../utils/types';

/**
 * Service for processing shipments with automated discount application.
 *
 * @remarks
 * This class is the core component of the discount calculation system.
 * It handles parsing input lines, validating shipment data, applying
 * discount rules through a chain of handlers, and formatting output.
 *
 * @example
 * ```typescript
 * const discountChain = new SomeDiscountHandler();
 * const shipmentService = new ShipmentService(discountChain);
 * const results = shipmentService.processFile(fileWithData);
 * ```
 */
class ShipmentService {
  /** Chain of discount handlers for processing shipment discounts */
  private discountChain: DiscountHandler;

  /** Collection of processed shipments for tracking order history */
  private shipments: Shipment[] = [];

  /**
   * Creates a new shipment service with a discount processing chain.
   *
   * @param discountChain - The chain of discount handlers to process shipments
   */
  constructor(discountChain: DiscountHandler) {
    this.discountChain = discountChain;
  }

  /**
   * Processes a multi-line file content containing shipment information.
   *
   * @remarks
   * Each line in the file should contain a date, package size, and provider,
   * separated by whitespace (e.g., "2023-01-01 S LP").
   *
   * @param fileContent - String content of the file to process
   * @returns Array of formatted result strings, one for each input line
   *
   * @example
   * ```typescript
   * const results = shipmentService.processFile("2023-01-01 S LP\n2023-01-02 M MR");
   * // Returns: ["2023-01-01 S LP 1.50 -", "2023-01-02 M MR 4.90 -"]
   * ```
   */
  public processFile(fileContent: string): string[] {
    const lines = fileContent.split('\n');
    const results: string[] = [];

    for (const line of lines) {
      if (!line.trim()) continue;

      const result = this.processLine(line);

      if (result.isIgnored) {
        results.push(`${line.trim()} Ignored`);
      } else if (result.shipment) {
        const {date, packageSize, provider, price, discount} = result.shipment;
        const dateStr = this.formatDate(date);
        const discountStr = discount > 0 ? discount.toFixed(2) : '-';

        results.push(
          `${dateStr} ${packageSize} ${provider} ${price.toFixed(2)} ${discountStr}`,
        );
      }
    }

    return results;
  }

  /**
   * Gets the discount chain handler used by this service.
   *
   * @returns The discount handler chain (Used only for tesing!!!)
   * @protected
   */
  protected getDiscountChain(): DiscountHandler {
    return this.discountChain;
  }

  /**
   * Processes a single line of shipment information.
   *
   * @remarks
   * Parses the input line, validates its components, creates a shipment object,
   * applies dicount proccess via the discount chain, and records the processed shipment.
   *
   * @param line - A single line of text with shipment information
   * @returns ProcessedShipment object containing the processing result
   *
   * @private
   */
  private processLine(line: string): ProcessedShipment {
    const parts = line.trim().split(/\s+/);

    if (parts.length !== 3) {
      return {original: line, shipment: null, isIgnored: true};
    }

    const [dateStr, packageSizeStr, providerStr] = parts;

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return {original: line, shipment: null, isIgnored: true};
    }

    if (
      !this.isValidPackageSize(packageSizeStr) ||
      !this.isValidProvider(providerStr)
    ) {
      return {original: line, shipment: null, isIgnored: true};
    }

    const packageSize = packageSizeStr as PackageSize;
    const provider = providerStr as Provider;

    const basePrice = PRICE_TABLE[provider][packageSize];

    const shipment: Shipment = {
      date,
      packageSize,
      provider,
      price: basePrice,
      discount: 0,
    };
    const context = new DiscountContext(shipment, this.shipments);

    this.discountChain.process(context);

    shipment.discount = context.currentDiscount;
    shipment.price -= context.currentDiscount;

    this.shipments.push(shipment);

    return {original: line, shipment, isIgnored: false};
  }

  /**
   * Validates if the provided package size string is valid.
   *
   * @param size - The package size string to validate
   * @returns True if the size is valid (S, M, or L), false otherwise
   *
   * @private
   */
  private isValidPackageSize(size: string): boolean {
    return ['S', 'M', 'L'].includes(size);
  }

  /**
   * Validates if the provided provider string is valid.
   *
   * @param provider - The provider string to validate
   * @returns True if the provider is valid (LP or MR), false otherwise
   *
   * @private
   */
  private isValidProvider(provider: string): boolean {
    return ['LP', 'MR'].includes(provider);
  }

  /**
   * Formats a Date object to YYYY-MM-DD string format.
   *
   * @param date - The date to format
   * @returns Formatted date string
   *
   * @private
   */
  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}

export default ShipmentService;
