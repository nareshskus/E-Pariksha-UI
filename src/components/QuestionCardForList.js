import React from 'react'
import { Button, Card, ListGroup } from 'react-bootstrap';
import Swal from 'sweetalert2';
export const QuestionCardForList = ({question, onUpdateQuestion, onDeleteQuestion}) => {

    const handleDelete = ()=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                onDeleteQuestion(question)
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
    }
  return (
    <div>
        <Card className='questionCard' style={{width: '30rem', margin:'10px'}}>
            <Card.Body>
                <Card.Title>{question.description}</Card.Title>
            </Card.Body>
            {question.questionType !== 'DESCRIPTIVE'?
                <>
                  <ListGroup variant='flush'>
                    {question.options.map((option, index) => (
                      <ListGroup.Item key={index}>{option}</ListGroup.Item>
                    ))}
                  </ListGroup>
                  <ListGroup variant='flush'>
                      <p>Correct Options: {question.correctOptions.join(', ')}</p>
                  </ListGroup>
                </>:
                <>
                <i>(DESCRIPTIVE)</i>
                </>
              }

            <Card.Body>
                <Button variant='info' onClick={onUpdateQuestion}>Update</Button>
                <Button variant='danger' onClick={()=>handleDelete()} style={{marginLeft:'10px'}}>Delete</Button>
            </Card.Body>
        </Card>
    </div>
  )
}
