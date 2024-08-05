import React, { useEffect, useState } from 'react'
import { getResultsOfStudent } from '../service/ResultService'
import { Container, Footer, Header } from 'rsuite'
import { FooterStudent } from '../StudentComponents/FooterStudent'
import { StudentNavbar } from '../StudentComponents/StudentNavbar'
import { ResultCard } from '../StudentComponents/ResultCard'

export const ResultPage = () => {

    const [examResults, setExamResults] = useState([])
    useEffect(() => {
        getResultsOfStudent(localStorage.getItem('userId'))
        .then((data)=> setExamResults(data))
    }, [])

    const reverseData = [...examResults].reverse();
    
  return (
    <div>
        <Header style={{ position: "sticky", top: "0", zIndex: "100" }}>
            <StudentNavbar/>
        </Header>

        <Container style={{minHeight:'82vh'}}>
            {reverseData.length === 0?<h3 style={{marginTop:'5%', marginLeft:'10%'}}>No Results to display</h3>:null}
            {reverseData.map((examResult)=> (
                <ResultCard key={examResult.examResultId} examResult={examResult}/>
            ))}
        </Container>

        <Footer>
            <FooterStudent/>
        </Footer>
    </div>
  )
}
