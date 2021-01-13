import React from 'react';
import { Device, Request, Support } from 'framework7';



class HBApi extends React.Component{
    constructor(props) {
        super(props);
        window.HBApi = this;
        this.ApiUrl='https://www.hotbargainsstore.com/api/';
      
    }
    Post(EndPoint,Data){
        const requestOptions = {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(Data) // body data type must match "Content-Type" header
          }
        
        
        return fetch(  this.ApiUrl+EndPoint , requestOptions)
        
            .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                
                    
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    
                    console.log(error);
                    
                    return Promise.reject(error);
                }

                  return Promise.resolve(data);
            })
            .catch(error => {   
                return { "success": 0, "error":error};
            });
    
    }
    Get(EndPoint){
        const requestOptions = {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          }
        
        
        return fetch( this.ApiUrl+EndPoint , requestOptions)
            .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                return Promise.resolve(data);
               
            })
            .catch(error => {
               return {"success": 0 , "error":error};
            });
    
    }
    render(){
        return;
    }
    componentDidMount() {
        this.$f7ready(() => {
         
          
        })
    }
};

export default HBApi;
    
    