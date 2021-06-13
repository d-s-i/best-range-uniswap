import styles from "./DisplayError.module.css";
import Card from "../Card/Card";
import SimpleParagraph from "./SimpleParagraph";
import SimpleButton from "./SimpleButton";

const DisplayError = (props) => {
    return (
        <Card className={styles.error} >
            <SimpleParagraph mainText={props.error} />
            <SimpleButton className={styles["button-clear"]} onClick={props.onDeleteError} >Ok</SimpleButton>
        </Card>
    );
}

export default DisplayError;