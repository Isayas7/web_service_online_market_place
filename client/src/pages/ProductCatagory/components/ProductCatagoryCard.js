import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ProductCatagoryDelete from "./ProductCatagoryDelete";
import ProductCatagoryUpdate from "./ProductCatagoryUpdate";
import { Link } from "react-router-dom";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ProductCatagoryCard({ productCatagory }) {
  const [expanded, setExpanded] = useState(false);
  // component states
  const [deleteOpen, setdDeleteOpen] = useState(false);
  const [editOpen, setdEditOpen] = useState(false);
  const [productCatagoryId, setProductCatagoryId] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const path = "http://localhost:3000/productCatagory";
  const currentUrl = window.location.href;

  // toggler funcions
  // funtions open delete modal
  const handleDeleteOpen = () => {
    setdDeleteOpen(true);
  };

  // funtion close delete modal
  const handleDeleteClose = () => {
    setdDeleteOpen(false);
    setProductCatagoryId("");
  };

  // delete handler
  const handleDeleteProductCatagory = (id) => {
    handleDeleteOpen();
    setProductCatagoryId(id);
  };

  // funtions open edit modal
  const handleEditOpen = () => {
    setdEditOpen(true);
  };

  // funtion close Edit modal
  const handleEditClose = () => {
    setdEditOpen(false);
    setProductCatagoryId("");
  };

  // edit handler
  const handleEditProductCatagory = (id) => {
    handleEditOpen();
    setProductCatagoryId(id);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // toggle delete modal
  let content = "";
  if (deleteOpen) {
    content = (
      <ProductCatagoryDelete
        open={deleteOpen}
        handleClose={handleDeleteClose}
        productCatagoryId={productCatagoryId}
      />
    );
  }
  if (editOpen) {
    content = (
      <ProductCatagoryUpdate
        open={editOpen}
        handleClose={handleEditClose}
        productCatagoryId={productCatagoryId}
      />
    );
  }
  const handleCatagoryClick = (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    user.productCatagory = id;
    localStorage.setItem("user", JSON.stringify(user));
  };

  return (
    <Card className="h-96 w-182">
      <CardHeader
        key={productCatagory._id}
        title={productCatagory.productCatagoryName}
        action={
          <>
            <IconButton
              onClick={() => {
                handleEditProductCatagory(productCatagory._id);
              }}
            >
              <EditOutlinedIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                handleDeleteProductCatagory(productCatagory._id);
              }}
            >
              <DeleteForeverOutlinedIcon />
            </IconButton>
          </>
        }
      />
      {content}
      <CardMedia
        component="img"
        image={productCatagory.image.url}
        alt="Paella dish"
        className="h-64 w-64"
        sx={{
          objectFit: "contain",
          transition: "transform 0.2s",
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      />
      <CardActions disableSpacing>
        {(((user.role === "admin" || user.role === "super") &&
          currentUrl !== path) ||
          user.role === "sm") && (
          <Link
            onClick={() => {
              handleCatagoryClick(productCatagory._id);
            }}
            to={`:${productCatagory.productCatagoryName}`}
          >
            See more {productCatagory.productCatagoryName}
          </Link>
        )}

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {productCatagory.productCatagoryName}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
