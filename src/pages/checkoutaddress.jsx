import React,{useState, useEffect } from 'react';
import { Page,View, Navbar ,List,ListInput,ListButton,Button,Block,BlockTitle,BlockHeader,BlockFooter,useStore } from 'framework7-react';
import store from '../js/store';
import HBApi from '../components/api';

const CheckoutAddressPage = (props) => {
    const { f7route, f7router,from,next } = props;
    var Api= new HBApi();
    const user = useStore("user");
    const guestUser = useStore("guestUser");
    const cartName = useStore("cartName");
    const cartEmail = useStore("cartEmail");
    const Countries = useStore("allowedCountries");
    const CountryStates = useStore("countryStates");
    const cartAdd1 = useStore("cartAdd1");
    const cartAdd2 = useStore("cartAdd2");
    const cartLandmark = useStore("cartLandmark");
    const cartCountry = useStore("cartCountry");
    const cartState = useStore("cartState");
    const cartCity = useStore("cartCity"); 
    const cartZipcode = useStore("cartZipcode");
    const cartPhone = useStore("cartPhone");
    const cartItems = useStore("cartItems");
    const cartIdentifire = useStore("cartIdentifire");
 
    
    const setName=(nameSelected)=>{
        store.dispatch('setCartName',nameSelected);
    }
    const setEmail=(emailSelected)=>{
        store.dispatch('setCartEmail',emailSelected);
    }
     const setCountry=(countrySelected)=>{       
        store.dispatch('setCartCountry',countrySelected);
    }
    
     const setCartAdd1=(add1)=>{       
        store.dispatch('setCartAdd1',add1);
    }
    const setCartAdd2=(add2)=>{       
        store.dispatch('setCartAdd2',add2);
    }
    const setCartLandmark=(landmark)=>{       
        store.dispatch('setCartLandmark',landmark);
    }
    const setState=(stateSelected)=>{
        store.dispatch('setCartState',stateSelected);
    }
    const setCity=(citySelected)=>{
        store.dispatch('setCartCity',citySelected);
    }
    const setZipcode=(zipcodeSelected)=>{
        store.dispatch('setCartZipcode',zipcodeSelected);
    }
    const setPhone=(phoneSelected)=>{
        store.dispatch('setCartPhone',phoneSelected);
    }
    
   
    
    
    var toastCenter;
    
    const destroyToast = () => {
        if (toastCenter) {
            toastCenter.close();
            toastCenter.destroy();
            toastCenter = false;
        }
    };

    const showToastCenter = (text) => {
        // Create toast
        if (!toastCenter) {
            toastCenter = f7router.app.toast.create({
                text: text,
                position: "center",
                closeTimeout: 1000,
            });
            toastCenter.on("toastClosed", destroyToast);
        }
        // Open it
        toastCenter.open();
    };
    const PprceedShipping= async ()=>{
        if (f7router.app.input.validateInputs("#address-form")){
            
            var user_id=false;
            if(user){
            user_id=user.id;
            }
            f7router.app.preloader.show();
            
            
   
            var result= await Api.Post('carts/setcart',{ "cartName":cartName,"cartEmail":cartEmail,"cartAdd1":cartAdd1,"cartAdd2":cartAdd2,"cartLandmark":cartLandmark,"cartCountry":cartCountry,"cartState":cartState,"cartCity":cartCity,"cartZipcode":cartZipcode,"cartPhone":cartPhone,"cartItems":cartItems,"cartIdentifire":cartIdentifire,"user_id":user_id,"guestUser":guestUser});
            
            
            if (result.success){
            store.dispatch('setCartTaxAmount',result.data.tax);
            store.dispatch('setCartIdentifire',result.data.CartIdentifire);
            f7router.app.preloader.hide();
            f7router.navigate("/shipping/");
            }
            else{
            f7router.app.preloader.hide();
            showToastCenter(result.data.message);
            }
            
        }
    }
    return (
        <Page name="checkoutaddress">
            <Navbar title="Delivery Address" backLink="Back" />
         
                <List form id="address-form" className="nobrd">
                    <ListInput
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={cartName}
                        onInput={(e) => setName(e.target.value)}
                      required></ListInput>
                    <ListInput
                        type="email"
                        name="name"
                        placeholder="Your Email"
                        value={cartEmail}
                        onInput={(e) => setEmail(e.target.value)}
                      required validate></ListInput>
                    <ListInput
                        label="Address Line 1"
                        type="text"
                        name="add1"
                        placeholder="Address Line 1"
                        value={cartAdd1}
                        onInput={(e) => setCartAdd1(e.target.value)}
                        required
                      ></ListInput>
                    <ListInput
                        label="Address Line 2"
                        type="text"
                        name="add2"
                        placeholder="Address Line 2"
                        value={cartAdd2}
                        onInput={(e) => setCartAdd2(e.target.value)}
                        
                      ></ListInput>
                    <ListInput
                        label="Landmark"
                        type="text"
                        name="landmark"
                        placeholder="Landmark"
                        value={cartLandmark}
                        onInput={(e) => setCartLandmark(e.target.value)}
                        
                      ></ListInput>
                    <ListInput label="Country"
                        type="select"
                        name="country"
                        placeholder="Your Country"
                        value={cartCountry}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    >
                    <option value=""> Select Country</option>
                    {Countries.map((item, index) => (
                        <option key={index} value={item.iso2}>{item.name}</option>
                    ))}
                    </ListInput>
                    <ListInput label="State"
                        type="select"
                        name="state"
                        value={cartState}
                        placeholder="Your State"
                        onChange={(e) => setState(e.target.value)}
                        required
                    >
                    <option value=""> Select State</option>
                    {CountryStates.length && (<>
                        {CountryStates.map((item, index) => (
                            <option key={index} value={item.iso2}>{item.name}</option>
                        ))}
                    </>)}
                    </ListInput>
                    <ListInput
                        label="City"
                        type="text"
                        name="city"
                        placeholder="Your City"
                        value={cartCity}
                        onInput={(e) => setCity(e.target.value)}
                      ></ListInput>
                      <ListInput
                        label="Zip Code"
                        type="text"
                        name="zipcode"
                        placeholder="Your Zip Code"
                        value={cartZipcode}
                        onInput={(e) => setZipcode(e.target.value)}
                        required
                      ></ListInput>
                      <ListInput
                        label="Contact No"
                        type="tel"
                        name="contact"
                        placeholder="Your Contact Number"
                        value={cartPhone}
                        pattern="\d*"
                        onInput={(e) => setPhone(e.target.value)}
                        required
                      ></ListInput>
                </List>
         
            <Block style={{ width: "100%" }} className="float-left">
                <Button
                    className="float-right"
                    fill
                    onClick={() => PprceedShipping()}
                >
                    Next
                </Button>
            </Block>
        </Page>
    );
}


export default CheckoutAddressPage;