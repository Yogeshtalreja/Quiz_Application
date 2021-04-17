
import React from 'react';
import './App.css';
import Table from 'react-bootstrap/Table';
import Data from './MOCK_DATA.json';
import {useState} from 'react';
import Quest from './Questions.json';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';
import { setNestedObjectValues } from 'formik';
function Final(props) {
  return(
  
      <div className="border-bottom mb-2 p-1 ">
           <h6>Question{props.qu[props.index].id}  {props.qu[props.index].question} </h6>
           <h6>Correct Answer is: {props.qu[props.index].answer}</h6> 
           <h6>Score: {props.qu[props.index].score} 
             </h6>
           
      </div>
  )
  }
  

function Opt(props){

  const onChange = ((e)=>{
    if(e.target.value===props.qu[props.index].answer){
      props.qu[props.index].score = 1;
      props.qu[props.index].status = "correct";
    }else{
      props.qu[props.index].status = "incorrect";
    }


  })

  return(

    <div className="border border-info mb-2 p-1 w-25 justify-content-md-center">
         
        <Form.Check
          type="radio"
          value={props.tx}
          label={props.tx}
          name="formHorizontalRadios"
          id="formHorizontalRadios1"
          onChange={onChange.bind(this)}
           />
  
    </div>
)

}

function App() {



const [count,setCount] = useState(0);
const [question,setQuestion] = useState(Quest);
const [res,setRes] = useState(false);
const [tot ,setTotal] = useState(0);

const TotalScore = (()=>{
  setTotal(question.map((item)=> item.score).reduce((acu,cur)=>acu+cur));
  
  })

const plus = (()=>{
if(count<4){
  setCount(count+1);
}else{
TotalScore();
setRes(true);
}

})
const minus = (()=>{
if(count>0){
  setCount(count-1);
}

})
  return (
   
<div>
<h1>
  <center>
  Quiz
  </center>
  
</h1>
<Card className="text-center my-2">
{
res ? (
<Card.Body>
          <h1 className="border-bottom">Total Score:{tot}/5</h1>
          { question.map((ele,ind)=> <Final qu={question}  index={ind}/> ) }
          </Card.Body>
):(
  <Card.Body>
  <Card.Title>{question[count].id} : {question[count].question}</Card.Title>
  
  <Form.Group >
                          
    {
      Object.values(question[count].options[0]).map((it)=> <Opt tx={it}  qu={question}  index = {count} />)
    }
    </Form.Group>
    
    <Button variant="success" className="mx-2" onClick={minus}>Previous</Button><Button variant="success" onClick={plus}>Next</Button>
  
  
  </Card.Body>
  )
  }

 
</Card>

</div>
  
);
}

export default App;
