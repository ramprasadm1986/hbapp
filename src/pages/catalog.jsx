import React,{ useState, useRef }  from 'react';
import { f7, Page, Navbar,NavLeft,NavTitle,NavRight,Link, List, ListItem, Block,Badge,Icon, Button, useStore,Row,Col,Card,
  CardHeader,
  CardContent,
  CardFooter,
  Subnavbar,
  Searchbar, theme } from 'framework7-react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import LazyLoad from 'react-lazyload';
import store from '../js/store';
import HBApi from '../components/api';

const CatalogPage = (props) => {
  const allowInfinite = useRef(true);
  const [showPreloader, setShowPreloader] = useState(true);
  const { categoryname } = props;
  const { categoryid } = props;
  const { products } = props;
  var { lastindex } = props;
  var { total_product } = props;
  
  
  const [catalogItems,setItems]=useState(products);
  const [ListIndex, setListIndex] = useState(lastindex);
  const [TotalProduct, setTotalProduct] = useState(total_product);
  const cartCount = useStore('cartCount');
  const  loadMore = async () => {
        
       
        if (!allowInfinite.current) return;
        allowInfinite.current = false;
        
        
        
     
        
        var Api= new HBApi();
        
        var result= await Api.Get('catalogs/category?categoryid='+categoryid+'&lastindex='+ListIndex);
            if(result.success){
              setListIndex(result.data.lastindex);
              setTotalProduct(result.data.total_product);
              
            
              
              
             
              result.data.products.map((item,index)=>(
                catalogItems.push(item)
              ));
              
              allowInfinite.current = true;
              setItems([...catalogItems]);
                 if (ListIndex >= TotalProduct) {
                    setShowPreloader(false);
                    
                    return;
                 } 
            }
            else{
                setShowPreloader(false);
                
                return;
            }
  };
    
  return (
    <Page name="catalog" infinite infiniteDistance={50} infinitePreloader={showPreloader} onInfinite={loadMore}>
    
   
    <Navbar sliding={false}>
        <NavLeft>
            <Link iconIos="f7:line_horizontal_3" iconAurora="f7:line_horizontal_3" iconMd="f7:line_horizontal_3" panelOpen="left" />
        </NavLeft>
        <NavTitle sliding>{categoryname}</NavTitle>
        <Subnavbar inner={false}>
            <Searchbar
              searchContainer=".search-list"
              searchIn=".catalog_card_title"
              disableButton={!theme.aurora}
            ></Searchbar>
        </Subnavbar>
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
     <List className="searchbar-not-found">
      <ListItem title="Nothing found"></ListItem>
    </List>
     <List className="search-list searchbar-found">
     {catalogItems.map((item, index) => (
     
     <ListItem key={index}>
        <Link className="catalogitemLink" href={`/product/${item.id}/`} animate={false} ignoreCache={true}>
     
            <Card className="catalogitem">            
                <CardContent padding={false}>
                    <Row>
                        <Col width="50">
                            
                            <img className="lazy lazy-fade-in"  src={item.image} width="100%"  />
                          
                        </Col>
                        <Col width="50">
                            <div className="catalog_card_title">{ ReactHtmlParser(item.name) }</div>
                        </Col>
                    </Row>
                </CardContent>
                <CardFooter className="catalog_card_price">
                    { ReactHtmlParser(item.price) }
                </CardFooter>
            </Card>
        </Link>
     </ListItem>
     ))}
     </List>
     </Block>
    </Page>
  );
}

export default CatalogPage;
