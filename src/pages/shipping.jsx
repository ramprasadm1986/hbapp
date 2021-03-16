import React,{useState, useEffect } from 'react';
import { Page,View, Navbar, Icon,List,ListInput,ListButton,ListItem,Button,Block,BlockTitle,BlockHeader,BlockFooter,Card,
	CardHeader,
	CardContent,
	CardFooter,Row,Col,useStore } from 'framework7-react';
import store from '../js/store';
import PayPal from '../assets/PayPal.svg';
import CardPayment from '../assets/CardPayment.png';
import ReactHtmlParser, {
	processNodes,
	convertNodeToElement,
	htmlparser2,
} from "react-html-parser";

import HBApi from '../components/api';

const ShippingPage = (props) => {
const { f7route, f7router,from,next } = props;
const Api= new HBApi();
const cordovaApp=useStore("cordovaApp");


 useEffect(() => {
       
        store.dispatch('calculateCartTotal');
     
        
      }, []);
const [OrderIdentifire, setOrderIdentifire] = useState('');
const currency = useStore("currency");
const ShippingMethods = useStore("ShippingMethods");
const cartShippingMethod = useStore("cartShippingMethod");
const cartSubTotal = useStore("cartSubTotal");
const cartTaxAmount = useStore("cartTaxAmount");
const cartShippingAmount = useStore("cartShippingAmount");
const cartTotal = useStore("cartTotal");
const cartPaymentMethod = useStore("cartPaymentMethod");
const cartCountry = useStore("cartCountry");
const cartIdentifire = useStore("cartIdentifire");

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

const fixRadix = (amount) => {
		return currency + "" + parseFloat(amount).toFixed(2);
	};
    
const setShippingMethod=(method)=>{
    store.dispatch('setCartShippingMethod',method);
    store.dispatch('calculateCartTotal');
}

const setPaymentMethod=(method)=>{
    store.dispatch('setCartPaymentMethod',method);
}

const PayemntSuccess= async (payment)=>{
    
    f7router.app.preloader.show();
    
    var result= await Api.Post('carts/orderconfirm',{ "OrderIdentifire":OrderIdentifire,"CartIdentifire":cartIdentifire});
    if(result.success){
        store.dispatch('resetCatalog');
        var view=f7router.app.views.current;
        view.router.back(view.history[0], { force: true });
        f7router.app.views.main.router.refreshPage();
        f7router.app.tab.show("#view-home");
        showToastCenter("Order Placed Successfully");
        f7router.app.preloader.hide();
    }
    else{
        f7router.app.preloader.hide();
        showToastCenter(result.message);
    }
    
    
    
}
const PayemntError=(error)=>{
    console.log(error);
    f7router.app.preloader.show();
    f7router.app.dialog.alert(error,"Payment Error");
    f7router.app.preloader.hide();
}

const PlaceOrder= async ()=>{
        if (f7router.app.input.validateInputs("#shipping-form")){
        
            f7router.app.preloader.show();
            var result= await Api.Post('carts/paceorder',{ "CartIdentifire":cartIdentifire,"cartShippingMethod":cartShippingMethod,"cartShippingAmount":cartShippingAmount,"cartPaymentMethod":cartPaymentMethod});
                
                
                if(result.success){
                    setOrderIdentifire(result.data.OrderIdentifire);
                    f7router.app.preloader.hide();
                    if(cartPaymentMethod=="paypal")
                        
                        
                        
                        cordovaApp.PaypalPayNow({"amount":cartTotal,"currencyCode":"GBP","reference_id":result.data.OrderIdentifire},PayemntSuccess,PayemntError);
                    // else if(cartPaymentMethod=="stripe"){
                    
                        // window.plugins.StripePaymentsPlugin.init({"publishableKey":"pk_test_519zWP3Kwh2BrhOy7RXM6lSMPQL3ZykGtOl6TYSZPnCZAGzGaF6jTAZ4DjNqVD7aYhVdyVNNu4eYGiif7fOdk7p0V00EvytDvSl", "ephemeralKeyUrl":Api.ApiUrl+"sites/stripekey", "appleMerchantId":"", "companyName":"Hot Bargains"},function (status){
                        // console.log(status);
                        // },function (error){
                        // console.log(error);
                        
                        // });
                        // window.plugins.StripePaymentsPlugin.addPaymentStatusObserver( function (status){
                        // console.log(status);
                        // } );
                        
                        // window.plugins.StripePaymentsPlugin.showPaymentDialog({ "price":cartTotal*100, "currency":"GBP", "country":cartCountry },PayemntSuccess,PayemntError);
                        
                       
                    // }
                }
                else{
                f7router.app.preloader.hide();
                showToastCenter(result.message);
                }
        }
        else{
            showToastCenter("Select Shipping Method && Payment Method");
        }
    }

return (
    <Page name="shipping">
        <Navbar title="Shipping" backLink="Back" />
        {/* Page content */}
        
        
        
            <List form id="shipping-form">
            <BlockHeader className="shipingheader">Select Shipping Method</BlockHeader>
            <Block>
            {ShippingMethods.length && (<>
                        {ShippingMethods.map((item, index) => (
                        
                           <ListItem key={index} className="card shadow nom"
                            radio
                            radioIcon="start"
                            title={item.name}
                            value={item.method}
                            name="shipping"
                            header={"Price: "+currency+item.price} footer={"Free Ship Over: "+currency+item.freeship_threshold} after={"2nd Qty Price: "+currency+item.snd_price}
                            onChange={(e) => setShippingMethod(e.target.value)}
                          required></ListItem>
                            
                        ))}
            </>)}
            </Block>
            <BlockHeader className="shipingheader">Select Payment Method</BlockHeader>
            <Block>
            <ListItem className="card shadow nom"
                            radio
                            radioIcon="start"
                            
                            value="paypal"
                            name="payment_method"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          required><img src={PayPal} slot="media" /></ListItem>
           
            
            
            
            </Block>
            </List>
                
        
        <Block>
        <Card className="catalogitem shadow">
            <CardContent padding={false}>
                <Block>
                <Row className="borderbtm">
                    <Col width="50">
                        <BlockTitle className="cartitle_h2 text-align-left">
                            SubTotal
                        </BlockTitle>
                    </Col>
                    <Col width="50">
                        <BlockTitle className="cartitle_h2 text-align-right">
                            {fixRadix(cartSubTotal)}
                        </BlockTitle>
                    </Col>
                </Row>
                <Row className="borderbtm">
                    <Col width="50">
                        <BlockTitle className="cartitle_h2 text-align-left">
                            VAT
                        </BlockTitle>
                    </Col>
                    <Col width="50">
                        <BlockTitle className="cartitle_h2 text-align-right">
                            {fixRadix(cartTaxAmount)}
                        </BlockTitle>
                    </Col>
                </Row>
                <Row className="borderbtm">
                    <Col width="50">
                        <BlockTitle className="cartitle_h2 text-align-left">
                            Shipping
                        </BlockTitle>
                    </Col>
                    <Col width="50">
                        <BlockTitle className="cartitle_h2 text-align-right">
                            {fixRadix(cartShippingAmount)}
                        </BlockTitle>
                    </Col>
                </Row>
                <Row>
                    <Col width="50">
                        <BlockTitle className="cartitle_h2 text-align-left">
                            Total
                        </BlockTitle>
                    </Col>
                    <Col width="50">
                        <BlockTitle className="cartitle_h2 text-align-right">
                            {fixRadix(cartTotal)}
                        </BlockTitle>
                    </Col>
                </Row>
                </Block>
            </CardContent>
            <CardFooter>
                <Block
                    style={{ width: "100%",paddingRight:"0px"}}
                    
                >
                    <Button
                        className="float-right"
                        fill
                        onClick={() => PlaceOrder()}
                    >
                        Place Order
                    </Button>
                </Block>
            </CardFooter>
        </Card>
        </Block>
        
    </Page>
);
}


export default ShippingPage;