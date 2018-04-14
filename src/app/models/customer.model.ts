export class Customer {
  constructor(
    public firstname: string = '',
    public lastname: string = '',
    public address1: string = '',
    public address2: string = '',
    public zip: number = null,
    public city: string = '',
    public email: string = '',
    public phone: string = '',
    public company: string = '',
    public country: string = ''
  ) {}
}
