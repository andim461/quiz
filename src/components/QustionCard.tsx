import React from "react";
import { QuestionAnswer } from "../Api";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";

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

interface CardProps {
  questionInfo: QuestionAnswer;
  questionNum: number;
  onAnswerCallback: (answer: string) => void;
  answer: string | null;
}
const QuestionCard = (props: CardProps) => {
  const classes = useStyles();
  const onAnswer = (answer: string) => {
    props.onAnswerCallback(answer);
  };

  return (
    <Card className={classes.card} variant="outlined">
      <CardContent>
        <div className={classes.cardHead}>
          <Typography color="textSecondary" gutterBottom>
            {props.questionNum + 1}/15
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            {props.questionInfo.difficulty}
          </Typography>
        </div>
        <Typography
          variant="h5"
          component="h2"
          dangerouslySetInnerHTML={{ __html: props.questionInfo.question }}
        ></Typography>
      </CardContent>
      <CardActions>
        {props.questionInfo.answers.map((answer, index) => {
          let color = "#FFF";
          if (props.answer) {
            if (answer === props.questionInfo.correct_answer) {
              color = "rgba(0, 255, 0, 0.45)";
            } else if (props.answer === answer) {
              color = "rgba(255, 0, 0, 0.45)";
            }
          }
          return (
            <Button
              size="small"
              variant="outlined"
              key={answer}
              style={{ background: color, color: "#000" }}
              disabled={!!props.answer}
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
};
export default QuestionCard;
