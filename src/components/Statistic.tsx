import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import statisticStore from "../store/statisticStore";

const useStyles = makeStyles({
  stats: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  diff: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  card: {
    minWidth: 300,
    minHeight: 150,
    boxShadow: "4px 4px 4px 2px rgba(0, 0, 0, 0.2)",
  },
  title: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 20,
  },
});

const Statistic = () => {
  const classes = useStyles();
  return (
    <Card className={classes.card} variant="outlined">
      <CardContent>
        <Typography className={classes.title} variant="h5" component="h2">
          Your statistic:
        </Typography>
        <div className={classes.stats}>
          <div className={classes.diff}>
            <Typography gutterBottom>Easy</Typography>
            <Typography color="textSecondary" gutterBottom>
              {statisticStore.stats.easy}/5
            </Typography>
          </div>
          <div className={classes.diff}>
            <Typography gutterBottom>Medium</Typography>
            <Typography color="textSecondary" gutterBottom>
              {statisticStore.stats.medium}/5
            </Typography>
          </div>
          <div className={classes.diff}>
            <Typography gutterBottom>Hard</Typography>
            <Typography color="textSecondary" gutterBottom>
              {statisticStore.stats.hard}/5
            </Typography>
          </div>
        </div>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};

export default Statistic;
