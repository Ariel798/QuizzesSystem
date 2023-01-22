import React, { useEffect, useState } from "react";
import { QuestionService } from "../../services/questionsService";
import { useNavigate, useParams } from "react-router-dom";

export function EditQuestionPage(props) {

    //use state
    const [question, setQuestion] = useState({});
    const service = QuestionService();
    let { id } = useParams();

    // _id, number, subject, body, answers, correctAnswer, quizzes


    async function editQuestion(question) {
        const editQuestion = await service.editQuestion(question);
        setQuestion(editQuestion);
        // console.log(editQuestion)
    }

    useEffect(() => {
        async function getQuestion(id) {
            const obj = await service.showQuestion(id);
            // console.log(obj);
            setQuestion(obj);
        }
        getQuestion(id);
    }, []);




    return (
        <div>
            <h1>edit is here:</h1>
           
            {question.answers?.map((item) => {
                console.log(question.answers);
                return(
                    <div>
                    {/* <h1>here</h1> */}
                    {/* <span> Answer: </span><input type="text" value={item.body} onChange={(e) => setQuestion(e.target.value)}></input><input type="radio" ></input> */}
                    <span> Answer: </span><input type="text" value={item.answers} onChange={(e) => setQuestion(e.target.value)}></input><input type="radio" ></input>
                </div>
                );
            })}
            <button className="btn btn-primary" type="submit" onClick={() => editQuestion(question)}>update</button>
            {/* <span> Answer: </span><input type="text" ></input><input type="radio" ></input> */}

            {/* <form >

                <div><span> the question?: </span><input type="text"></input></div>
                <div><span> Answer: </span><input type="text" value={question.answers} onChange={(e) => setQuestion(e.target.value)}></input><input type="radio" ></input></div>
                <div><span> Answer: </span><input type="text" value={question.answers} onChange={(e) => setQuestion(e.target.value)}></input><input type="radio" ></input></div>
                <div><span> Answer: </span><input type="text" value={question.answers} onChange={(e) => setQuestion(e.target.value)}></input><input type="radio" ></input></div>
                <div><span> Answer: </span><input type="text" value={question.answers} onChange={(e) => setQuestion(e.target.value)}></input><input type="radio" ></input></div>
            </form> */}
        </div>
    );


}