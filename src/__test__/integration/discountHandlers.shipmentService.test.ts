import DiscountContext from '../../utils/context';
import {PackageSize, Provider} from '../../utils/types';
import {Shipment} from '../../interfaces/shipment.interfaces';
import MonthlyDiscountLimitHandler from '../../handlers/monthlyDiscountLimitHandler';
import ThirdShipmentFreeHandler from '../../handlers/thirdShipmentFreeHandler';
import ShipmentServiceTest from '../utils/discountHandlers.ShipmentService';
import LowerPriceForTypesHandler from '../../handlers/lowerPricesForTypesHandler';

describe('Shipment Service', () => {
  const thirdShipmentHandler = new ThirdShipmentFreeHandler();
  const monthlyLimitHandler = new MonthlyDiscountLimitHandler();
  const lowerPriceHandler = new LowerPriceForTypesHandler();

  test('Third Shipment L by LP should be free but must not exceed the monthly limit', () => {
    const date: Date = new Date(Date.UTC(2015, 1, 1, 0, 0, 0));
    const packageSize = 'L' as PackageSize;
    const provider = 'LP' as Provider;
    const shipment1: Shipment = {
      date,
      packageSize,
      provider,
      price: 2,
      discount: 0,
    };
    const shipment2: Shipment = {
      date,
      packageSize,
      provider,
      price: 2,
      discount: 0,
    };
    const shipment3: Shipment = {
      date,
      packageSize,
      provider,
      price: 15,
      discount: 0,
    };
    thirdShipmentHandler.setNext(monthlyLimitHandler);

    const context = new DiscountContext(shipment3, [shipment1, shipment2], 0);
    const shipmentService = new ShipmentServiceTest(thirdShipmentHandler);
    const discountChain = shipmentService.getDiscountChainForTesting();
    discountChain.process(context);
    expect(context.currentDiscount).toBe(10);
  });
  test('S shipments by any provider should receive a discount matching the lowest S package price.', () => {
    const date: Date = new Date(Date.UTC(2015, 1, 1, 0, 0, 0));
    const packageSize = 'S' as PackageSize;
    const provider = 'LP' as Provider;
    const shipment1: Shipment = {
      date,
      packageSize,
      provider,
      price: 4,
      discount: 0,
    };
    const shipment2: Shipment = {
      date,
      packageSize,
      provider,
      price: 4,
      discount: 0,
    };
    const shipment3: Shipment = {
      date,
      packageSize,
      provider,
      price: 3,
      discount: 0,
    };
    lowerPriceHandler.setNext(monthlyLimitHandler);

    const context = new DiscountContext(shipment3, [shipment1, shipment2], 0);
    const shipmentService1 = new ShipmentServiceTest(lowerPriceHandler);
    const discountChain = shipmentService1.getDiscountChainForTesting();
    discountChain.process(context);
    expect(context.currentDiscount).toBe(1.5);
  });
});
