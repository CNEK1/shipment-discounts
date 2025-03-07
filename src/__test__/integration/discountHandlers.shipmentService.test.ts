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
  // test('Test a mix of L and S shipments to see if the discount cap prevents full discount application', () => {
  //   const date: Date = new Date(Date.UTC(2015, 1, 1, 0, 0, 0));
  //   const shipment1: Shipment = {
  //     date,
  //     packageSize: 'L' as PackageSize,
  //     provider: 'LP' as Provider,
  //     price: 5,
  //     discount: 0,
  //   };
  //   const shipment2: Shipment = {
  //     date,
  //     packageSize: 'L' as PackageSize,
  //     provider: 'LP' as Provider,
  //     price: 5,
  //     discount: 0,
  //   };

  //   const shipmentS: Shipment = {
  //     date,
  //     packageSize: 'S' as PackageSize,
  //     provider: 'MR' as Provider,
  //     price: 4,
  //     discount: 0,
  //   };

  //   lowerPriceHandler.setNext(monthlyLimitHandler);
  //   const contextS = new DiscountContext(shipmentS, [shipment1, shipment2], 0);
  //   const shipmentServiceS = new ShipmentServiceTest(lowerPriceHandler);
  //   const discountChainS = shipmentServiceS.getDiscountChainForTesting();
  //   discountChainS.process(contextS);

  //   const sDiscount = contextS.currentDiscount;
  //   expect(sDiscount).toBe(2.5);

  //   const shipment3: Shipment = {
  //     date,
  //     packageSize: 'L' as PackageSize,
  //     provider: 'LP' as Provider,
  //     price: 15,
  //     discount: 0,
  //   };

  //   thirdShipmentHandler.setNext(monthlyLimitHandler);
  //   const context = new DiscountContext(
  //     shipment3,
  //     [shipment1, shipment2, shipmentS],
  //     sDiscount,
  //   );
  //   const shipmentService = new ShipmentServiceTest(thirdShipmentHandler);
  //   const discountChain = shipmentService.getDiscountChainForTesting();
  //   discountChain.process(context);

  //   expect(context.currentDiscount).toBe(10);
  //   expect(context.shipment.discount).toBe(10 - sDiscount);
  // });
});
