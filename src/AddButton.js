import React, { useContext } from "react";
import { MainContext } from "./contexts/MainContext.js";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import styled from "styled-components";

const StyledFab = styled(Fab)`
  position: relative;
  background-color: #272727;
  color: white;
  opacity: 1;
  margin: 12px;
  z-index: 3;
  transition: all 0.2s;
  :hover {
    background-color: #272727;
    opacity: 0.9;
  }
`;

const AddButton = () => {
  const { addMenuItem } = useContext(MainContext);

  return (
    <Tooltip title="Add Menu Item" aria-label="add">
      <StyledFab
        color="secondary"
        aria-label="add"
        className="{classes.fabButton}"
        onClick={() => {
          addMenuItem("title", "description", "imgSrc", "price", "");
        }}
      >
        <AddIcon />
      </StyledFab>
    </Tooltip>
  );
};

export default AddButton;
