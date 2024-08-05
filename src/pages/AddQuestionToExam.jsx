import React, { useEffect, useState } from 'react'
import { Container, Footer, Header } from 'rsuite'
import { HeaderWebsite } from '../components/Header'
import SideBarQuizApp from '../components/SideBarQuizApp'
import { FooterWebsite } from '../components/FooterWebsite'
import { getCategoryList } from '../service/CategoryService'
import { getAllQuestions } from '../service/QuestionService'
import { QuestionCard } from '../components/QuestionCard'
import { AddQuestionExamData } from '../components/AddQuestionExamData'
import { useParams } from 'react-router-dom'

export const AddQuestionToExam = () => {

  const {examId} = useParams();
  return (
    <div>
        <Header style={{ position: "sticky", top: "0", zIndex: "100" }}>
            <HeaderWebsite />
        </Header>

        <Container style={{ minHeight: "82vh" }}>
            <SideBarQuizApp />

            <Container>
              <AddQuestionExamData examId={examId}/>
            </Container>

        </Container>

        <Footer className="">
            <FooterWebsite />
        </Footer>
    </div>
  )
}
