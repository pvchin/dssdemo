import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import { Box} from "@chakra-ui/react"

const CardLayout3 = ({ title, children, handleClick }) => {
  const classes = useStyles();

  return (
    <Box maxW="sm" borderColor="blue.500" borderWidth="1px" borderRadius="lg" overflow="hidden">
      {children}
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "500",
  },
  card: {
    margin: "15px 10px",
    padding: 0,
    border: "solid 1px black",
    borderRadius: "16px",
    backgroundColor: "dark",
  },
  small: {
    gridRowEnd: "span 26",
  },
  medium: {
    gridRowEnd: "span 33",
  },
  large: {
    gridRowEnd: "span 45",
  },
}));

export default CardLayout3;
