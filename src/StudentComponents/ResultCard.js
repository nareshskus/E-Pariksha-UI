import React from 'react'
import { Card } from 'react-bootstrap'
import '../cssPages/ResultCard.css'
import { Button } from 'rsuite';
import { useNavigate } from 'react-router-dom';
export const ResultCard = ({examResult}) => {
    const score = examResult.score.toFixed(2);
    const navigate = useNavigate();
    const handleResponseClick = () =>{
        navigate(`/response/${examResult.examResultId}`)
    }
  return (
    <div>
        <Card className='result-card'>
            <Card.Body className='d-flex justify-content-around '>
                <Card.Title><b>{examResult.exam.examName}</b></Card.Title>
                <Card.Title>Date: {examResult.exam.examDate} || {examResult.exam.startTime}</Card.Title>
                <Card.Title>Maximum Marks: {examResult.exam.maxMarks}</Card.Title>
                <Card.Title>Obtained Marks: {examResult.obtainedMarks}</Card.Title>
                <Card.Title style={{color:score<40?'red':'black'}}>{score<40? <b>Score: {score}%</b> : `Score: ${score}%`}</Card.Title>
                <Button color='blue' appearance='primary' onClick={()=> handleResponseClick()}>Responses</Button>
            </Card.Body>
        </Card>
    </div>
  )
}
