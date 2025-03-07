import ThirdShipmentFreeHandler from '../../handlers/thirdShipmentFreeHandler';
import DiscountContext from '../../utils/context';

class ThirdShipmentFreeHandlerTest extends ThirdShipmentFreeHandler {
  public applyDiscountPublic(context: DiscountContext) {
    this.applyDiscount(context);
  }
}

export default ThirdShipmentFreeHandlerTest;
