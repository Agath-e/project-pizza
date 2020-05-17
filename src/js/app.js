import {settings, select, classNames} from './settings.js';
import Product from './components/Product.js';
import Cart from './components/Cart.js';
import Booking from './components/Booking.js';

const app = {
  initBooking: function() {
    const thisApp = this;

    const bookingWidgetElem = document.querySelector(select.containerOf.booking);
    thisApp.bookingWidget = new Booking(bookingWidgetElem);

  },
  initPages: function() {
    const thisApp = this;

    thisApp.pages = Array.from(document.querySelector(select.containerOf.pages).children);
    thisApp.navLinks = Array.from(document.querySelectorAll(select.nav.links));
    thisApp.navBox = Array.from(document.querySelectorAll('.nav-box a'));

    thisApp.activatePage(thisApp.pages[0].id);

    let pagesMatchingHash = [];

    if (window.location.hash.length > 2) { 
      const idFromHash = window.location.hash.replace('#/', '');
    
      pagesMatchingHash = thisApp.pages.filter(function (page) {
        return page.id == idFromHash;   
      });

      thisApp.activatePage(pagesMatchingHash.length ? pagesMatchingHash[0].id : thisApp.pages[0].id);
    }

    //for(let page of thisApp.pages){
    //  if(page.id == idFromHash){
    //    pageMatchingHash = page.id;
    //    break;
    //  }
    //}  
    //console.log('idFromHash', idFromHash);
    //thisApp.activatePage(pageMatchingHash);

    for(let link of thisApp.navLinks){
      link.addEventListener('click', function(event){
        const clickedElement = this;
        event.preventDefault();

        /* get page id form href attribute */
        const id = clickedElement.getAttribute('href').replace('#', ''); 
        /* run thisApp.activatePage with that id */
        thisApp.activatePage(id);
       
      });
    }
    for(let link of thisApp.navBox){
      link.addEventListener('click', function(event){
        const clickedElement = this;
        event.preventDefault();

        /* get page id form href attribute */
        const id = clickedElement.getAttribute('href').replace('#', ''); 
        /* run thisApp.activatePage with that id */
        thisApp.activatePage(id);
       
      });
    } 
  },
  activatePage: function(pageId) {
    const thisApp = this;
    for (let page of thisApp.pages) {
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }
    for (let link of thisApp.navLinks) {
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute('href') == '#' + pageId
      );
    }

    /* change URL hash */
    window.location.hash = '#/' + pageId;

  },
  initCart: function() {
    const thisApp = this;
    const cartElem = document.querySelector(select.containerOf.cart);
    thisApp.cart = new Cart(cartElem);

    thisApp.productList = document.querySelector(select.containerOf.menu);

    thisApp.productList.addEventListener('add-to-cart', function(event) {
      app.cart.add(event.detail.product);
    });
  },
  initData: function() {
    const thisApp = this;

    thisApp.data = {};
    const url = settings.db.url + '/' + settings.db.product;

    fetch(url)
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(parsedResponse){
        thisApp.data.products = parsedResponse;
        app.initMenu();
      });
  },
  initMenu: function() {
    const thisApp = this;

    for (let productData in thisApp.data.products) {
      new Product(thisApp.data.products[productData].id, thisApp.data.products[productData]);
    }
  },
  init: function() {
    const thisApp = this;

    thisApp.initPages();
    thisApp.initData();
    thisApp.initCart();
    thisApp.initBooking();
  },
};

app.init();