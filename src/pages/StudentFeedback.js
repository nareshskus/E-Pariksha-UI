import React, { useEffect, useState } from 'react'
import { Container, Footer, Header } from 'rsuite'
import { HeaderWebsite } from '../components/Header'
import { FooterWebsite } from '../components/FooterWebsite'
import SideBarQuizApp from '../components/SideBarQuizApp'
import { getFeedbacks } from '../service/FeedbackService'
import { Card, CardBody } from 'react-bootstrap'
import '../cssPages/StudentFeedback.css'
export const StudentFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([])

    useEffect(() => {
        getFeedbacks()
            .then((data)=> setFeedbacks(data))
            .catch(error=> console.error('Error fetching feedbacks: ', error))
    }, [])

    const reverseData = [...feedbacks].reverse();
    
  return (
    <div>
        <Header style={{ position: "sticky", top: "0", zIndex: "100" }}>
            <HeaderWebsite />
        </Header>

        <Container style={{minHeight:'82vh'}}>
            <SideBarQuizApp/>

            <Container>
                {reverseData.map((feedback)=> (
                    <Card className='studentFeedbackCard'>
                        <CardBody>
                            <Card.Title>{feedback.feedback}</Card.Title>
                            <Card.Text style={{fontSize:'12px'}}>From: <b>{feedback.student.studentName}</b></Card.Text>
                        </CardBody>
                    </Card>
                ))}
            </Container>
        </Container>

        <Footer>
            <FooterWebsite/>
        </Footer>
    </div>
  )
}
