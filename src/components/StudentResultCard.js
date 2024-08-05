import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Button } from 'rsuite';

export const StudentResultCard = ({examResult}) => {

    const [score, setScore] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if(examResult.score){
            setScore(examResult.score)
        }
    }, [])
    

    const handleResponseClick = () => {
        navigate(`/studentResponse/${examResult.examResultId}`)
    }
  return (
    <div>
        <Card className='result-card'>
            <Card.Body className='d-flex justify-content-around'>
                <Card.Title><b>{examResult.student.studentName}</b></Card.Title>
                <Card.Title>Maximum Marks: {examResult.exam.maxMarks}</Card.Title>
                <Card.Title>Obtained Marks: {examResult.obtainedMarks}</Card.Title>
                <Card.Title style={{color:score<40?'red':'black'}}>{score<40? <b>Score: {score}%</b> : `Score: ${score}%`}</Card.Title>
                {score!==null?<Button color='blue' appearance='primary' onClick={()=> handleResponseClick()}>Responses</Button>
                    :<Button color='blue' appearance='primary' disabled>UnSubmitted</Button>}
            </Card.Body>
        </Card>
    </div>
  )
}
