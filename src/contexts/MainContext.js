import React, { createContext, useState, useEffect } from "react";
import uuid from "uuid/v1";

export const MainContext = createContext();

const MainContextProvider = props => {
  const [menuItems, setMenuItems] = useState([
    {
      title: "Spag Bol",
      description:
        "Bolognese sauce is a meat-based sauce in Italian cuisine, typical of the city of Bologna. It is customarily used to dress tagliatelle al ragù and to prepare lasagne alla bolognese. ",
      imgSrc:
        "https://www.recipetineats.com/wp-content/uploads/2018/07/Spaghetti-Bolognese.jpg",
      price: "16",
      tags: "yum",
      id: "0"
    },
    {
      title: "Kimchi Toast",
      description: "",
      imgSrc:
        "https://static01.nyt.com/images/2018/12/28/dining/as-kimchi-grilled-cheese/as-kimchi-grilled-cheese-articleLarge.jpg",
      price: "17",
      tags: "yum",
      id: "1"
    },
    {
      title: "Spag Bol 3",
      description:
        "Bolognese sauce is a meat-based sauce in Italian cuisine, typical of the city of Bologna. It is customarily used to dress tagliatelle al ragù and to prepare lasagne alla bolognese. ",
      imgSrc:
        "https://www.recipetineats.com/wp-content/uploads/2018/07/Spaghetti-Bolognese.jpg",
      price: "18",
      tags: "yum",
      id: "2"
    }
  ]); //notes only visible when expense item is clicked/opened

  const addMenuItem = (title, description, imgSrc, price, tags) => {
    setMenuItems([
      ...menuItems,
      { title, description, imgSrc, price, tags, id: uuid() }
    ]);
  };

  const removeMenuItem = id => {
    setMenuItems(menuItems.filter(menuItem => menuItem.id !== id));
  };

  const updateMenuItem = (title, description, imgSrc, price, tags, id) => {
    //find the index of object from array that you want to update
    const objIndex = menuItems.findIndex(obj => obj.id === id);

    // make new object of updated object.
    const updatedObj = {
      ...menuItems[objIndex],
      title: title,
      description: description,
      imgSrc: imgSrc,
      price: price,
      tags: tags
    };

    // make final new array of objects by combining updated object.
    const updatedProjects = [
      ...menuItems.slice(0, objIndex),
      updatedObj,
      ...menuItems.slice(objIndex + 1)
    ];

    console.log("original data=", menuItems);
    console.log("updated data=", updatedProjects);
    setMenuItems(updatedProjects);
  };

  return (
    <MainContext.Provider
      value={{
        menuItems,
        setMenuItems,
        addMenuItem,
        removeMenuItem,
        updateMenuItem
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
