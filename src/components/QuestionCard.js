import React from 'react'
import { Button, Card, ListGroup } from 'react-bootstrap';
import Swal from 'sweetalert2';
import '../cssPages/categoryButton.css'
import '../cssPages/cards.css'
export const QuestionCard = ({question}) => {
  return (
    <div>
        {question.questionType !== 'DESCRIPTIVE'?
        <>
        <Card className='questionCard' style={{width: '30rem', margin:'10px'}}>
            <Card.Body>
                <Card.Title>{question.description}</Card.Title>
            </Card.Body>
            <ListGroup variant='flush'>
                {question.options.map((option, index) => (
                    <ListGroup.Item key={index}>{option}</ListGroup.Item>
                ))}
            </ListGroup>
            <ListGroup variant='flush'>
                    <p><b>Correct Options:</b> {question.correctOptions.join(', ')}</p>
            </ListGroup>
        </Card>
        </>:<>
            <Card className='questionCard' style={{width: '30rem', margin:'10px'}}>
                <Card.Body><Card.Title>{question.description}</Card.Title><b/><i>(DESCRIPTIVE)</i></Card.Body>
            </Card>
        </>}
        
    </div>
  )
}
