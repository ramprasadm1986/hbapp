
import { createStore } from 'framework7/lite';
import HBApi from '../components/api';

import {Countries} from '../static/countries';
import {CountryStates} from '../static/states';

const Api= new HBApi();
const store = createStore({
  state: {
    cordovaApp:false,
    user:localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):false,
    guestUser:localStorage.getItem('guestUser')?localStorage.getItem('guestUser'):true,
    currency:"",  
    categories: [],
    homebanners:[],
    topcategories:[],
    ads:[],
    topdeals:[],
    attCategories:[],
    ShippingMethods:[],
    cartItems:localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[],
    cartCount:localStorage.getItem('cartCount')?parseInt(localStorage.getItem('cartCount'),10):0,
    cartSubTotal:localStorage.getItem('cartSubTotal')?parseFloat(localStorage.getItem('cartSubTotal')).toFixed(2):0,
    Countries:Countries,
    CountryStates:CountryStates,
    FilteredCountryStates:[],
    cartCountry:"",
    cartState:"",
    cartCity:"",
    cartZipcode:"",
    cartPhone:"",
    cartName:localStorage.getItem('cartName')?localStorage.getItem('cartName'):"",
    cartEmail:localStorage.getItem('cartEmail')?localStorage.getItem('cartEmail'):"",
    cartShippingAmount:0,
    cartShippingMethod:"",
    cartTotal:0
  },
  getters: {
    cordovaApp({ state }) {
      return state.cordovaApp;
    },
    user({ state }) {
      return state.user;
    },
    guestUser({ state }) {
      return state.guestUser;
    },
    ShippingMethods({ state }) {
      return state.ShippingMethods;
    },
    currency({ state }) {
      return state.currency;
    },
    countries({ state }) {
      return state.Countries;
    },
    countryStates({ state }) {
      return state.FilteredCountryStates;
    },
    categories({ state }) {
      return state.categories;
    },
    categoryMenu({ state }) {
      return JSON.stringify(state.categories);
    },
    topcategories({ state }) {
      return state.topcategories;
    },
    homebanners({ state }) {
      return state.homebanners;
    },
    ads({ state }) {
      return state.ads;
    },
    topdeals({ state }) {
      return state.topdeals;
    },
    attCategories({ state }) {
      return state.attCategories;
    },
    cartCount({ state }) {
      return state.cartCount;
    },
    cartItems({ state }) {
      return state.cartItems;
    },
    cartSubTotal({ state }) {
      return state.cartSubTotal;
    },
    cartCountry({ state }) {
      return state.cartCountry;
    },
    cartState({ state }) {
      return state.cartState;
    },
    cartCity({ state }) {
      return state.cartCity;
    },
    cartZipcode({ state }) {
      return state.cartZipcode;
    },
    cartPhone({ state }) {
      return state.cartPhone;
    },
    cartName({ state }) {
      return state.cartName;
    },
    cartEmail({ state }) {
      return state.cartEmail;
    },
    cartShippingAmount({ state }) {
      return state.cartShippingAmount;
    },
    cartShippingMethod({ state }) {
      return state.cartShippingMethod;
    },
    cartTotal({ state }) {
      return state.cartTotal;
    },
    

  },
  actions: {
    resetCatalog({state}){
        state.FilteredCountryStates=[];
        state.FilteredCountryStates = [...state.FilteredCountryStates];
        state.cartCountry="";
        state.cartState="";
        state.cartCity="";
        state.cartZipcode="";
        state.cartPhone="";
        state.cartName=localStorage.getItem('cartName')?localStorage.getItem('cartName'):"",
        state.cartEmail=localStorage.getItem('cartEmail')?localStorage.getItem('cartEmail'):"",
        state.cartShippingAmount=0,
        state.cartShippingMethod="",
        state.cartTotal=0;
        state.cartItems=[];
        state.cartItems = [...state.cartItems];
        state.cartCount=0;
        state.cartSubTotal=0;
        localStorage.removeItem('cartItems');
        localStorage.removeItem('cartCount');
        localStorage.removeItem('cartSubTotal');
    },
    setCartCountry({ state },data) {
      state.cartCountry=data;
      state.FilteredCountryStates=state.CountryStates.filter(item => item.country_code === data);
      state.FilteredCountryStates = [...state.FilteredCountryStates]; 
    },
    setCartState({ state },data) {
      state.cartState=data;
    },
    setCartCity({ state },data) {
      state.cartCity=data;
    },
    setCartZipcode({ state },data) {
      state.cartZipcode=data;
    },
    setCartPhone({ state },data) {
      state.cartPhone=data;
    },
    setCartName({ state },data) {
      state.cartName=data;
      
    },
    setCartEmail({ state },data) {
      state.cartEmail=data;
      
    },
    
    setCartShippingMethod({ state },data) {
      console.log(data);
      var ShippingMethod=state.ShippingMethods.filter(item => item.method === data);
      state.cartShippingMethod=ShippingMethod[0].method;
      console.log(ShippingMethod[0]);
      var total_shipping=0;
      
        state.cartItems.forEach(function(item) {
          var shipping=0;
          shipping=(ShippingMethod[0].price*1)+((item.qty-1)*ShippingMethod[0].snd_price);
          console.log(shipping);
          console.log(ShippingMethod[0].price);
          console.log(ShippingMethod[0].snd_price);
          item.shipping=shipping;
          total_shipping=total_shipping+shipping;
  
        });
         
        state.cartItems = [...state.cartItems]; 
        
        localStorage.setItem('cartItems',JSON.stringify(state.cartItems));  
          
      
      state.cartShippingAmount=total_shipping;
      state.cartTotal=((total_shipping-0)+(state.cartSubTotal-0));
    },
    
    setUser({ state }, data) {
      
       state.user= data;
       localStorage.setItem('user',JSON.stringify(state.user));
       state.guestUser=false;
       state.cartName=state.user.name;
       state.cartEmail=state.user.email;
       localStorage.setItem('guestUser',state.guestUser);
       localStorage.setItem('cartName',state.cartName);
       localStorage.setItem('cartEmail',state.cartEmail);
       
    },
    addProduct({ state }, product) {
     
        var existingProd=state.cartItems.filter(item => item.id === product.id);
      
       if(existingProd.length){
           
            
        existingProd[0].qty=existingProd[0].qty+product.qty;
        existingProd[0].total=existingProd[0].qty*product.unitPrice;
        
        state.cartItems = [...state.cartItems]; 
            
      }
      else {
           product.qty=parseInt(product.qty,10);
           product.unitPrice=parseFloat(product.unitPrice).toFixed(2);
           product.total=product.qty*product.unitPrice;
          
           state.cartItems = [...state.cartItems, product];
           state.cartCount = state.cartCount+1;
      }
      state.cartShippingAmount=0;
      state.cartShippingMethod="";
      state.cartTotal=0;
      var cartSubtotal = state.cartItems.reduce((subTotal, cartItem) => subTotal + cartItem.total, 0);
      state.cartSubTotal= cartSubtotal;
      localStorage.setItem('cartItems',JSON.stringify(state.cartItems));
      localStorage.setItem('cartCount',state.cartCount);
      localStorage.setItem('cartSubTotal',state.cartSubTotal);
    },
    updateProduct({ state }, data) {
      
       var existingProd=state.cartItems.filter(item => item.id === data.id);
      
       if(!data.qty){
           state.cartItems.splice(state.cartItems.findIndex(item => item.id === data.id), 1);
           state.cartItems = [...state.cartItems]; 
           state.cartCount =state.cartItems.length;
       }
       else if(existingProd.length && data.qty){
           
            
        existingProd[0].qty=data.qty;
        existingProd[0].total=existingProd[0].qty*existingProd[0].unitPrice;
       
        state.cartItems = [...state.cartItems];     
      }
      state.cartShippingAmount=0;
      state.cartShippingMethod="";
      state.cartTotal=0;
      var cartSubtotal = state.cartItems.reduce((subTotal, cartItem) => subTotal + cartItem.total, 0);
      state.cartSubTotal= cartSubtotal;
      localStorage.setItem('cartItems',JSON.stringify(state.cartItems));
      localStorage.setItem('cartCount',state.cartCount);
      localStorage.setItem('cartSubTotal',state.cartSubTotal);
    },
    
    async getHomeData({ state }) {
      
      var lastdata=localStorage.getItem('lastdata')?localStorage.getItem('lastdata'):0;
      // fetch users from API
     
       var currentFetchTime=new Date().getTime();
       
       
        if (currentFetchTime - lastdata > 1000*3600) {
            
           
            var result= await Api.Get('sites/homedata');
          
            if(result.success){
                
                state.currency=result.data.currency;
                localStorage.setItem('currency',result.data.currency);
                
                
                state.categories=result.data.categories;
                localStorage.setItem('categories',JSON.stringify(result.data.categories));
                
                state.homebanners=result.data.sliders;
                localStorage.setItem('homebanners',JSON.stringify(result.data.sliders));
                
                state.topcategories=result.data.TopCategories;
                localStorage.setItem('topcategories',JSON.stringify(result.data.TopCategories));
                
                state.ads=result.data.ads;
                localStorage.setItem('ads',JSON.stringify(result.data.ads));
                
                state.topdeals=result.data.bestsellers;
                localStorage.setItem('topdeals',JSON.stringify(result.data.bestsellers));
                
                state.attCategories=result.data.AttCategories;
                localStorage.setItem('attCategories',JSON.stringify(result.data.AttCategories));
                
                state.ShippingMethods=result.data.ShippingMethods;
                localStorage.setItem('ShippingMethods',JSON.stringify(result.data.ShippingMethods));
              
                localStorage.setItem('lastdata',new Date().getTime());
            }
        }
        else{
          
            state.categories=JSON.parse(localStorage.getItem('categories'));
            state.homebanners=JSON.parse(localStorage.getItem('homebanners'));
            state.topcategories=JSON.parse(localStorage.getItem('topcategories'));
            state.ads=JSON.parse(localStorage.getItem('ads'));
            state.topdeals=JSON.parse(localStorage.getItem('topdeals'));
            state.attCategories=JSON.parse(localStorage.getItem('attCategories'));
            state.ShippingMethods=JSON.parse(localStorage.getItem('ShippingMethods'));
            state.currency=localStorage.getItem('currency');
        }
      
    },
    cordovaApp({state},cordovaApp){
        state.cordovaApp=cordovaApp;
    }
  },
})
export default store;
