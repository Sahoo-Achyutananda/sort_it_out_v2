import styles from "./Timer.module.css";
import TimerIcon from "@mui/icons-material/Timer";

function Timer({ time }) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return (
    <div className={styles.timer}>
      <TimerIcon fontSize="small" />
      {`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
      )}`}
    </div>
  );
}

export default Timer;
