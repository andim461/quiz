import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import questionsStore from "../store/questionsStore";
import statisticStore from "../store/statisticStore";
import { observer } from "mobx-react-lite";

const useStyles = makeStyles({
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "4px 4px 4px 2px rgba(0, 0, 0, 0.2)",
  },
  cardHead: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  answers: {
    display: "flex",
    flexDirection: "row",
  },
});

const QuestionCard = observer(() => {
  const classes = useStyles();
  const questionData = questionsStore.getCurrentQuestion();

  const onAnswer = (answer: string) => {
    questionsStore.setAnswer(answer);
    if (questionsStore.questions) {
      if (answer === questionData.correct_answer) {
        statisticStore.incrementDifficult(questionData.difficulty);
      }
    }
  };

  return (
    <Card className={classes.card} variant="outlined">
      <CardContent>
        <div className={classes.cardHead}>
          <Typography color="textSecondary" gutterBottom>
            {questionsStore.currentIndex + 1}/15
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            {questionData.difficulty}
          </Typography>
        </div>
        <Typography
          variant="h5"
          component="h2"
          dangerouslySetInnerHTML={{
            __html: questionData.question,
          }}
        ></Typography>
      </CardContent>
      <CardActions>
        {questionData.answers.map((answer, index) => {
          let color = "#FFF";
          if (questionsStore.currentAnswer) {
            if (answer === questionData.correct_answer) {
              color = "rgba(0, 255, 0, 0.45)";
            } else if (questionsStore.currentAnswer === answer) {
              color = "rgba(255, 0, 0, 0.45)";
            }
          }
          return (
            <Button
              size="small"
              variant="outlined"
              key={answer}
              style={{ background: color, color: "#000" }}
              disabled={!!questionsStore.currentAnswer}
              onClick={() => {
                onAnswer(answer);
              }}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }}></span>
            </Button>
          );
        })}
      </CardActions>
    </Card>
  );
});
export default QuestionCard;
