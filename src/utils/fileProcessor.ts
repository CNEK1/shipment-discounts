import * as fs from 'fs';
import ShipmentService from '../services/shipmentService';

/**
 * Processes shipping discounts by reading shipment data from a file.
 *
 * @remarks
 * This function reads the input file, passes its content to the shipment service for processing,
 * and returns the processed shipment results. If an error occurs, it logs the error and returns an error message.
 *
 * @param inputFile - The path to the input file containing shipment data.
 * @param shipmentService - An instance of ShipmentService used to process the file data.
 * @returns An array of processed shipment results or an error message.
 *
 * @example
 * ```typescript
 * const shipmentService = new ShipmentService();
 * const results = processShippingDiscounts('shipments.txt', shipmentService);
 * console.log(results);
 * ```
 */
export const processShippingDiscounts = (
  inputFile: string,
  shipmentService: ShipmentService,
): string[] => {
  try {
    const fileContent = fs.readFileSync(inputFile, 'utf8');
    const results = shipmentService.processFile(fileContent);
    return results;
  } catch (error) {
    console.error('Error processing file:', error);
    return [`Error processing file: ${error}`];
  }
};
