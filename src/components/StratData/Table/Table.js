import styles from "./Table.module.css";

const Table = (props) => {
    return (
        <table className={`${styles.table} ${props.className}`}>
                    <thead>
                        <tr>
                            <th colSpan="4">{props.tableTitle}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{props.column_1Title}</td>
                            <td>{props.column_2Title}</td>
                            <td>{props.column_3Title}</td>
                            <td>{props.column_4Title}</td>
                        </tr>
                        <tr>
                            <td>{props.column_1Line_1Data}</td>
                            <td>{props.column_2Line_1Data}</td>
                            <td>{props.column_3Line_1Data}</td>
                            <td>{props.column_4Line_1Data}</td>
                        </tr>
                        <tr>
                            <td>{props.column_1Line_2Data}</td>
                            <td>{props.column_2Line_2Data}</td>
                            <td>{props.column_3Line_2Data}</td>
                            <td>{props.column_4Line_2Data}</td>
                        </tr>
                        <tr>
                            <td>{props.column_1Line_3Data}</td>
                            <td>{props.column_2Line_3Data}</td>
                            <td>{props.column_3Line_3Data}</td>
                            <td>{props.column_4Line_3Data}</td>
                        </tr>
                    </tbody>
                </table>
    );
}

export default Table;