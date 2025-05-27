import styles from "./Code.module.css";
import { CopyBlock, dracula } from "react-code-blocks";
// import algoInformation from "../Data/data.js";

function Code({ json }) {
  return (
    <div className={styles.code}>
      <CopyBlock
        language="jsx"
        text={json.code}
        showLineNumbers={true}
        theme={dracula}
        wrapLines={true}
        codeBlock
      />
    </div>
  );
}

export default Code;
