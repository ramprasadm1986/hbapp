import React,{useState, useEffect } from 'react';
import { Page,View, Navbar ,List,ListInput,ListButton,ListItem,Button,Block,BlockTitle,BlockHeader,BlockFooter,Card,
	CardHeader,
	CardContent,
	CardFooter,Row,Col,useStore } from 'framework7-react';
import store from '../js/store';
import ReactHtmlParser, {
	processNodes,
	convertNodeToElement,
	htmlparser2,
} from "react-html-parser";
const ShippingPage = (props) => {
const { f7route, f7router,from,next } = props;

const cordovaApp=useStore("cordovaApp");

const currency = useStore("currency");
const ShippingMethods = useStore("ShippingMethods");
const cartSubTotal = useStore("cartSubTotal");
const cartShippingAmount = useStore("cartShippingAmount");
const cartTotal = useStore("cartTotal");

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
}

const PayemntSuccess=(payment)=>{
    store.dispatch('resetCatalog');
    f7router.app.preloader.show();
    var view=f7router.app.views.current;
    view.router.back(view.history[0], { force: true });
    f7router.app.tab.show("#view-home");
    f7router.app.views.main.router.refreshPage();
    showToastCenter("Order Placed Succefully");
    f7router.app.preloader.hide();
}
const PayemntError=(error)=>{
    
    f7router.app.preloader.show();
    f7router.app.dialog.alert(error,"Payment Error");
    f7router.app.preloader.hide();
}
const PlaceOrder= async ()=>{
        if (f7router.app.input.validateInputs("#shipping-form")){
        
           cordovaApp.PaypalPayNow({"amount":cartTotal,"currencyCode":"GBP","reference_id":"Test"},PayemntSuccess,PayemntError);
        }
        else{
            showToastCenter("Select Shipping Method");
        }
    }

return (
    <Page name="shipping">
        <Navbar title="Shipping" backLink="Back" />
        {/* Page content */}
        
        <BlockHeader className="shipingheader">Select Shipping Method</BlockHeader>
        <Block>
            <List form id="shipping-form">
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
            </List>
                
        </Block>
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