import React,{ useState, useRef }  from 'react';
import {
  Link,
  Swiper,
  SwiperSlide,
 useStore
} from 'framework7-react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import store from '../js/store'
import '../css/swiper.css';

class CategorySwiperSlide extends React.Component{
    
    constructor(props) {
        super(props);
      
        this.state ={
            categories : props.categories
        }
        
      
    }
    subchild(items){
        
        if (items.length) {
        
            return (
               
                <>       
                {items.map((item,index) => (
                    <SwiperSlide key={index}>
                       {/*<Link className="catalogitemLink" href={`/catalog/${item.category_id}/${item.label}`} tabLink="#view-catalog" view="#view-catalog" animate={false} ignoreCache={true}>*/}
                        <div className="category_icon lazy lazy-fade-in" style={{backgroundImage:"url("+item.icon+")"}}></div>
                        <span className="category_text">{item.label}</span>
                       {/*</Link>*/}
                    </SwiperSlide>
                 ))}
                        
                      
                </>
                       
            );
        
        }
        
    
    }
    render(){
      
      return (
            
            <>
            
            {this.state.categories.length && (
            <Swiper className="category_swiper"
            slidesPerView={6} 
            spaceBetween={15}
            >
                {this.state.categories.map((item,index) => (
                    <SwiperSlide key={index}>
                       {/*<Link className="catalogitemLink" href={`/catalog/${item.category_id}/${item.label}`} tabLink="#view-catalog" view="#view-catalog" animate={false} ignoreCache={true}>*/}
                        <div className="category_icon lazy lazy-fade-in" style={{backgroundImage:"url("+item.icon+")"}}></div>
                        <span className="category_text">{item.label}</span>
                       {/*</Link>*/}
                    </SwiperSlide>
                    {this.subchild(item.items)}
                 ))}
                 
                
                 
                 
                 
                 
            
            </Swiper>

            )}            
            </>

        )
    }
    componentDidMount() {
       console.log(2);
    }
}

export default CategorySwiperSlide;