import styles from "./BackgroundVideo.module.css";

function BackgroundVideo({ children }) {
  return (
    <>
      <div className={styles.backgroundVideo}>
        <video autoPlay loop muted playsInline className={styles.video}>
          <source src="/SORT_IT_OUT.mp4" type="video/mp4" />
        </video>
        <div className={styles.overlay}>{children}</div>
      </div>
    </>
  );
}

export default BackgroundVideo;
