import React from "react";
import {
	Page,
	Navbar,
	NavLeft,
	NavTitle,
	NavRight,
	Link,
	List,
	ListItem,
	BlockTitle,
	Block,
	Button,
	Badge,
	Icon,
	Swiper,
	SwiperSlide,
	Card,
	CardHeader,
	CardContent,
	CardFooter,
	Row,
	Col,
	AccordionContent,
	AccordionItem,
	AccordionToggle,
	Stepper,
	useStore,
} from "framework7-react";
import ReactHtmlParser, {
	processNodes,
	convertNodeToElement,
	htmlparser2,
} from "react-html-parser";
import store from "../js/store";

const CartPage = (props) => {
	const { f7route, f7router } = props;
	const user = useStore("user");
	const cartCount = useStore("cartCount");
	const cartItems = useStore("cartItems");
	const cartSubTotal = useStore("cartSubTotal");
	const currency = useStore("currency");
	const fixRadix = (amount) => {
		return currency + "" + parseFloat(amount).toFixed(2);
	};
	const cartProceed = () => {
		if (user) {
            f7router.navigate("/checkoutaddress/");
			
		} else {
			
            f7router.navigate("/login/", {
				props: { from: "cart", next: "checkoutaddress" }
			});
		}
	};
    
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
	const updateProduct = (type, item) => {
		if (type == "minus") {
			var qty = item.qty - 1;
		} else if (type == "plus") {
			var qty = item.qty + 1;
		}
		if (qty >= 0 && qty <= 10) {
			store.dispatch("updateProduct", { qty: qty, id: item.id });
			if (qty) showToastCenter("Item Updated");
			else showToastCenter("Item Removed");
		}
	};
	return (
		<Page name="cart">
			<Navbar sliding={false} backLink="Back" title="Cart" />

			{cartCount && (
				<>
				 
						<List accordionList inset className="shadow">
							{cartItems.map((item, index) => (
								<ListItem
									key={index}
									accordionItem
									accordionItemOpened
									title={ReactHtmlParser(item.name)}
									header={`Total : ` + fixRadix(item.total)}
								>
									<AccordionContent>
										<Card className="catalogitem">
											<CardContent padding={false}>
												<Row>
													<Col width="50">
														<img
															className="lazy lazy-fade-in"
															src={item.image}
															width="100%"
														/>
													</Col>
													<Col width="50">
														<div className="catalog_card_title">
															<Block>
																{ReactHtmlParser(
																	item.name
																)}
															</Block>
															<Block>
																{ReactHtmlParser(
																	item.sku
																)}
															</Block>
														</div>
													</Col>
												</Row>
												<div className="catalog_card_price cartitemprice">
												<Row>
													<Col>
													<div className="cartqwt">
														{ReactHtmlParser(
															item.qty
														)}
														<span> X </span>
														{fixRadix(
															item.unitPrice
														)}
														<span> = </span>
														{fixRadix(item.total)}
														</div>
													</Col>
													<Col>
													 <div className="cartstepper">
														<Stepper
															inputReadonly
															raised small round fill 
															value={item.qty}
															min={1}
															max={10}
															step={1}
															style={{backgroundColor:"#000"}}
															color="black"
															onStepperMinusClick={() =>
																updateProduct(
																	"minus",
																	item
																)
															}
															onStepperPlusClick={() =>
																updateProduct(
																	"plus",
																	item
																)
															}
														/>
														 </div>
													</Col>
												</Row>
											</div>
											</CardContent>
											
										</Card>
									</AccordionContent>
								</ListItem>
							))}
						</List>
			 
					<Card className="catalogitem">
						<CardContent padding={false}>
							<Row>
								<Col width="50">
									<BlockTitle className="title_h2 text-align-center">
										SubTotal
									</BlockTitle>
								</Col>
								<Col width="50">
									<BlockTitle className="title_h2 text-align-center">
										{fixRadix(cartSubTotal)}
									</BlockTitle>
								</Col>
							</Row>
						</CardContent>
						<CardFooter>
							<Block
								style={{ width: "100%" }}
								className="float-left"
							>
								<Button
									className="float-right"
									fill
									onClick={cartProceed}
								>
									Next
								</Button>
							</Block>
						</CardFooter>
					</Card>
				</>
			)}

			{cartCount <= 0 && (
				<Block>
					<BlockTitle className="title_h2 text-align-center">
						Shopping Cart Is Empty
					</BlockTitle>
				</Block>
			)}
		</Page>
	);
};

export default CartPage;
