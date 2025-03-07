import LowerPriceForTypesHandler from '../../handlers/lowerPricesForTypesHandler';
import DiscountContext from '../../utils/context';

class LowerPriceForTypesHandlerTest extends LowerPriceForTypesHandler {
  public applyDiscountPublic(context: DiscountContext) {
    this.applyDiscount(context);
  }
}

export default LowerPriceForTypesHandlerTest;
