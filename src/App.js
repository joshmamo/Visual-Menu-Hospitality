/*
I would like to limit the complexity of this app and see how quickly I can launch it:
   - Limit routes to 2 or 3, just Login/Signup, Account and Menu
      
   Todo:
   -Setup Grid (Draggable grid items)
   -Editor Mode Toggle
   -Implement tags and categories (add, remove and modify categories, tags and filters)
   -Menu (Drawer)
   -Settings - Colors, name, url, font-family, border radius, show/hide certain elements (this may be the same modal as account setup)
   -Upload image (modal)
   -Setup Firebase and Firestore
   -Add Auth
   
   Pages:
   -Landing Page
   -Signup/Login
   -Initial Account Setup/Editor (a modal that runs over the menu page - menu populated 
    with template cards to start)
   -Menu

   Ideas:
   -Could I offer this product, or entire website building services to hospitality venues
   for free or at a very low rate, in exchange for some kind of partnership, collaboration
   or exclusive offerings to offer through our travel app and other services.
   Could we leverage the fact that we own or build these sites to push trafic to our products?
   Perhaps it is simply by adding a link, or a "as featured on" badge or section to thier homepage.
   */

import React, { useContext } from "react";
import { MainContext } from "./contexts/MainContext.js";
import "./styles.css";
import MenuItem from "./MenuItem";
import AddButton from "./AddButton";
import styled from "styled-components";
import { Box, List } from "@material-ui/core";

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function App() {
  const { menuItems, setMenuitems } = useContext(MainContext);

  return (
    <StyledBox>
      <div className="App">
        <h1>Visual Menu</h1>
      </div>
      <List>
        {menuItems.map(menuItem => {
          return (
            <MenuItem
              title={menuItem.title}
              description={menuItem.description}
              imgSrc={menuItem.imgSrc}
              price={menuItem.price}
              tags={menuItem.tags}
              id={menuItem.id}
            />
          );
        })}
      </List>
      {/* <MenuItem title="Kimchi Toastie" description="" image="" price="$15.00" /> */}
      <AddButton />
    </StyledBox>
  );
}
