import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import KeyboardArrowRightOutlinedIcon from "@material-ui/icons/KeyboardArrowRightOutlined";
import "./App.css";
import QuestionCard from "./components/QustionCard";
import { getAllQuestions, QuestionAnswer } from "./Api";
import { useEffect } from "react";
import ReactLoading from "react-loading";
import Statistic from "./components/Statistic";
import Statistics from "./interfaces/Statistics";
import ReplayIcon from "@material-ui/icons/Replay";
import { makeStyles } from "@material-ui/styles";

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

function App() {
  const classes = useStyles();
  const NUMBER_OF_QUESTION = 15;
  const [questionNum, setQuestionNum] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<QuestionAnswer[] | null>(null);
  const [isAnswered, setAnswered] = useState<boolean>(false);
  const [answerState, setAnswer] = useState<string | null>(null);
  const [statistics, setStatistics] = useState<Statistics>({
    easy: 0,
    medium: 0,
    hard: 0,
  });

  const prepareQuestions = async () => {
    setLoading(true);
    setQuestionNum(0);
    setStatistics({
      easy: 0,
      medium: 0,
      hard: 0,
    });
    const questions = await getAllQuestions();
    setQuestions(questions);
    setAnswered(false);
    setLoading(false);
  };

  const incrementNum = () => {
    if (questionNum !== NUMBER_OF_QUESTION) {
      setQuestionNum(questionNum + 1);
      setAnswered(false);
      setAnswer(null);
    }
  };

  const onReplay = () => {
    prepareQuestions();
  };

  const onAnswer = (answer: string) => {
    setAnswered(true);
    setAnswer(answer);
    if (questions) {
      const currQuestion = questions[questionNum];
      if (answer === currQuestion.correct_answer) {
        const diff = currQuestion.difficulty;
        const stats = { ...statistics, [diff]: statistics[diff] + 1 };
        setStatistics(stats);
      }
    }
  };

  useEffect(() => {
    prepareQuestions();
  }, []);

  const done = questionNum === 15;

  return (
    <div className={classes.app}>
      <div className={classes.header}>
        <h1 className={classes.text}>Quiz!</h1>
        <h2 className={classes.text}>You have 15 questions to answer.</h2>
      </div>
      <div className={classes.content}>
        {done ? (
          <div className={classes.content}>
            <Statistic stats={statistics} />
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              endIcon={<ReplayIcon />}
              onClick={onReplay}
            >
              Pass Again
            </Button>
          </div>
        ) : isLoading || !questions ? (
          <ReactLoading
            type={"spin"}
            color={"#1565c0"}
            height={100}
            width={100}
          />
        ) : (
          <div className={classes.content}>
            <QuestionCard
              questionInfo={questions[questionNum]}
              questionNum={questionNum}
              onAnswerCallback={onAnswer}
              answer={answerState}
            />
            {isAnswered ? (
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                endIcon={<KeyboardArrowRightOutlinedIcon />}
                onClick={incrementNum}
              >
                Next
              </Button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
