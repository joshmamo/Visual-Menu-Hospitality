import React, { Fragment, useState, useEffect, useContext } from "react";
import { MainContext } from "./contexts/MainContext.js";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { loremIpsum } from "lorem-ipsum";
import styled from "styled-components";

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: row;
  width: 95vw;
  border-radius: 1px;
  background-color: white;
  max-height: 25vh;
  flex-wrap: nowrap;
  margin-bottom: 12px;
  overflow: scroll;
  & .MuiButton-label {
    color: #272727;
  }
  & .MuiCardMedia-root {
    height: 25vh;
    width: 25vh;
  }
  & .MuiCardActionArea-root {
    width: 25vh;
  }
  & .MuiCardContent-root {
    flex-direction: column;
    justify-content: flex-start;
    max-height: 25vh;
    padding: 12px 16px;
  }
  & .MuiTypography-root {
  }
  & .MuiCardActions-root {
  }
  & .MuiInputBase-root {
    width: 60vw;
  }
  & .MuiBox-root {
    display: flex;
    position: relative;
    justify-content: space-between;
  }
  .item-title {
    font-size: 1.2rem;
    font-weight: 600;
  }
  .item-price {
    font-size: 1.2rem;
    font-weight: 600;
  }
  .img-input {
    width: 25vw;
  }
`;

export default function MenuItem(props) {
  const { removeMenuItem, updateMenuItem } = useContext(MainContext);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    setTitle(props.title);
    setDescription(props.description);
    setImgSrc(props.imgSrc);
    setPrice(props.price);
    setTags(props.tags);
  }, [props.description, props.title, props.imgSrc, props.price, props.tags]);

  const handleChangeTitle = event => {
    setTitle(event.target.value);
  };

  const handleChangeDescription = event => {
    setDescription(event.target.value);
  };

  const handleChangeImgSrc = event => {
    setImgSrc(event.target.value);
  };

  const handleChangePrice = event => {
    setPrice(event.target.value);
  };

  const handleChangeTags = event => {
    setTags(event.target.value);
  };

  const handleSave = (title, description, imgSrc, price, tags, id) => {
    updateMenuItem(title, description, imgSrc, price, tags, id);
    setEditing(!editing);
  };

  return (
    <Fragment>
      <StyledCard>
        <CardActionArea>
          {editing ? (
            <FormControl variant="outlined">
              <InputLabel htmlFor="component-outlined" />
              <OutlinedInput
                className="img-input"
                multiline
                id="component-outlined"
                value={imgSrc}
                onChange={handleChangeImgSrc}
              />
            </FormControl>
          ) : (
            <CardMedia image={props.imgSrc} title={props.title} />
          )}
        </CardActionArea>
        <CardContent>
          <Typography
            className="item-title"
            gutterBottom
            variant="h5"
            component="h2"
          >
            {editing ? (
              <FormControl variant="outlined">
                <InputLabel htmlFor="component-outlined" />
                <OutlinedInput
                  id="component-outlined"
                  value={title}
                  onChange={handleChangeTitle}
                />
              </FormControl>
            ) : (
              <p onDoubleClick={() => setEditing(!editing)}>{props.title}</p>
            )}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {editing ? (
              <FormControl variant="outlined">
                <InputLabel htmlFor="component-outlined" />
                <OutlinedInput
                  multiline
                  id="component-outlined"
                  value={description}
                  onChange={handleChangeDescription}
                />
              </FormControl>
            ) : (
              <p onDoubleClick={() => setEditing(!editing)}>
                {props.description ? props.description : loremIpsum(2)}
              </p>
            )}
            {/* {loremIpsum(2)} */}
          </Typography>
          <Box>
            <Typography className="item-price" variant="h5" component="h2">
              {editing ? (
                <FormControl variant="outlined">
                  <InputLabel htmlFor="component-outlined" />
                  <OutlinedInput
                    id="component-outlined"
                    value={price}
                    onChange={handleChangePrice}
                  />
                </FormControl>
              ) : (
                <p onDoubleClick={() => setEditing(!editing)}>{props.price}</p>
              )}
            </Typography>
            {editing ? (
              <IconButton
                onClick={() =>
                  handleSave(title, description, imgSrc, price, tags, props.id)
                }
                aria-label="save"
              >
                <SaveIcon />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => setEditing(!editing)}
                aria-label="edit"
              >
                <EditIcon />
              </IconButton>
            )}
            <IconButton
              onClick={() => removeMenuItem(props.id)}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </CardContent>

        {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
      </StyledCard>
    </Fragment>
  );
}
