import React from "react"; //, { useState, useEffect } 
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
//import CardMedia from "@material-ui/core/CardMedia";
//import image from "../../images/support.jpg";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    maxWidth: 360
  },
  media: {
    height: 140
  }
});

export default function CardStatistic(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      {/* <CardMedia
        className={classes.media}
        image={image}
        title="Overview"
      /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="h5">
          Overview
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <b>
            <span style={{ fontSize: 30, color: "blue" }}>
              {props.total}
            </span>{" "}
            total ticket(s)
          <br />
            <span style={{ fontSize: 30, color: "gray" }}>{props.finished}</span>{" "}
            ticket(s) pending review
            <br />
            <span style={{ fontSize: 30, color: "green" }}>{props.closed}</span>{" "}
            ticket(s) closed
           {/* as{" "}
          {parseFloat((props.finished * 100) / props.total).toFixed(2)} % */}
            <br />
            <span style={{ fontSize: 30, color: "red" }}>{props.invalid}</span>{" "}
            invalid ticket(s)
          {/* as{" "}
          {parseFloat((props.invalid * 100) / props.total).toFixed(2)} % */}
          </b>
        </Typography>
      </CardContent>
    </Card>
  );
}
