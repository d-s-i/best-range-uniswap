import styles from "./Table.module.css";

const Table = (props) => {
    return (
        <table className={`${styles.table} ${props.className}`} >
                    <thead>
                        <tr>
                            <th colSpan={props.colSpan} className={styles[`${props.classNameThead}`]} >{props.tableTitle}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={styles[`${props.classNameTd}`]}>{props.column_1Title}</td>
                            <td className={styles[`${props.classNameTd}`]}>{props.column_2Title}</td>
                            <td className={styles[`${props.classNameTd}`]}>{props.column_3Title}</td>
                            <td className={styles[`${props.classNameTd}`]}>{props.column_4Title}</td>
                        </tr>
                        <tr>
                            <td className={styles[`${props.classNameTd}`]}>{props.column_1Line_1Data}</td>
                            <td className={styles[`${props.classNameTd}`]}>{props.column_2Line_1Data}</td>
                            <td className={styles[`${props.classNameTd}`]}>{props.column_3Line_1Data}</td>
                            <td className={styles[`${props.classNameTd}`]}>{props.column_4Line_1Data}</td>
                        </tr>
                        <tr>
                            <td className={styles[`${props.classNameTd}`]}>{props.column_1Line_2Data}</td>
                            <td className={styles[`${props.classNameTd}`]}>{props.column_2Line_2Data}</td>
                            <td className={styles[`${props.classNameTd}`]}>{props.column_3Line_2Data}</td>
                            <td className={styles[`${props.classNameTd}`]}>{props.column_4Line_2Data}</td>
                        </tr>
                        <tr>
                            <td className={styles[`${props.classNameTd}`]}>{props.column_1Line_3Data}</td>
                            <td className={styles[`${props.classNameTd}`]}>{props.column_2Line_3Data}</td>
                            <td className={styles[`${props.classNameTd}`]}>{props.column_3Line_3Data}</td>
                            <td className={styles[`${props.classNameTd}`]}>{props.column_4Line_3Data}</td>
                        </tr>
                    </tbody>
                </table>
    );
}

export default Table;