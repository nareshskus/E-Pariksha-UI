import React, { useState } from 'react'
import { Button, Container, Footer, Header } from 'rsuite'
import { StudentNavbar } from '../StudentComponents/StudentNavbar'
import { FooterWebsite } from '../components/FooterWebsite'
import { Alert, ButtonToolbar, Form } from 'react-bootstrap'
import '../cssPages/Feedback.css'
import { sendFeedback } from '../service/FeedbackService'
import Swal from 'sweetalert2'
export const Feedback = () => {

    const [feedback, setFeedback] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const studentId = localStorage.getItem('userId')

    const handleSubmit = () => {
        if(!feedback.trim()){
            setErrorMessage('Please enter your feedback.');
            return;
        }
        const data= {
            feedback,
            studentId,
        }

        sendFeedback(data);
        setFeedback(' ');
        setErrorMessage('')
        Swal.fire({
            title: "Feedback Sent!",
            icon: "success"
          });
    }
  return (
    <div>
        <Header style={{ position: "sticky", top: "0", zIndex: "100" }}>
            <StudentNavbar/>
        </Header>

        <Container style={{minHeight:'82vh'}}>
            <div className='feedback'>
            <Form>
            {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
                <Form.Group className="mb-3" controlId="feedback" >
                    <Form.Label style={{fontSize:'20px'}}>Feedback</Form.Label>
                    <Form.Control as="textarea" value={feedback} onChange={(e) =>{
                        setFeedback(e.target.value);
                        setErrorMessage('')
                        }} style={{height:'20vh'}}/>
                </Form.Group>
                <ButtonToolbar>
                    <Button appearance='primary'  onClick={handleSubmit}>Submit Feedback</Button>
                </ButtonToolbar>
            </Form>
            </div>
        </Container>

        <Footer>
            <FooterWebsite/>
        </Footer>
    </div>
  )
}
