import React,{useState, useEffect } from 'react';
import { Page,View, Navbar ,LoginScreen,LoginScreenTitle,List,ListInput,ListButton,Block,Button,BlockTitle,BlockHeader,BlockFooter,useStore } from 'framework7-react';
import store from '../js/store';
import HBApi from '../components/api';
import ReactHtmlParser, {
	processNodes,
	convertNodeToElement,
	htmlparser2,
} from "react-html-parser";

const LoginPage = (props) => {
    

    const { f7route, f7router,from,next,superfrom } = props;
    const user = useStore("user");
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    var Api= new HBApi();
    

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
    const switchForm=(switchto)=>{
    
        if (switchto=="login")
            {
                
                f7router.app.loginScreen.close("#my-signup-screen",false);
                f7router.app.loginScreen.open("#my-login-screen",false);
            }
        else
            {
                
                f7router.app.loginScreen.close("#my-login-screen",false);
                f7router.app.loginScreen.open("#my-signup-screen",false);
            }
    
    }
    
    
    const cartProceedNext=()=>{
        
        console.log(next);
        f7router.app.loginScreen.close("#my-login-screen");
        f7router.app.loginScreen.close("#my-signup-screen");
        f7router.navigate("/"+next+"/",{history:false , browserHistory:false});

    }
    
    const closeLoginSignup=()=>{
    
        f7router.app.loginScreen.close("#my-login-screen",false);
        f7router.app.loginScreen.close("#my-signup-screen",false);
       
        
        
    }
    
    const log=()=>{
     console.log(from);
    console.log(superfrom);
    }
    const openLoginSignup=()=>{
    
        
        f7router.app.loginScreen.open("#my-login-screen",false);

    }
    
   
    const signUP= async ()=>{
        if (f7router.app.input.validateInputs("#sign-up-form")){
        
            f7router.app.preloader.show();
           
            var result= await Api.Post('users',{"name":name,"email":email,"username":username,"password":password});
            
            if (result.success){
            
               store.dispatch("setUser", result.data.user);
               cartProceedNext();
            }
            else{
                
                showToastCenter(result.error);
            }
            f7router.app.preloader.hide();
        }
    }
    const logIn= async ()=>{
        if (f7router.app.input.validateInputs("#log-in-form")){
        
            f7router.app.preloader.show();
           
            var result= await Api.Post('users/login',{"username":username,"password":password});
            
            if (result.success){
            
               store.dispatch("setUser", result.data.user);
               cartProceedNext();
            }
            else{
                
                showToastCenter(result.error);
            }
            f7router.app.preloader.hide();
        }
    }

return (
    <Page name="login" onPageBeforeOut={closeLoginSignup} onPageAfterIn={openLoginSignup} onPageMounted={log} onPageReinit={log} onPageInit={log} loginScreen>
        <Navbar title={from=="cart"?"Checkout":"Login & Signup"} backLink="Back" />
        
        
        
        <LoginScreen id="my-login-screen">
        <View>
          <Page loginScreen>
            <Navbar title={from=="cart"?"Checkout":"Login"} backLink="Back" onBackClick={closeLoginSignup} />
            <LoginScreenTitle>Login</LoginScreenTitle>
            <List form id="log-in-form">
              <ListInput
                type="text"
                name="username"
                placeholder="Your username"
                value={username}
                onInput={(e) => setUsername(e.target.value)}
              ></ListInput>
              <ListInput
                type="password"
                name="password"
                placeholder="Your password"
                value={password}
                onInput={(e) => setPassword(e.target.value)}
              ></ListInput>
            </List>
            <List>
              <ListButton fill raised title="Sign In" onClick={() => logIn()} />
              <BlockFooter>
                  <Block>
                    <Button fill raised onClick={() => switchForm('signup')}>Create An Account</Button>
                  </Block>
                  
                  {from=="cart" &&(
                  <Block>
                    <Button fill raised onClick={() => cartProceedNext()} >Continue As Guest</Button>
                  </Block>
                  )}
              </BlockFooter>
            </List>
          </Page>
        </View>
      </LoginScreen>
      
      <LoginScreen id="my-signup-screen">
        <View>
          <Page loginScreen>
            <Navbar title={from=="cart"?"Checkout":"Signup"} backLink="Back" onBackClick={closeLoginSignup} />
            <LoginScreenTitle>Signup</LoginScreenTitle>
            <List form id="sign-up-form">
              <ListInput
                type="text"
                name="name"
                placeholder="Your Name"
                value={name}
                onInput={(e) => setName(e.target.value)}
              required></ListInput>
              <ListInput
                type="email"
                name="name"
                placeholder="Your Email"
                value={email}
                onInput={(e) => setEmail(e.target.value)}
              required validate></ListInput>
              <ListInput
                type="text"
                name="username"
                placeholder="Your username"
                value={username}
                onInput={(e) => setUsername(e.target.value)}
              required></ListInput>
              <ListInput
                type="password"
                name="password"
                placeholder="Your password"
                value={password}
                onInput={(e) => setPassword(e.target.value)}
              required minlength={8}></ListInput>
            </List>
            <List>
              <ListButton fill raised title="Sign Up" onClick={() => signUP()}/>
              <BlockFooter>
                <Block>
                    <Button fill raised onClick={() => switchForm('login')} >Have An Account</Button>
                </Block>
                 {from=="cart" &&(
                  <Block>
                    <Button fill raised onClick={() => cartProceedNext()} >Continue As Guest</Button>
                  </Block>
                  )}
              </BlockFooter>
            </List>
          </Page>
        </View>
      </LoginScreen>
      {!user && (
    
      <Block>
        <Button fill raised onClick={() => openLoginSignup()} >Login / Signup</Button>
      </Block>
    
    )}
      
    </Page>
);


}
export default LoginPage;