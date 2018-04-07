# CAS FEE PROJEKT 2 : SPA Shop Front End Implementation
- Christian Zellweger (https://github.com/chzellweger)
- André Abt (https://github.com/monobasic)



##  Installation
### Clone repository
```
$ git clone git@github.com:monobasic/CAS-FEE-PROJEKT-2.git
```


### Install Angular-Cli globally
```
$npm install -g @angular/cli
```

### Install NPM packages
```
$cd CAS-FEE-PROJEKT-2
$npm install
```

### Run development server
```
$ng serve
```
Runs a development server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Checkout the shop
Point your browser to localhost:4200
In any case the dev build is not working, there is an already built app available on http://shop.andre-abt.com for checking out. Deeplinking for the Angular router is handled via .htaccess config.

### Run unit tests
```
$ng test
```
Executes the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests
```
$ng e2e
```
Executes the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Build app for prod
```
$ng build --prod --build-optimizer
```
This builds the app for prod environment into a /dist folder.

## Background
The initial idea for this project was to implement a SPA based shop frontend which can be coupled to existing shop backends via REST API. The performance of a SPA application would be very nice to make the shopping process for users as fluid as possible. Imagine adding items to the cart, browsing and filtering products, typeahead search, updating your favorites/wish list - all handled by the front end application.

Although this would be cool, it's most likely a bit out of scope to provide all the API mappings for different shops like Shopify, Woocommerce, PrestaShop, Magento and the likes.

So we decided to implement basic shop functionality for now and base the project target more around finding conclusions for challenges we will face during the process.

## Feature Set
### Shop functionality

#### General
- All displayed prices are handled via a PriceComponent to simplify currency display/formatting

#### Shop Front Page
- Featured Products with link to corresponding product detail page
- Features for "New Arrivals", "On Sale" and "Best Rated" Products

#### Products
- Products fetched from FireBase backend and cached for future requests
- Sorting: Products can be sorted by date created, price and name
- Products can be viewed in a grid or a list view
- Products are shown paged via a PagingService
- When logged in as a user with adminstrative rights, additional buttons are shown for product CRUD operations

### Product CRUD
- Add a new product
- Edit existing product
- Delete existing product
- Images handled with Firebase Storage

#### Rating
- Products can be rated by logged in users from 1 to 5
- User can change his previous rating
- Previous rating is reflected in the UI
- Overall rating gets calculated and displayed instantly
- Rating is updated in a reactive manner, even for cached products

#### Cart
- Products can be added from the list/grid View or product detail view
- Cart is handled via a CartService
- Adding the same product multiple times, increases the amount in cart
- Cart has a dedicated cart page and is visible as a dropdown widget as well
- Quantity of each cart item can be adjusted via cart page
- Cart can be cleared at once
- Single products can be removed from cart
- Subtotal and Totals will be calculated on the fly
- Link to Checkout is available from both carts

#### Checkout
- Prefill fields, if user is already logged in
- Enter Address, Shipping Method and Payment Data with Validation
- Show review of the order before final submit
- When submitting a order, OrderService creates a new Order linked to the user
- Anonymous Orders are possible too, in that case OrderService creates a new anonymous order
- Order summary is shown in the sidebar during the checkout process

#### Authentication
- Checkout: As registered user / guest
- Sign up: Create user account
- Log in: General login or during checkout
- Role based authentication

#### Account
- Create new shop user accounts
- Login with existing user account
- User Profile, Email, Password, Firstname, Lastname are updateable via account page
- Order history is visible to logged in users
- Role base authentication via Firebase, roles can be assigned to users like isAdmin

#### Orders
- Checkout process generates Order for registered user or guest
- Order / Confirmation Email for Shop/User/Guest
- Orders can be viewed by logged in user

### Security
- FireBase Security Rules for Shop User / Admin

## Custom Express/MongoDB Backend
Implementation started with a custom MEAN-architecture.
We switched to serverless with Firebase due to several reasons:
- Backend not in the scope of this front-end-project and the CAS-FEE-task.
- Firebase provides complete functionality set
- Failure of knowledge-transfer between developers

The unfinished project can be found under: [CAS-FEE-PROJEKT-2-CUSTOM-MEAN-BACKEND](https://github.com/chzellweger/CAS-FEE-PROJEKT-2-CUSTOM-MEAN-BACKEND)

## Special Mentions
- Off Canvas Navigation is handled via Service, several CSS classes needs to be applied to different components

## Possible future features and updates
- SEO optimization, was out of scope as it invloves server side rendering with Angular Universal
- Product categories
- Product stock amounts
- Make Featured Products for the slider editable via UI
- Make banner on start page editable via UI
- Save cart for logged in user
- Login option during checkout
- Search with Typeahead functionality
- Better Product Service Cache "Reactivity"
- Customer Address or multiple delivery addresses could be handled via account profile page
- Attach real payment gateways
- Multilanguage functionality
- Order Detail View for logged in users via account/orders
- Admin users could edit other users roles via UI, instead of Firebase (User CRUD)
- Add password recovery functionality for lost user passwords
- Better solution for responsive tables
- Lazy load some modules that are not needed on inital page load
- Separate routes to modules
- Multiple Product Images CRUD
- Think about implementing a state management
- Social sharing functionality
- Authenticate with Google, Facebook and other OAUTH services
- i18n

## Expected challenges
- Theme / third party ui component integration: Very common in the daily web agency business: Using a third party Template/Theme as a starting point. The challenge here is: Themes are commonly based around a styling framework like Bootstrap, HTML/CSS and user interface logic code in jQuery. As it seems, some of the well known UI components like Isotope grid, imagesLoaded, Carsousels and so on are not ported to Angular5 yet.
- SEO - still a big topic arouns SPAs as it seems. For a shop application, indexing and deep linking to shop product details are most probably the most important thing. Also xml file generation for google merchant could be a issue
- Angular5 ui performance: Is the performance of Angualr really as shiny as "they tell", Reacts UI performance should be much better "they say" so we will find out, worst case we could reroute to a React application and see if it performs better

## Expected outcome and conclusions
- Is a shop front end implementation with a SPA reasonable?
- Is the SEO thing something, that can be handled within reasonable additional expenditure?
- Is Angular5 suited for fast, high end visual front ends or is React (Or another SPA framework) needed?
- Are there replacements for well known jQuery front end ui components in Angular or do we need to relinquish for some parts?


## Final verdict
- Theming/jQuery
- Third Party Component availability
- Angular & RxJS steep learning curve
- UI Performance - yay!
- Firebase reactivity - cool!
- Tests run slow, Jest would be a good alternative (See Branch -> ...)
- Testing: Mocking AngularFire/Firebase stuff is pain in the ass
