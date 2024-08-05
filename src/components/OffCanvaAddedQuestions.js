import React, { useState } from 'react'
import { Button, Offcanvas } from 'react-bootstrap';
import { QuestionCard } from './QuestionCard';
import { getQuestionById } from '../service/QuestionService';

export const OffCanvaAddedQuestions = ({questions, handleRemoveQuestionInExam}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <div>
        <Button variant="primary" onClick={handleShow} className="me-2">List Added Questions({questions.length})</Button>
        <Offcanvas show={show} onHide={handleClose} placement='end'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Added Questions</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
            {questions.map((question, index)=>(
                <div key={index} style={{marginBottom:'20px'}}>
                    <QuestionCard question={question} handleRemoveQuestionInExam={handleRemoveQuestionInExam}/>
                    <Button variant='danger' size='sm' 
                        onClick={()=> handleRemoveQuestionInExam(question.questionId)}>Remove</Button>
                </div>
            ))}
            </Offcanvas.Body>
        </Offcanvas>
    </div>
  )
}
