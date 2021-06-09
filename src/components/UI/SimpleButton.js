import styles from "./SimpleButton.module.css";

const SimpleButton = (props) => {
    return(
        <button className={`${styles.button} ${props.className}`} onClick={props.onClick} >{props.children}</button>
    );
}

export default SimpleButton;