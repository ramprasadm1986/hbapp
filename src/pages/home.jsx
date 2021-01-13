import React,{ useEffect } from 'react';
import {
  Panel,
  View,
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavTitleLarge,
  NavRight,
  Link,
  Icon,
  Toolbar,
  Block,
  BlockTitle,
  List,
  ListItem,
  Row,
  Col,
  Button,
  Badge,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Swiper,
  SwiperSlide,
  useStore
} from 'framework7-react';
import Framework7 from 'framework7/lite-bundle';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import store from '../js/store'

import '../css/swiper.css';


const HomePage = (props) => {
   const {f7route, f7router } = props;
   const categories = useStore('categories');
   
   const homebanners = useStore('homebanners');
   
   const cartCount = useStore('cartCount');
   
   const topcategories = useStore('topcategories');
   
   const ads = useStore('ads');
   const topdeals = useStore('topdeals');
   const attCategories = useStore('attCategories');
   
 
    

    
   

    return (
  <Page name="home">
    {/* Left panel with cover effect*/}
        <Panel left cover themeDark>
          <View>
            <Page>
              <Navbar title="Categories"/>
              
                
              {categories.length && (
                <List >
                    <ul className="sidenav">
                    {categories.map((item,index) => (<>
                    
                        <ListItem key={item.category_id} title={item.label}   link={`/catalog/${item.category_id}/${item.label}`} tabLink="#view-catalog" view="#view-catalog"  panelClose />
                            {item.items.length > 0 && (<>
                                <List className="subsidenav" >
                                    <ul>
                                    {item.items.map((item1,index1)=>(<>
                                    
                                        <ListItem key={item1.category_id} title={item1.label}  link={`/catalog/${item1.category_id}/${item1.label}`} tabLink="#view-catalog" view="#view-catalog"  panelClose />
                                        {item1.items.length > 0 && (<>
                                            <List className="subsubsidenav" >
                                            <ul>
                                                {item1.items.map((item2,index2)=>(<>
                                                    <ListItem key={item2.category_id} title={item2.label}  link={`/catalog/${item2.category_id}/${item2.label}`} tabLink="#view-catalog" view="#view-catalog"  panelClose></ListItem>                               
                                                </>))}
                                                </ul>
                                            </List>    
                                        </>)}
                                        
                                    
                                    </>))}
                                    </ul>
                                </List>
                            </>)}
                        
                    
                    </>))}
                   </ul> 
                </List>
               )}
            </Page>
          </View>
        </Panel>


        {/* Right panel with reveal effect*/}
        <Panel right cover themeDark>
          <View>
            <Page>
              <Navbar title="Right Panel"/>
              <Block>Right panel content goes here</Block>
            </Page>
          </View>
        </Panel>
    {/* Top Navbar */}
    <Navbar sliding={false}>
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
    {categories.length && (
     <Block>
    <Swiper className="category_swiper"
            slidesPerView={5} 
            spaceBetween={15}
            breakpoints={{
                480: {
                  slidesPerView: 5,
                  spaceBetween: 15,
                },
                560: {
                  slidesPerView: 8,
                  spaceBetween: 15,
                },
                640: {
                  slidesPerView: 10,
                  spaceBetween: 15,
                },
                768: {
                  slidesPerView: 12,
                  spaceBetween: 15,
                },
                1024: {
                  slidesPerView: 15,
                  spaceBetween: 15,
                },
              }}
           >
        {categories.map((item,index) => (<>
            
            <SwiperSlide key={item.category_id}>            
                <Link className="catalogitemLink" href={`/catalog/${item.category_id}/${item.label}`} tabLink="#view-catalog" view="#view-catalog" animate={false} ignoreCache={true}>
                <div className="category_icon lazy lazy-fade-in" style={{backgroundImage:"url("+item.icon+")"}}></div>
                <span className="category_text">{item.label}</span>
                </Link>
            </SwiperSlide>
            {item.items.length > 0 && (<>
              
                {item.items.map((item1,index1)=>(<>
                    <SwiperSlide key={item1.category_id}>                              
                        <Link className="catalogitemLink" href={`/catalog/${item1.category_id}/${item1.label}`} tabLink="#view-catalog" view="#view-catalog" animate={false} ignoreCache={true}>
                        <div className="category_icon lazy lazy-fade-in" style={{backgroundImage:"url("+item1.icon+")"}}></div>
                        <span className="category_text">{item1.label}</span>
                        </Link>                  
                    </SwiperSlide>
                    {item1.items.length > 0 && (<>
              
                        {item1.items.map((item2,index2)=>(<>
                            <SwiperSlide key={item2.category_id}>                              
                                <Link className="catalogitemLink" href={`/catalog/${item2.category_id}/${item2.label}`} tabLink="#view-catalog" view="#view-catalog" animate={false} ignoreCache={true}>
                                <div className="category_icon lazy lazy-fade-in" style={{backgroundImage:"url("+item2.icon+")"}}></div>
                                <span className="category_text">{item2.label}</span>
                                </Link>                  
                            </SwiperSlide>
                            
                            
                        
                        </>))}              
                    </>)}
                    
                
                </>))}              
            </>)}
           
           
         </>))}
      
      
    </Swiper>
    </Block>
    )}
    {homebanners.length && (
        <Swiper pagination  
                autoplay={{
                        delay: 1000,
                        disableOnInteraction:false
                        }} 
                speed={500} 
                slidesPerView={1} 
                spaceBetween={20}
                loop >
          {homebanners.map((item,index) => (
                <SwiperSlide key={index}  ><img src={item.image} className="lazy lazy-fade-in" /></SwiperSlide>
                ))}
          
          
        </Swiper>
    )}
    {topcategories.length && (
    <Block>
    <BlockTitle className="title_h2 text-align-center">Shop from Top Categories</BlockTitle>
      <Row noGap>
        {topcategories.map((item,index) => (
        <Col key={item.category_id} width="50">
            <Card>            
                <CardContent padding={false}>
                    <img className="card_img lazy lazy-fade-in"  src={item.image} width="100%"  />
                </CardContent>
                <CardFooter className="home_card_title">
                    {item.name}
                </CardFooter>
            </Card>
        </Col>
         ))}
      </Row>   
    </Block>
    )}
  
    <Block>
        <Row noGap>
        <Col width="100">
         <img className="lazy lazy-fade-in"  src={ads.ad01} width="100%"  />
        </Col>
        </Row>
    </Block>
    {topdeals.length && (
    <Block>
    <BlockTitle className="title_h2 text-align-center">Top Deals</BlockTitle>
      
       <Row noGap>
        <Swiper className="topdeals_swiper" navigation  
                
                slidesPerView={2.5} 
                spaceBetween={10}
                loop >
          {topdeals.map((item,index) => (
                
                <SwiperSlide key={item.id} className="shadow mar">
                <Link className="catalogitemLink" href={`/product/${item.id}/`} tabLink="#view-catalog" view="#view-catalog" animate={false} ignoreCache={true}>
                    <Card className="topdeals ">            
                        <CardContent padding={false}>
                            <img className="card_img lazy lazy-fade-in" src={item.image} width="100%"  />
                            <div className="home_card_price">{ ReactHtmlParser(item.price) }</div>
                        </CardContent>
                        <CardFooter className="home_card_title black" >
                            { ReactHtmlParser(item.name) }
                        </CardFooter>
                    </Card>
                 </Link>
                </SwiperSlide>
               
                ))}
          
          
        </Swiper>
        </Row>
    
    </Block>
    )}
    <Block>
        <Row noGap>
        <Col width="100">
         <img className="lazy lazy-fade-in"  src={ads.ad02} width="100%"  />
        </Col>
        </Row>
    </Block>
    <Block>
        <Row noGap>
        <Col width="100">
         <img className="lazy lazy-fade-in"  src={ads.ad03} width="100%"  />
        </Col>
        </Row>
    </Block>
    {attCategories.length && (
    <Block>
    <BlockTitle className="title_h2 text-align-center">Your Attention</BlockTitle>
      <Row noGap>
        {attCategories.map((item,index) => (
        <Col key={item.category_id} width="33">
            <Card>            
                <CardContent padding={false}>
                    <img className="card_img lazy lazy-fade-in"  src={item.image} width="100%"  />
                </CardContent>
                <CardFooter className="home_card_title">
                    {item.name}
                </CardFooter>
            </Card>
        </Col>
         ))}
      </Row>   
    </Block>
    )}
    
  </Page>
);
  }
  
 export default HomePage;