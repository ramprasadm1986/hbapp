import React from 'react';
import { Page, Navbar,NavLeft,NavTitle,NavRight,Link, BlockTitle, Block,Button,Badge,Icon,Swiper,SwiperSlide, useStore } from 'framework7-react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import store from '../js/store'
const ProductPage = (props) => {
  const { f7route, f7router } = props;
  const { product } = props;
  const { productHelper } = props;
  const cartCount = useStore('cartCount');
  var toastCenter;
  
  const destroyToast=()=>{
       if(toastCenter){
           toastCenter.close();
           toastCenter.destroy();
           toastCenter=false;
       }
  }
  const showToastCenter = (text) => {
      // Create toast
      if (!toastCenter) {
        toastCenter = f7router.app.toast.create({
          text: text,
          position: 'center',
          closeTimeout: 1000,
        });
        toastCenter.on("toastClosed",destroyToast);
      }
      // Open it
      toastCenter.open();
    }
  const addProduct = (product,productHelper) => {
  
    store.dispatch('addProduct',{id:product.id,image:productHelper.image,name:product.name,sku:product.sku,qty:1,unitPrice:productHelper.unitPrice,total:productHelper.unitPrice,shipping:0});
    showToastCenter("Item Added To Cart");
  }
  return (
    <Page name="product">
     
      
      <Navbar sliding={false} >
      <NavLeft>
        <Link iconIos="f7:line_horizontal_3" iconAurora="f7:line_horizontal_3" iconMd="f7:line_horizontal_3" panelOpen="left" />
      </NavLeft>
      <NavTitle sliding>Hotbargains</NavTitle>
      <NavRight>
        <Link iconOnly tabLink="#view-catalog" view="#view-catalog" href="/cart/">
          <Icon ios="f7:cart" aurora="f7:cart" md="f7:cart">
            <Badge id="cartCount" color="red">{cartCount}</Badge>
          </Icon>
        </Link>
        <Link iconIos="f7:line_horizontal_3" iconAurora="f7:line_horizontal_3" iconMd="f7:line_horizontal_3" panelOpen="right" />
      </NavRight>
      
    </Navbar>
     
      
        {productHelper.getGalleryImages.length && (
        <Swiper pagination  
                
                slidesPerView={1} 
                spaceBetween={20}
                 >
          {productHelper.getGalleryImages.map((item,index) => (
                <SwiperSlide key={index}  ><img src={item} className="lazy lazy-fade-in" /></SwiperSlide>
                ))}
          
          
        </Swiper>
        )}
        
       <Block strong>
      { ReactHtmlParser(product.name) }
      </Block>
      <Block strong>
      { ReactHtmlParser(product.sku) }
      </Block>
      <Block strong>
      { ReactHtmlParser(productHelper.price) }
      </Block>
      
      <Block strong>
      
            <Button fill onClick={() => addProduct(product,productHelper)}>Add To Cart</Button>
           
      </Block>
      
      
      <Block strong>
      { ReactHtmlParser(product.short_description) }
      </Block>
      
      <Block strong>
      { ReactHtmlParser(product.description) }
       
      </Block>
    </Page>
  );
}

export default ProductPage;
