import DiscountContext from '../../utils/context';
import {PackageSize, Provider} from '../../utils/types';
import {Shipment} from '../../interfaces/shipment.interfaces';
import ThirdShipmentFreeHandlerTest from '../utils/discountHandlers.thirdShipmentFreeHandler';

describe('ThirdShipmentFreeHandler', () => {
  let handler: ThirdShipmentFreeHandlerTest;

  beforeEach(() => {
    handler = new ThirdShipmentFreeHandlerTest();
  });

  test('Given three shipments in the same month, all from LP and size L, the third shipment should be free', () => {
    const date: Date = new Date(Date.UTC(2015, 1, 1, 0, 0, 0));
    const packageSize = 'L' as PackageSize;
    const provider = 'LP' as Provider;
    const shipment1: Shipment = {
      date,
      packageSize,
      provider,
      price: 12,
      discount: 0.5,
    };
    const shipment2: Shipment = {
      date,
      packageSize,
      provider,
      price: 12,
      discount: 0.5,
    };
    const shipment3: Shipment = {
      date,
      packageSize,
      provider,
      price: 12,
      discount: 0.5,
    };
    const context = new DiscountContext(shipment1, [shipment2, shipment3], 0);

    handler.applyDiscountPublic(context);
    expect(context.currentDiscount).toBe(12);
  });

  test('Given three shipments in the same month, two from LP of size L and one from MR, the third shipment should not receive any discount.', () => {
    const date: Date = new Date(Date.UTC(2015, 1, 1, 0, 0, 0));
    const packageSize = 'L' as PackageSize;
    const provider = 'LP' as Provider;
    const provider1 = 'MR' as Provider;
    const shipment1: Shipment = {
      date,
      packageSize,
      provider: provider1,
      price: 12,
      discount: 0.5,
    };
    const shipment2: Shipment = {
      date,
      packageSize,
      provider,
      price: 12,
      discount: 0.5,
    };
    const shipment3: Shipment = {
      date,
      packageSize,
      provider,
      price: 12,
      discount: 0.5,
    };
    const context = new DiscountContext(shipment1, [shipment2, shipment3], 0);

    handler.applyDiscountPublic(context);
    expect(context.currentDiscount).toBe(0);
  });

  test('Should not apply discount if a free shipment was already given in the month', () => {
    const date: Date = new Date(Date.UTC(2015, 1, 1, 0, 0, 0));
    const packageSize = 'L' as PackageSize;
    const provider = 'LP' as Provider;
    const provider1 = 'MR' as Provider;
    const shipment1: Shipment = {
      date,
      packageSize,
      provider: provider1,
      price: 12,
      discount: 0.5,
    };
    const shipment2: Shipment = {
      date,
      packageSize,
      provider,
      price: 12,
      discount: 0.5,
    };
    const shipment3: Shipment = {
      date,
      packageSize,
      provider,
      price: 12,
      discount: 0.5,
    };
    const shipment4: Shipment = {
      date,
      packageSize,
      provider,
      price: 12,
      discount: 0.5,
    };
    const context = new DiscountContext(
      shipment1,
      [shipment2, shipment3, shipment4],
      0,
    );

    handler.applyDiscountPublic(context);
    expect(context.currentDiscount).toBe(0);
  });
  test('Shipments discount resets at the start of a new month', () => {
    const date: Date = new Date(Date.UTC(2015, 1, 1, 0, 0, 0));
    const newDate: Date = new Date(Date.UTC(2015, 2, 1, 0, 0, 0));
    const packageSize = 'L' as PackageSize;
    const provider = 'LP' as Provider;
    const provider1 = 'MR' as Provider;
    const shipment1: Shipment = {
      date,
      packageSize,
      provider: provider1,
      price: 12,
      discount: 0.5,
    };
    const shipment2: Shipment = {
      date,
      packageSize,
      provider,
      price: 12,
      discount: 0.5,
    };
    const shipment3: Shipment = {
      date,
      packageSize,
      provider,
      price: 12,
      discount: 0.5,
    };
    const shipment4: Shipment = {
      date: newDate,
      packageSize,
      provider,
      price: 12,
      discount: 0.5,
    };
    const shipment5: Shipment = {
      date: newDate,
      packageSize,
      provider,
      price: 12,
      discount: 0.5,
    };
    const shipment6: Shipment = {
      date: newDate,
      packageSize,
      provider,
      price: 12,
      discount: 0.5,
    };
    const context = new DiscountContext(
      shipment6,
      [shipment1, shipment2, shipment3, shipment4, shipment5],
      0,
    );

    handler.applyDiscountPublic(context);
    expect(context.currentDiscount).toBe(12);
  });
});
