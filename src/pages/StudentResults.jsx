import React, { useEffect, useState } from 'react'
import { Container, Footer, Header } from 'rsuite'
import { HeaderWebsite } from '../components/Header'
import { FooterWebsite } from '../components/FooterWebsite'
import { getAllExams } from '../service/ExamService'
import { ExamCardForResults } from '../components/ExamCardForResults'
import SideBarQuizApp from '../components/SideBarQuizApp'

export const StudentResults = () => {

    const [exams, setExams] = useState([]);
    useEffect(() => {
        getAllExams()
            .then((data)=> setExams(data))
            .catch(error => console.error('Error fetching exams: ', error));
    }, [])

    const reverseData = [...exams].reverse();

  return (
    <div>
        <Header style={{ position: "sticky", top: "0", zIndex: "100" }}>
            <HeaderWebsite/>
        </Header>

        <Container style={{minHeight:'82vh'}}>
            <SideBarQuizApp/>

            <Container>
                    <div className='d-flex flex-wrap justify-content-start'>
                    {reverseData.map((exam)=> (
                        <ExamCardForResults key={exam.examId} exam={exam}/>
                    ))}
                    </div>
            </Container>
        </Container>

        <Footer>
            <FooterWebsite/>
        </Footer>
    </div>
  )
}
