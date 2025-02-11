import "./DashBoard.scss";
import {
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
} from "recharts";
import { getOverview } from "../../../services/apiServices";
import { useEffect, useState } from "react";

function DashBoard() {
    const [dataOverview, setDataOverview] = useState([]);
    const [dataChart, setDataChart] = useState([]);

    useEffect(() => {
        fetchDataOverview();
    }, []);

    const fetchDataOverview = () => {
        getOverview()
            .then((res) => {
                if (res && res.EC === 0) {
                    setDataOverview(res.DT);
                    console.log(res);
                    let Qz,
                        Qs,
                        As,
                        Us = 0;
                    Us = res?.DT?.users?.total ?? 0;
                    Qz = res?.DT?.others?.countQuiz ?? 0;
                    Qs = res?.DT?.others?.countQuestions ?? 0;
                    As = res?.DT?.others?.countAnswers ?? 0;
                    let data = [
                        {
                            name: "Users",
                            Us: Us,
                        },
                        {
                            name: "Quizzes",
                            Qz: Qz,
                        },
                        {
                            name: "Questions",
                            Qs: Qs,
                        },
                        {
                            name: "Answers",
                            As: As,
                        },
                    ];
                    setDataChart(data);
                } else {
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="dashboard-container">
            <div className="title">Analytics Dashboard</div>
            <div className="content">
                <div className="c-left">
                    <div className="child">
                        <span className="text-1">Total users</span>
                        <span className="text-2">
                            {dataOverview && dataOverview.users
                                ? dataOverview.users.total
                                : "0"}
                        </span>
                    </div>
                    <div className="child">
                        <span className="text-1">Total Quiz</span>
                        <span className="text-2">
                            {dataOverview && dataOverview.users
                                ? dataOverview.others.countQuiz
                                : "0"}
                        </span>
                    </div>
                    <div className="child">
                        <span className="text-1">Total Questions</span>
                        <span className="text-2">
                            {dataOverview && dataOverview.users
                                ? dataOverview.others.countQuestions
                                : "0"}
                        </span>
                    </div>
                    <div className="child">
                        <span className="text-1">Total Answers</span>
                        <span className="text-2">
                            {dataOverview && dataOverview.users
                                ? dataOverview.others.countAnswers
                                : "0"}
                        </span>
                    </div>
                </div>
                <div className="c-right">
                    <ResponsiveContainer width="95%" height="100%">
                        <BarChart data={dataChart}>
                            {/* <CartesianGrid strokeDasharray="3 3" /> */}
                            <XAxis dataKey="name" />
                            {/* <YAxis /> */}
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Us" fill="#2596ff" />
                            <Bar dataKey="Qz" fill="#8884d8" />
                            <Bar dataKey="Qs" fill="#82ca9d" />
                            <Bar dataKey="As" fill="#fcb12a" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default DashBoard;
