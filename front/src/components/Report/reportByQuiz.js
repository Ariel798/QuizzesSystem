import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Quiz } from "../../models/quiz";
import { QuizzesService } from "../../services/quizzesService";
import { StudentQuizService } from "../../services/studentQuizService";
import { SubmittedQuizService } from "../../services/submittedQuizService";




export function ReportByQuiz() {
    // const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const quizzesService = QuizzesService();
    const studentQuizService = StudentQuizService();
    const submittedQuizService = SubmittedQuizService();

    const [dataQuiz, setDataQuiz] = useState([Quiz]);
    const [options, setOptions] = useState()



    // const onNextStep = () => {
    //     setStep(step + 1);
    // };
    // const onPrevStep = () => setStep((pre) => pre - 1);


    useEffect(() => {
        quizzesService.getQuizzes().then((resList) => {
            setDataQuiz((pre) => {
                pre = [...resList];
                return pre;
            });
        });
    }, []);

    return (
        <div>
            <div>
                <div className="topnav">
                    <button className="btnNav" onClick={() => navigate("../")}>Home</button>
                </div>
                select test:
                <div>
                    <select onChange={(e) => setOptions(e.target.value)}>
                        <option defaultValue="" disabled>
                            Select one
                        </option>
                        {dataQuiz.map((item, key) => {
                            return (
                                <option key={key} >{item.name}</option>
                            );
                        })}
                    </select>
                    <div>
                        <span>test select:<h1>{options}</h1></span>
                    </div>
                </div>

                <div>
                    Date Range:
                    from: <input type="date" style={{ width: "170px" }}></input>
                    to: <input type="date" style={{ width: "170px" }}></input>
                </div>
                or < div >
                    <input type="checkbox"></input> any date in the past
                </div >
                <button
                    style={{ marginTop: "30px" }}
                    type="button"
                    className="button"
                // onClick={onNextStep}
                >
                    Next
                </button>
            </div>
        </div>
    );
}