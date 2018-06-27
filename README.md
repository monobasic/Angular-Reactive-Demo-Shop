# CAS FEE PROJEKT 2 : SPA Shop Front End Implementation

- Christian Zellweger (https://github.com/chzellweger)
- André Abt (https://github.com/monobasic)

Check out this project online at [http://shop.andre-abt.com](http://shop.andre-abt.com)
Note: The pixelated product images are there because of image licensing reasons.

## Installation

### Clone repository

```bash
git clone git@github.com:monobasic/Angular-6-Demo-Shop.git
```

### Install Angular-Cli globally

```bash
npm install -g @angular/cli
```

### Install NPM packages

```bash
cd Angular-6-Demo-Shop
npm install
```

### Run development server

```bash
ng serve
```

Runs a webpack-development server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Checkout the shop

Point your browser to localhost:4200. In any case the dev build is not working, there is an already built app available on http://shop.andre-abt.com for checking out. Deeplinking for the Angular router is handled via .htaccess config.

### Run unit tests

```bash
ng test
```

Executes the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

```bash
ng e2e
```

Executes the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Build app for prod

```bash
ng build --prod --build-optimizer
```

This builds the app for prod environment into a /dist folder. Uses the Angular-AOT-mode to precompile the the app. This reduces the app-footstep (compiler is around 1/3 of bundle).

## Background

The initial idea for this project was to implement a SPA based shop frontend which can be coupled to existing shop backends via REST API. The performance of a SPA application would be very nice to make the shopping process for users as fluid as possible. Imagine adding items to the cart, browsing and filtering products, typeahead search, updating your favorites/wish list - all handled by the front end application.

Although this would have been cool, it's most likely a bit out of scope to provide all the API mappings for different shops like Shopify, Woocommerce, PrestaShop, Magento and the likes.

So we decided to implement basic shop functionality for now and base the project target more around finding conclusions for challenges we will face during the process.

## Feature Set

### Shop functionality

#### Shop Front Page

- Featured Products with link to corresponding product detail page
- Features for «New Arrivals», «On Sale» and «Best Rated» Products

#### Products

- Products fetched from FireBase backend and cached for future requests
- Sorting: Products can be sorted by date created, price and name
- Products can be viewed in a grid or a list view
- Products are shown paged via a PagingService
- When logged in as a user with adminstrative rights, additional buttons are shown for product CRUD operations

#### Product CRUD

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

#### General

- All displayed prices are handled via a PriceComponent to simplify currency display/formatting
- Search with Typeahead functionality (Unfortunately, FireBase has very limited  functionality for full text search. For a real application, local search would be the better option)

### Custom Express/MongoDB Backend

Implementation started with a custom MEAN-architecture, which used a mLab-database.
We switched to «serverless» with Firebase due to several reasons:

- Backend not in the scope of this front-end-project and the CAS-FEE-task.
- Firebase provides complete functionality set
- Failure of knowledge-transfer between developers
- mLab blocked in the HSR-network

The unfinished project can be found under: [CAS-FEE-PROJEKT-2-CUSTOM-MEAN-BACKEND](https://github.com/chzellweger/CAS-FEE-PROJEKT-2-CUSTOM-MEAN-BACKEND)

### Special Mentions

- All product data changes are propagated in real time to all clients without reloading, via Firebase Real Time Data Base and reactive programming with RxJs (try rating a product or update a property in the CRUD-module)
- Off Canvas Navigation is handled via Service, several CSS classes needs to be applied to different components

## UX-Test

UX-Tests are documented in [ux-testing/ux-test.md](./ux-testing/ux-test.md).

## Possible future features and updates

- Speed up initial page load with server rendered start page and/or lazy load modules
- SEO, was out of scope as it invloves server side rendering with Angular Universal
- Product categories
- Product stock amounts
- UI for editing Featured Products-slider
- UI for editing banner on start page
- UI for editing users/user-roles (admin only) instead of Firebase-only (i. e. User CRUD)
- Save cart for logged in user
- Login option during checkout
- Customer Address or multiple delivery addresses could be handled via account profile page
- Attach real payment gateways
- Multilanguage functionality (i18n)
- Order Detail View for logged in users via account/orders
- Add password recovery functionality for lost user passwords
- Better solution for responsive tables
- Lazy load some modules that are not needed on inital page load
- Separate routes to modules
- Multiple Product Images CRUD
- Implementing a state management (i. e. ngrx)
- Social sharing functionality
- Authenticate with Google, Facebook and other OAUTH services

## Final verdict

### General outcome

Angular is great as a foundation for bigger web projects and multiple developers involved. The framework has a very defined structure and this helps, keeping things un-messy. However, third party components are rare right now, so even for basic UI stuff like carousels one need to spend a lot of time, to re-create well known jquery moduls functionalites in "the Angular way".

### Theming/jQuery

Theme / third party ui component integration – as common as it is in the daily web agency business – is a challenge. Many themes are based around a styling framework like Bootstrap, HTML/CSS and user interface logic code in jQuery. As it seems some of the well known UI components like Isotope grid, imagesLoaded, Carsoussels and so on are not ported to Angular5 yet.

### Learning curve

Angular & RxJS both have a steep learning curve.

### SEO

Without using Angular Universal and server side rendering, its not possible to provide meta page title and description. This makes SEO - still a big topic around SPAs – harder. For a shop application, indexing and deep linking to shop product details are most probably the most important thing. Also xml file generation for google merchant could be a issue.

### UI performance

UI performance and User experience is great for a shop on SPA basis. Instant feedback for user interactions, like rating of products via Firebase, is very cool too.

### Firebase Backend

Firebase provides a whole lot of functionalities which make things like user-management a lot easier. However the security rules configuration needs a lot of attention. In general there is a lot of potential for security holes.

### Testing

Karma tests run quite slow, this could be a issue if you have a lot of tests when the app is growing. Jest, the testing framework of Facebook/React would be a good alternative. We did some research and it was quite easy to integrate into an Angular application. Also worth mentioning: we found our way around, but if you need to mock AngularFire and/or Firebase API stuff, this could be major pain in the ass ;)

## Extra extra

If you want to see how this project came to life according to its git-repo, checkout this awesome and funny video made with [Gource](http://gource.io) ([how to here](https://github.com/acaudwell/Gource/wiki/Videos)):

[<img width="906" alt="bildschirmfoto 2018-04-22 um 16 38 46" src="https://user-images.githubusercontent.com/16070364/39096101-ac275aec-464b-11e8-884d-c623920a43a6.png">](https://drive.google.com/file/d/1XE7w15OPPKVKA1PFKpfTc04G_kNFEABo/view?usp=sharing)
