import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Footer, Header } from 'rsuite';
import { HeaderWebsite } from '../components/Header';
import { FooterWebsite } from '../components/FooterWebsite';
import SideBarQuizApp from '../components/SideBarQuizApp';
import { getResultOfExam } from '../service/ResultService';
import { Card } from 'react-bootstrap';
import { StudentResultCard } from '../components/StudentResultCard';

export const ResultParticularExam = () => {
    const {examId} = useParams();
    const [examResults, setExamResults] = useState([])

    useEffect(() => {
        getResultOfExam(examId)
            .then((data)=> setExamResults(data))
            .catch(error => console.error('Error fetching results for exam: ',error))
    }, [])
    
  return (
    <div>
        <Header style={{ position: "sticky", top: "0", zIndex: "100" }}>
            <HeaderWebsite/>
        </Header>

        <Container style={{minHeight:'82vh'}}>
            <SideBarQuizApp/>

            <Container>
                {examResults.length!==0?
                    <>{examResults.map((examResult)=> (
                        <StudentResultCard key={examResult.examResultId} examResult={examResult}/>
                    ))}</>:
                    <h3>No Results to display.</h3>
                }
            </Container>
        </Container>

        <Footer>
            <FooterWebsite/>
        </Footer>
    </div>
  )
}
