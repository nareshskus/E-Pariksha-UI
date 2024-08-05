import React, { useState } from 'react'
import { Container, Footer, Header } from 'rsuite'
import { HeaderWebsite } from '../components/Header'
import SideBarQuizApp from '../components/SideBarQuizApp'
import { FooterWebsite } from '../components/FooterWebsite'
import { ExamList } from '../components/ExamList'
import { ExamFormAdd } from '../components/ExamFormAdd'
import { createExam } from '../service/ExamService'
import Swal from 'sweetalert2'

export const ScheduleExam = () => {

  const [show, setShow] = useState(false)
  const [isAdded, setIsAdded] = useState(false)

  const handleAddExam = async examData =>{
    try {
        const data = await createExam(examData)
        Swal.fire({
          title: "Exam Scheduled Successfully.",
          icon: "success"
        });
    } catch (error) {
        console.error('Error adding exam: ',error);
    }
}
  return (
    <div>
      <Header style={{ position: "sticky", top: "0", zIndex: "100" }}>
        <HeaderWebsite />
      </Header>

      <Container style={{ minHeight: "82vh" }}>
        <SideBarQuizApp />
        <Container>
            <button className='bn632-hover bn25' onClick={()=> setShow(true)}>Schedule New Exam</button>
            <ExamFormAdd show={show} setShow={setShow} setIsAdded={setIsAdded} isAdded={isAdded} handleAddExam={handleAddExam}/>
            <ExamList isAdded={isAdded}/>
        </Container>
      </Container>

      <Footer className="">
        <FooterWebsite />
      </Footer>
    </div>
  );
}
