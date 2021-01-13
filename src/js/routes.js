
import HomePage from '../pages/home.jsx';
import AboutPage from '../pages/about.jsx';
import FormPage from '../pages/form.jsx';
import CatalogPage from '../pages/catalog.jsx';
import ProductPage from '../pages/product.jsx';
import CartPage from '../pages/cart.jsx';
import SettingsPage from '../pages/settings.jsx';
import LoginPage from '../pages/login.jsx';
import CheckoutAddressPage from '../pages/checkoutaddress.jsx';
import ShippingPage from '../pages/shipping.jsx';

import DynamicRoutePage from '../pages/dynamic-route.jsx';
import RequestAndLoad from '../pages/request-and-load.jsx';
import NotFoundPage from '../pages/404.jsx';


import HBApi from '../components/api';

var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/form/',
    component: FormPage,
  },
  {
    path: '/cart/',
    component: CartPage,
  },
  {
    path: '/login/',
    component: LoginPage,
    
  },
  {
    path: '/checkoutaddress/',
    component: CheckoutAddressPage,
    
  },
  {
    path: '/shipping/',
    component: ShippingPage,
    
  },
  {
    path: '/catalog/:id/:name',
   
    async:async function ({ router, to, resolve }) {
      // App instance
      var app = router.app;
      var products=[];
      var lastindex=0;
      var total_product=0;
      // Show Preloader
      app.preloader.show();
        var Api= new HBApi();
      // User ID from request
      var categoryid = to.params.id;
      var categoryname = to.params.name;
      
      
      
      
      
      var currentFetchTime=new Date().getTime();
      var lastdata=localStorage.getItem('lastdataCat1')?localStorage.getItem('lastdataCat1'):0; 
     
      
      if ( ((currentFetchTime - lastdata) < 1000*3600) && categoryid==1 ) {
          
          resolve(
              {
                component: CatalogPage,
              },
              {
                props: {
                  categoryid: categoryid,
                  categoryname:categoryname,
                  products:JSON.parse(localStorage.getItem('products')),
                  lastindex:JSON.parse(localStorage.getItem('lastindex')),
                  total_product:JSON.parse(localStorage.getItem('total_product'))
                }
              }
            );
      }
      else{
          var result= await Api.Get('catalogs/category?categoryid='+categoryid+'&lastindex=0');
          if(result.success){
              products=result.data.products;
              lastindex=result.data.lastindex;
              total_product=result.data.total_product;
              
              if(categoryid==1){
                  
                 localStorage.setItem('products',JSON.stringify(result.data.products)); 
                 localStorage.setItem('lastindex',result.data.lastindex); 
                 localStorage.setItem('total_product',result.data.total_product); 
                 localStorage.setItem('lastdataCat1',new Date().getTime());
              }
                
              resolve(
                  {
                    component: CatalogPage,
                  },
                  {
                    props: {
                      categoryid: categoryid,
                      categoryname:categoryname,
                      products:products,
                      lastindex:lastindex,
                      total_product:total_product
                    }
                  }
                );
          }
          else{
              
              resolve(
                  {
                    component: CatalogPage,
                  },
                  {
                    props: {
                      categoryid: categoryid,
                      categoryname:categoryname,
                      products:products,
                      lastindex:lastindex,
                      total_product:total_product
                    }
                  }
                );
          }
      }
      app.preloader.hide();
    },
  },
  {
    path: '/product/:id/',
    async:async function ({ router, to, resolve }) {
      // App instance
      var app = router.app;
      var product;
      var productHelper;
     
      // Show Preloader
      app.preloader.show();
        var Api= new HBApi();
      // User ID from request
      var productid = to.params.id;
      
       var result= await Api.Get('catalogs/product?productid='+productid);
      
      if(result.success){
          product=result.data.product;
          productHelper=result.data.productHelper;
          

          resolve(
              {
                component: ProductPage,
              },
              {
                props: {
                  
                  product:product,
                  productHelper:productHelper
                  
                }
              }
            );
      }
      else{
          
          resolve(
              {
                component: ProductPage,
              },
              {
                props: {
                  
                  product:product,
                  productHelper:productHelper
                  
                }
              }
            );
      }
      app.preloader.hide();
    },
  },
  {
    path: '/settings/',
    component: SettingsPage,
  },

  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function ({ router, to, resolve }) {
      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = to.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            component: RequestAndLoad,
          },
          {
            props: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
