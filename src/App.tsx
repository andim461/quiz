import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import KeyboardArrowRightOutlinedIcon from "@material-ui/icons/KeyboardArrowRightOutlined";
import QuestionCard from "./components/QustionCard";
import { getAllQuestions } from "./Api";
import { useEffect } from "react";
import ReactLoading from "react-loading";
import Statistic from "./components/Statistic";
import ReplayIcon from "@material-ui/icons/Replay";
import { makeStyles } from "@material-ui/styles";
import { observer } from "mobx-react-lite";
import statisticStore from "./store/statisticStore";
import questionsStore from "./store/questionsStore";

const useStyles = makeStyles({
  app: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 50,
  },
  text: {
    color: "white",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    marginTop: 20,
  },
});

const App = observer(() => {
  const classes = useStyles();
  const NUMBER_OF_QUESTION = 15;
  const [isLoading, setLoading] = useState<boolean>(true);

  const prepareQuestions = async () => {
    setLoading(true);
    questionsStore.toInitial();
    questionsStore.setMaxIndex(NUMBER_OF_QUESTION);
    statisticStore.toInitial();
    const questions = await getAllQuestions();
    questionsStore.setQuestions(questions);
    setLoading(false);
  };

  useEffect(() => {
    prepareQuestions();
  }, []);

  return (
    <div className={classes.app}>
      <div className={classes.header}>
        <h1 className={classes.text}>Quiz!</h1>
        <h2 className={classes.text}>You have 15 questions to answer.</h2>
      </div>
      <div className={classes.content}>
        {questionsStore.currentIndex === NUMBER_OF_QUESTION ? (
          <div className={classes.content}>
            <Statistic />
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              endIcon={<ReplayIcon />}
              onClick={prepareQuestions}
            >
              Pass Again
            </Button>
          </div>
        ) : isLoading || !questionsStore.questions ? (
          <ReactLoading
            type={"spin"}
            color={"#1565c0"}
            height={100}
            width={100}
          />
        ) : (
          <div className={classes.content}>
            <QuestionCard />
            {questionsStore.currentAnswer !== null ? (
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                endIcon={<KeyboardArrowRightOutlinedIcon />}
                onClick={questionsStore.incrementIndex}
              >
                Next
              </Button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
});

export default App;
