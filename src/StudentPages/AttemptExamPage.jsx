import React from 'react'
import { Container, Footer, Header } from 'rsuite'
import { StudentNavbar } from '../StudentComponents/StudentNavbar'
import { FooterStudent } from '../StudentComponents/FooterStudent'
import { ExamListToAttempt } from '../StudentComponents/ExamListToAttempt'

export const AttemptExamPage = () => {
  return (
    <div>
        <Header style={{ position: "sticky", top: "0", zIndex: "100" }}>
          <StudentNavbar/>
        </Header>

        <Container style={{minHeight:'82vh'}}>
            <ExamListToAttempt/>
        </Container>

        <Footer>
            <FooterStudent/>
        </Footer>
    </div>
  )
}
