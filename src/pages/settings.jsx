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
  useStore
} from 'framework7-react';

const SettingsPage = () => {

 const cartCount = useStore('cartCount');

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

    Hello
  </Page>
);
}

export default SettingsPage;
