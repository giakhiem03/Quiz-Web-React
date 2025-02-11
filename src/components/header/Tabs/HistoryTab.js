import { useEffect, useState } from "react";
import { getHistory } from "../../../services/apiServices";
import moment from "moment";

function HistoryTab() {
    const [dataHistory, setDataHistory] = useState([]);

    useEffect(() => {
        getHistory()
            .then((res) => {
                if (res && res.EC === 0) {
                    console.log(res);
                    setDataHistory(res.DT.data);
                } else {
                    console.log(res);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <table className="table table-dark table table-hover table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Quiz Name</th>
                        <th scope="col">Total Question</th>
                        <th scope="col">Total Correct</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {dataHistory &&
                        dataHistory.length > 0 &&
                        dataHistory.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.quizHistory.name}</td>
                                <td>{item.total_questions}</td>
                                <td>{item.total_correct}</td>

                                <td>
                                    {moment(item.createdAt)
                                        .utc()
                                        .format("DD-MM-YYYY hh:mm:ss A")}
                                </td>
                            </tr>
                        ))}
                    {dataHistory && dataHistory.length === 0 && (
                        <tr>
                            <td colSpan={"5"}>Not found data</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}

export default HistoryTab;
