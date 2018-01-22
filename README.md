# CAS FEE PROJEKT 2 : SPA Shop Front End Implementation
Christian Zellweger (https://github.com/chzellweger)
André Abt (https://github.com/monobasic)

## Background
The initial idea for this project was to implement a SPA based shop frontend which can be coupled to existing shop backends via REST API. The performance of a SPA application would be very nice to make the shopping process for users as fluid as possible. Imagine adding items to the cart, browsing and filtering products, typeahead search, updating your favorites/wish list - all handled by the front end application. 

Although this would be cool, it's most likely a bit out of scope to provide all the API mappings for different shops like Shopify, Woocommerce, PrestaShop, Magento and the likes.

So we decided to implement basic shop functionality for now and base the project target more around finding conclusions for challenges we will face during the process.

## Expected challenges
- Theme / third party ui component integration: Very common in the daily web agency business: Using a third party Template/Theme as a starting point. The challenge here is: Themes are commonly based around a styling framework like Bootstrap, HTML/CSS and user interface logic code in jQuery. As it seems, some of the well known UI components like Isotope grid, imagesLoaded, Carsousels and so on are not ported to Angular5 yet.
- SEO - still a big topic arouns SPAs as it seems. For a shop application, indexing and deep linking to shop product details are most probably the most important thing. Also xml file generation for google merchant could be a issue
- Angular5 ui performance: Is the performance of Angualr really as shiny as "they tell", Reacts UI performance should be much better "they say" so we will find out, worst case we could reroute to a React application and see if it performs better

## Expected outcome and conclusions
- Is a shop front end implementation with a SPA reasonable?
- Is the SEO thing something, that can be handled within reasonable additional expenditure?
- Is Angular5 suited for fast, high end visual front ends or is React (Or another SPA framework) needed?
- Are there replacements for well known jQuery front end ui components in Angular or do we need to relinquish for some parts?

## Basic Feature Set
### Shop functionality
- Products served from backend via REST API
- Products List, Product Detail View
- Add to Cart functionality, View Cart, Edit Cart
- Search functionality with typeahead

### Authentication
- Checkout: As registered user / guest
- Sign up: Create user account
- Log in: General login or during checkout

### Orders
- Checkout process generates Order for registered user or guest
- Order / Confirmation Email for Shop/User/Guest
- Orders can be viewed by logged in user

### Payment
- Via paypal, invoice, pre-pay

### Security
- HTTPS







--------------------------------------------------------------------

# Shop

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Development with Express-Server as backend

Run `npm start` to spin up ng-server at port 4200 and an express-driven backend at 3000. Requests to /api will be redirected to the server (as defined in proxy.config.json)

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
