import DiscountContext from '../../utils/context';
import {PackageSize, Provider} from '../../utils/types';
import {Shipment} from '../../interfaces/shipment.interfaces';
import LowerPriceForTypesHandlerTest from '../utils/discountHandlers.lowerPricesForTypesHandler';

describe('LowerPriceForTypesHandler', () => {
  let handler: LowerPriceForTypesHandlerTest;

  beforeEach(() => {
    handler = new LowerPriceForTypesHandlerTest();
  });

  test('S shipments should apply a discount matching the lowest S package price for MR', () => {
    const date: Date = new Date(Date.UTC(2015, 1, 1, 0, 0, 0));
    const packageSize = 'S' as PackageSize;
    const provider = 'MR' as Provider;
    const shipment1: Shipment = {
      date,
      packageSize,
      provider,
      price: 2,
      discount: 0,
    };
    const context = new DiscountContext(shipment1, [], 0);
    handler.applyDiscountPublic(context);
    expect(context.currentDiscount).toBe(0.5);
  });

  test('S shipments should apply a discount matching the lowest S package price for LP', () => {
    const date: Date = new Date(Date.UTC(2015, 1, 1, 0, 0, 0));
    const packageSize = 'S' as PackageSize;
    const provider = 'LP' as Provider;
    const shipment1: Shipment = {
      date,
      packageSize,
      provider,
      price: 2,
      discount: 0,
    };
    const context = new DiscountContext(shipment1, [], 0);
    handler.applyDiscountPublic(context);
    expect(context.currentDiscount).toBe(0.5);
  });
});
