import React,{ useState, useRef }  from 'react';
import { f7, Page, Navbar,NavLeft,NavTitle,NavRight,Link, List, ListItem, Block,BlockTitle,Badge,Icon, Button, useStore,Row,Col,Card,
  CardHeader,
  CardContent,
  CardFooter,
  Subnavbar,
  Searchbar, theme } from 'framework7-react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import LazyLoad from 'react-lazyload';
import store from '../js/store';
import HBApi from '../components/api';

const OrdersPage = (props) => {
    const cartCount = useStore('cartCount');
    
  return (
    <Page name="orders" >
    
   
    <Navbar sliding={false}>
        <NavLeft>
            <Link iconIos="f7:line_horizontal_3" iconAurora="f7:line_horizontal_3" iconMd="f7:line_horizontal_3" panelOpen="left" />
        </NavLeft>
        <NavTitle sliding>My Orders</NavTitle>
        
        <NavRight>
            <Link iconOnly tabLink="#view-catalog" view="#view-catalog" href="/cart/">
              <Icon ios="f7:cart" aurora="f7:cart" md="f7:cart">
                <Badge id="cartCount" color="red">{cartCount}</Badge>
              </Icon>
            </Link>
            <Link iconIos="f7:line_horizontal_3" iconAurora="f7:line_horizontal_3" iconMd="f7:line_horizontal_3" panelOpen="right" />
        </NavRight>
    </Navbar>
    
     
    <Block>
        <BlockTitle className="title_h2 text-align-center">
            No Order Found
        </BlockTitle>
    </Block>
    </Page>
  );
}

export default OrdersPage;
