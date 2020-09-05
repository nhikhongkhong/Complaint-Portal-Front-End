import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
//import CardActionArea from "@material-ui/core/CardActionArea";
//import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
//import Button from "@material-ui/core/Button";
import image from "../../images/Murdoch3.jpg";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    maxWidth: 360
  },
  media: {
    height: 140
  }
});

export default function CardWelcome(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={image}
        title="Murdoch Complaint Portal Dashboard"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="h2">
          Welcome {props.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <b>Email</b>: {props.user} <br /> <b>Role:</b> {props.role}
        </Typography>
      </CardContent>
    </Card>
  );
}
