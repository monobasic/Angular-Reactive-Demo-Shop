import { CheckoutService } from './checkout.service';
import { CheckoutComponent } from '../checkout.component';

describe('CheckoutService', () => {
  it('should initialize with active step-number 0', () => {
    const comp = new CheckoutService();

    expect(comp.activeStep).toBe(0);
  });

  it('should increment steps on nextStep', () => {
    const comp = new CheckoutService();
    spyOn(comp.stepChanged, 'emit');

    comp.nextStep();

    expect(comp.activeStep).toBe(1);
    expect(comp.stepChanged.emit).toHaveBeenCalled();
  });

  it('should decrement steps on previousStep', () => {
    const comp = new CheckoutService();
    spyOn(comp.stepChanged, 'emit');

    comp.nextStep();
    comp.nextStep();
    comp.previousStep();

    expect(comp.activeStep).toBe(1);
    expect(comp.stepChanged.emit).toHaveBeenCalled();
  });

  it('should reset steps on reset', () => {
    const comp = new CheckoutService();
    spyOn(comp.stepChanged, 'emit');

    comp.nextStep();
    comp.nextStep();
    comp.resetSteps();

    expect(comp.activeStep).toBe(0);
    expect(comp.stepChanged.emit).toHaveBeenCalled();
  });
});
