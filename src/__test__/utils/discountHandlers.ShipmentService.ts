import {DiscountHandler} from '../../interfaces/shipment.interfaces';
import ShipmentService from '../../services/shipmentService';

class ShipmentServiceTest extends ShipmentService {
  public getDiscountChainForTesting(): DiscountHandler {
    return this.getDiscountChain();
  }
}

export default ShipmentServiceTest;
