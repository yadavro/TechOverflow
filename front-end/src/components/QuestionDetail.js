import React, { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import "../util/QuestionDetail.css";
import TextEditor from './TextEditot';
import { useNavigate } from "react-router-dom";


function QuestionDetail() {
const location = useLocation();
const { questionId} = location.state;
const {description}=location.state;
const {title}=location.state;

const [formStep, setFormStep] = useState(1);
const [details, setDetails] = useState("");

const navigate=useNavigate();

const handleNext = (step) => {
  alert("Click post to submit your answer")
  setFormStep(step);
};

const handleDetailsChange = (content) => {
  const trimmedText = content.replace(/<p>|<\/p>/g, '');
  setDetails(trimmedText);
};

const handleSubmit=(event)=>{
  event.preventDefault();
  alert(`findouts: ${details}`);
  navigate('/questions')
}

  return (
    <div className='question-detail'>
    <form onSubmit={handleSubmit}>
      <strong className='questionDetailTitle'>{title}</strong><br/>
      <strong className='questionDetailDescription'>{description}</strong><br/>
      <TextEditor
            nextClick={() => handleNext(3)}
            onContentChange={handleDetailsChange}
          />
      <button type='submit' className='questionDetailSubmit'>POST</button>
    </form>
    </div>
  )
}

export default QuestionDetail
