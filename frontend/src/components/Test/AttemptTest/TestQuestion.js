import React, { useEffect ,useState} from "react";
import axios from "axios";

import { useLocation, useNavigate } from "react-router-dom";
export default function TestQuestion() {

    const location = useLocation();
    const navigate = useNavigate();
    const [question, setQuestion] = React.useState("");
    const [answer, setAnswer] = React.useState("");
    const [result, setResult] = React.useState(0);
    const [error, setError] = useState()
    let Applicants = location.state.Applicants;
    var InProgress= 0;
    var Completed = 0;
    function sendData (){
        const body={
            //job:job,

            //user:user,
           //test:test,
            InProgress:InProgress,
            
            Completed:Completed,
            Applicants:Applicants,
        }
        axios.post(`http://127.0.0.1:8000/addStatus/`, body)
        .then(() => {
            navigate(-1)
          })
          .catch((error) => {
            setError(error);
          });
      



    }
    let setData = async () => {
        setQuestion(location.state.test.Questions[location.state.QIndex]);
    };
    useEffect(() => {
        setData();
        // Options();

    }, []);
   

    function Options() {
        if (question.option1 == null)
            document.getElementById("option1").style.display = "none";
        if (question.option2 == null)
            document.getElementById("option2").style.display = "none";
        if (question.option3 == null)
            document.getElementById("option3").style.display = "none";
        if (question.option4 == null)
            document.getElementById("option4").style.display = "none";
    }


    function refreshPage() {
        window.location.reload();
    }
    return (<div className="auth-inner2">
        <h3>{location.state.test.test_Name} Test</h3>
        <hr></hr>

        <p className="TLabel"> Question</p>
        <div className="TParagraph"><p >{question.statement}</p> </div>
        <form>
            <p className="TLabel">Select from the following</p>
            <div className="TParagraph">
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="option" id="option1" onClick={() => setAnswer(question.option1)} />
                    <label className="form-check-label" htmlFor="option1">
                        {question.option1}
                    </label>
                </div>

                <div className="form-check" >
                    <input className="form-check-input" type="radio" name="option" id="option2" onClick={() => setAnswer(question.option2)} />
                    <label className="form-check-label" htmlFor="option2">
                        {question.option2}
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="option" id="option3" onClick={() => setAnswer(question.option3)} />
                    <label className="form-check-label" htmlFor="option3">
                        {question.option3}
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="option" id="option4" onClick={() => setAnswer(question.option4)} />
                    <label className="form-check-label" htmlFor="option4">
                        {question.option4}
                    </label>
                </div>
            </div>
        </form>
        <div className="testbtn">
            <button type="button" className="button" onClick={() => Next() }>
                Next
            </button>
        </div>

    </div>);
    function Next() {
        InProgress= InProgress+1;
        let index = location.state.QIndex;
        let result = location.state.result;
        let Answers = location.state.answers;
       
        let QAnswer = {
            Tid: location.state.test.id,
            Qid: location.state.test.Questions[index].id,
            answer: answer
        }
        
        Answers.push(QAnswer)
        if(question.correct_answer==answer)
            result=result+1
        index = index + 1
    if(result===4 && index===question.length-1)
              Completed=Completed+1;//for checking maximum marks is 70% for sending job offer
       
        if (index < location.state.test.Questions.length) {
            navigate("/testquestion", { state: { answers: Answers, test: location.state.test, QIndex: index, result:result, job:location.state.job ,user:location.state.user,time_started:location.state.time_started} })
            refreshPage()
        }
        else {
            for (let i = 0; i < Answers.length; i++) {
                const body = {
                    Tid: Answers[i].Tid,
                    Qid: Answers[i].Qid,
                    answer: Answers[i].answer,
                };
                axios
                    .post(`http://127.0.0.1:8000/saveTestAns/`, body)
                    .then((response) => {
                        console.log(response.data);
                    })
                    .catch((error) => {
                        alert(error);
                    });
            }
            
            navigate("/result", { state: { result:result, test: location.state.test, job: location.state.job,user:location.state.user,time_started:location.state.time_started } })
            sendData()
        }
    }
}
