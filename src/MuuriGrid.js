import React, { useState, useContext } from "react";
import { MainContext } from "./contexts/MainContext.js";
import MenuItem from "./MenuItem.js";
/* Muuri-react */
import { MuuriComponent } from "muuri-react";
/* Utils & components */
import { useFilter, generateItems, layoutOptions } from "./MuuriUtils";
import {
  Select,
  Header,
  Footer,
  Button,
  Input,
  Demo
} from "./MuuriHelperComponents";
/* Style */
import "./style.css";

// App.
const MuuriGrid = () => {
  const { menuItems, setMenuitems } = useContext(MainContext);

  // Items state.
  const [items, setItems] = useState(generateItems());

  // Return one of the values of the array.
  function oneOf(array) {
    return array[Math.floor(Math.random() * Math.floor(array.length))];
  }

  let uuid = 33;
  function generateItem() {
    const items = [];
    for (let i = 0; i < 6; i++) {
      const color = oneOf(["red", "green", "blue"]);
      const width = 2;
      const height = 0;

      const alphabet = "abcdefghijklmnopqrstuvwxyz";
      const title = oneOf(alphabet) + oneOf(alphabet);
      const id = uuid++;

      setItems([...items, { id, color, width, height, title }]);
    }
    return items;
  }

  // Sort state.
  const [sort, setSort] = useState({
    value: "title",
    options: { descending: false }
  });

  // Filter state.
  const [filter, setFilter] = useState({
    search: "",
    value: "all"
  });

  // Filter method.
  const filterFunction = useFilter(filter.value, filter.search);

  // Children.
  const children = menuItems.map(({ id, title, width, height }) => (
    <MenuItem
      key={id}
      id={id}
      title={title}
      width={2}
      height={0}
      remove={() => setItems(items.filter(item => item.id !== id))}
    />
  ));

  return (
    <Demo>
      {/* Header */}
      <Header>
        <Input
          actionClass={"search"}
          icon={"&#xE8B6;"}
          onKeyUp={e => setFilter({ ...filter, search: e.target.value })}
        />
        <Select
          actionClass={"filter"}
          values={["All", "Red", "Blue", "Green"]}
          icon={"&#xE152;"}
          onChange={e => setFilter({ ...filter, value: e.target.value })}
        />
        <Select
          actionClass={"sort"}
          values={["Title", "Color", "Id"]}
          icon={"&#xE164;"}
          onChange={e => setSort({ ...sort, value: e.target.value })}
        />
      </Header>
      {/* Content */}
      <MuuriComponent
        {...layoutOptions}
        propsToData={({ color, title, id }) => ({ color, title, id })}
        filter={filterFunction}
        sort={sort.value}
        sortOptions={sort.options}
      >
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
      </MuuriComponent>
      {/* Footer */}
      <Footer>
        <Button
          text={"Add more items"}
          icon={"&#xE145;"}
          onClick={
            () => generateItem()
            // setItems(Array.prototype.concat(items, generateItems()))
          }
        />
      </Footer>
    </Demo>
  );
};

// Item component.
const Item = ({ id, color, width, height, title, remove }) => {
  return (
    <div className={`item h${height} w${width} ${color}`}>
      <div className="item-content">
        <div className="card">
          <div className="card-title">
            {title} - id:{id}
          </div>
          <div className="card-remove">
            <i className="material-icons" onMouseDown={remove}>
              &#xE5CD;
            </i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MuuriGrid;
