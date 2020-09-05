import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import image from "../../images/SingaporeTime.jpg";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    maxWidth: 360
  },
  media: {
    height: 140
  }
});

export default function CardDate(props) {
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
          Singapore
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <b>Date:</b>{" "}
          {new Date()
            .toJSON()
            .slice(0, 10)
            .replace(/-/g, "/")}
          <br />
          <b>Time: </b>
          <Clock />
        </Typography>
      </CardContent>
    </Card>
  );
}

function Clock(props) {
  const [date, setDate] = useState(new Date());

  //Replaces componentDidMount and componentWillUnmount
  useEffect(() => {
    var timerID = setInterval(() => tick(), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function tick() {
    setDate(new Date());
  }

  return <span>{date.toLocaleTimeString()}</span>;
}
