import DiscountContext from '../../utils/context';
import {PackageSize, Provider} from '../../utils/types';
import {Shipment} from '../../interfaces/shipment.interfaces';
import MonthlyDiscountLimitHandlerTest from '../utils/discountHandlers.monthlyDiscountLimitHandler';

describe('MonthlyDiscountLimitHandler', () => {
  let handler: MonthlyDiscountLimitHandlerTest;

  beforeEach(() => {
    handler = new MonthlyDiscountLimitHandlerTest();
  });

  test('Should limit monthly discount and adjust shipment price', () => {
    const date: Date = new Date(Date.UTC(2015, 1, 1, 0, 0, 0));
    const packageSize = 'S' as PackageSize;
    const provider = 'MR' as Provider;

    const shipment1: Shipment = {
      date,
      packageSize,
      provider,
      price: 2,
      discount: 5,
    };

    const shipment2: Shipment = {
      date,
      packageSize,
      provider,
      price: 2,
      discount: 3,
    };

    const shipment3: Shipment = {
      date,
      packageSize,
      provider,
      price: 2,
      discount: 0,
    };

    const context = new DiscountContext(shipment3, [shipment1, shipment2], 5);

    handler.applyDiscountPublic(context);
    expect(context.currentDiscount).toBe(2);
  });
  test('Discount limit resets at the start of a new month', () => {
    const date: Date = new Date(Date.UTC(2015, 1, 1, 0, 0, 0));
    const newDate: Date = new Date(Date.UTC(2015, 2, 1, 0, 0, 0));
    const packageSize = 'S' as PackageSize;
    const provider = 'MR' as Provider;

    const shipment1: Shipment = {
      date,
      packageSize,
      provider,
      price: 2,
      discount: 5,
    };

    const shipment2: Shipment = {
      date,
      packageSize,
      provider,
      price: 2,
      discount: 3,
    };

    const shipment3: Shipment = {
      date,
      packageSize,
      provider,
      price: 2,
      discount: 0,
    };
    const shipment4: Shipment = {
      date: newDate,
      packageSize,
      provider,
      price: 2,
      discount: 5,
    };

    const shipment5: Shipment = {
      date: newDate,
      packageSize,
      provider,
      price: 2,
      discount: 3,
    };

    const shipment6: Shipment = {
      date: newDate,
      packageSize,
      provider,
      price: 2,
      discount: 0,
    };

    const context = new DiscountContext(
      shipment6,
      [shipment1, shipment2, shipment3, shipment4, shipment5],
      5,
    );

    handler.applyDiscountPublic(context);
    expect(context.currentDiscount).toBe(2);
  });
});
