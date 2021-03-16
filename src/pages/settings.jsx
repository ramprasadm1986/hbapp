import React from 'react';
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavRight,
  Link,
  List,
  ListInput,
  ListItem,
  Toggle,
  BlockTitle,
  Row,
  Button,
  Range,
  Block,
  Badge,
  Icon,
  Timeline,
  TimelineItem,
  useStore
} from 'framework7-react';

const SettingsPage = (props) => {
 const {f7route, f7router } = props;
 const cartCount = useStore('cartCount');
 const user = useStore('user');
 
 const loginOpen = () => {
		
        if(!user) {
            f7router.app.views.['settings'].router.navigate("/login/", {
                props: {superfrom: true, from: "menu", next: "settings" },
                history:false,
                browserHistory:false
            });
        }
		
	};
 

return (
  <Page name="settings">
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
    
    {!user && (
    
      <Block>
        <Button fill raised onClick={() => loginOpen()} >Login / Signup</Button>
      </Block>
    
    )}
    
    
  </Page>
);
}

export default SettingsPage;
