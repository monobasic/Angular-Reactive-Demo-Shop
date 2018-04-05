import { CheckoutService } from './checkout.service';
import { Customer } from '../../models/customer.model';
import { Product } from '../../models/product.model';
import { CartItem } from '../../models/cart-item.model';

describe('CheckoutService', () => {
  it('should initialize with active step-number 0', () => {
    const comp = new CheckoutService();

    expect(comp.activeStep).toBe(0);
  });

  describe('should handle steps and', () => {
    let comp;
    beforeEach(() => {
      comp = new CheckoutService();
      spyOn(comp.stepChanged, 'emit');
    });

    it('should increment steps on nextStep', () => {
      comp.nextStep();

      expect(comp.activeStep).toBe(1);
      expect(comp.stepChanged.emit).toHaveBeenCalled();
    });

    it('should decrement steps on previousStep', () => {
      comp.nextStep();
      comp.nextStep();
      comp.previousStep();

      expect(comp.activeStep).toBe(1);
      expect(comp.stepChanged.emit).toHaveBeenCalled();
    });

    it('should reset steps on reset', () => {
      comp.nextStep();
      comp.nextStep();
      comp.resetSteps();

      expect(comp.activeStep).toBe(0);
      expect(comp.stepChanged.emit).toHaveBeenCalled();
    });
  });

  describe('should handle additions and', () => {
    let comp;
    beforeEach(() => {
      comp = new CheckoutService();
      spyOn(comp.orderInProgressChanged, 'emit');
    });

    it('should handle a shipping method', () => {
      comp.setPaymentMethod('pay-pal');

      expect(comp.getOrderInProgress().paymentMethod).toBe('pay-pal');
      expect(comp.orderInProgressChanged.emit).toHaveBeenCalled();
    });

    it('should handle a payment method', () => {
      comp.setShippingMethod('air freight');

      expect(comp.getOrderInProgress().shippingMethod).toBe('air freight');
      expect(comp.orderInProgressChanged.emit).toHaveBeenCalled();
    });

    it('should handle a customer', () => {
      const testCustomer = new Customer(
        'Hans',
        'Meier',
        '',
        '',
        8000,
        '',
        '',
        '',
        ''
      );

      comp.setCustomer(testCustomer);

      expect(comp.getOrderInProgress().customer).toEqual(
        new Customer('Hans', 'Meier', '', '', 8000, '', '', '', '')
      );
      expect(comp.orderInProgressChanged.emit).toHaveBeenCalled();
    });

    it('should handle a cart item', () => {
      const testProduct = new Product();
      const testCartItem = new CartItem(testProduct, 10);

      comp.setOrderItems([testCartItem]);

      expect(comp.getOrderInProgress().items).toEqual([
        new CartItem(testProduct, 10)
      ]);
      expect(comp.orderInProgressChanged.emit).toHaveBeenCalled();
    });
  });
});
