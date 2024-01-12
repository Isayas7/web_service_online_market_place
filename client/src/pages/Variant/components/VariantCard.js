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
import VariantDelete from "./VariantDelete";
import VariantUpdate from "./VariantUpdate";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

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

export default function VariantCard({ variant, setIsDetail, setSelectedId }) {
  const [expanded, setExpanded] = useState(false);
  // component states
  const [deleteOpen, setdDeleteOpen] = useState(false);
  const [editOpen, setdEditOpen] = useState(false);
  const [variantId, setVariantId] = useState("");

  // toggler funcions
  // funtions open delete modal
  const handleDeleteOpen = () => {
    setdDeleteOpen(true);
  };

  // funtion close delete modal
  const handleDeleteClose = () => {
    setdDeleteOpen(false);
    setVariantId("");
  };

  // delete handler
  const handleDeleteVariant = (id) => {
    handleDeleteOpen();
    setVariantId(id);
  };

  // funtions open edit modal
  const handleEditOpen = () => {
    setdEditOpen(true);
  };

  // funtion close Edit modal
  const handleEditClose = () => {
    setdEditOpen(false);
    setVariantId("");
  };

  // edit handler
  const handleEditVariant = (id) => {
    handleEditOpen();
    setVariantId(id);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // toggle delete modal
  let content = "";
  if (deleteOpen) {
    content = (
      <VariantDelete
        open={deleteOpen}
        handleClose={handleDeleteClose}
        variantId={variantId}
      />
    );
  }
  if (editOpen) {
    content = (
      <VariantUpdate
        open={editOpen}
        handleClose={handleEditClose}
        variantId={variantId}
      />
    );
  }
  const handleDetailClick = (id) => {
    setIsDetail(true);
    setSelectedId(id);
  };

  return (
    <Card className="h-196 w-182">
      <CardHeader
        title={variant.variantName}
        action={
          <>
            <IconButton
              onClick={() => {
                handleEditVariant(variant._id);
              }}
            >
              <EditOutlinedIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                handleDeleteVariant(variant._id);
              }}
            >
              <DeleteForeverOutlinedIcon />
            </IconButton>
          </>
        }
      />

      <CardMedia
        component="img"
        image={variant.images[0].url}
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
        <Link
          onClick={() => {
            handleDetailClick(variant._id);
          }}
        >
          See Detail
        </Link>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto">
        <CardContent
          sx={{
            display: "flex",
            border: "1px solid #c0c5cc",
            borderRadius: "10px",
            m: 1,
          }}
        >
          <Box>
            <Typography paragraph>Name: {variant.variantName}</Typography>
            <Typography paragraph>Size: {variant.sizes.join(", ")}</Typography>
            <Typography paragraph>
              Colors: {variant.colors.join(", ")}
            </Typography>
            <Typography paragraph>Gender: {variant.gender}</Typography>
          </Box>
          <Box sx={{ marginLeft: 5 }}>
            <Typography paragraph>Condition: {variant.condition}</Typography>
            <Typography paragraph>Price: {variant.price}</Typography>
            <Typography paragraph>Amount: {variant.amount}</Typography>
          </Box>
        </CardContent>
      </Collapse>
      {content}
    </Card>
  );
}
