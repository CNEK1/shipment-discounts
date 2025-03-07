import MonthlyDiscountLimitHandler from '../../handlers/monthlyDiscountLimitHandler';
import DiscountContext from '../../utils/context';

class MonthlyDiscountLimitHandlerTest extends MonthlyDiscountLimitHandler {
  public applyDiscountPublic(context: DiscountContext) {
    this.applyDiscount(context);
  }
}

export default MonthlyDiscountLimitHandlerTest;
