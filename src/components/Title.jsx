import styles from "./Title.module.css";

function Title({ title }) {
  return <div className={styles.title}>{title}</div>;
}

export default Title;
