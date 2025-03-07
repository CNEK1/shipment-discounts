/**
 * Type for possible shipment size.
 */
export type PackageSize = 'S' | 'M' | 'L';
/**
 * Type for possible shipment provider.
 */
export type Provider = 'LP' | 'MR';
/**
 * Constant table with provider prices for each size of delivery.
 */
export const PRICE_TABLE: Record<Provider, Record<PackageSize, number>> = {
  LP: {S: 1.5, M: 4.9, L: 6.9},
  MR: {S: 2.0, M: 3.0, L: 4.0},
};
/**
 * Constant to get lowest price for S size in the table PRICE_TABLE.
 */
export const lowerPrice = Math.min(
  ...Object.values(PRICE_TABLE).map(prices => prices.S),
);
