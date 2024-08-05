import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import '../cssPages/ExamCard.css'
import { Link, useNavigate } from 'react-router-dom';
import { startExam } from '../service/ExamAttemptService';
import Swal from 'sweetalert2';
export const ExamCard = ({exam}) => {
    const {
        examName,
        examDate,
        maxMarks,
        numberQuestions,
        durationMinutes,
        startTime,
    } = exam;

    const [isStartButtonActive, setIsStartButtonActive] = useState(false)
    const examDateTime =  new Date(`${examDate} ${startTime}`);
    const currentDateTime = new Date();
    const endDateTime = new Date(examDateTime.getTime() + durationMinutes*60000);

    const activateStartButton = () => {
      if(currentDateTime >= examDateTime && currentDateTime<=endDateTime){
        setIsStartButtonActive(true)
      } else if(currentDateTime>endDateTime) {
        setIsStartButtonActive(false)
      }
    }

    useEffect(() => {
      activateStartButton();
    }, [examDate, startTime, durationMinutes]);

    const navigate = useNavigate();
    const data = {
        userName: localStorage.getItem('userName')
    };

    const handleStartExam = (examId) =>{
        Swal.fire({
          title: "Start Exam?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Start it!"
        }).then((result) => {
          if (result.isConfirmed) {
            try {
              startExam(examId, data)
              .then(data=> localStorage.setItem('examResultId', data.examResultId))
          } catch (error) {
              console.error(error)
          }
          openFullScreenPopUp();
          navigate('/studentDashboard')
          }
        });

        const openFullScreenPopUp =() =>{
          const url =`/examAttemptMain/${examId}`;
          const screenWidth = window.screen.width;
          const screenHeight = window.screen.height;
          window.open(url, 'Popup', `width=${screenWidth},height=${screenHeight}`);
        }
    }
    
  return (
    <>
        <Card className='exam-card' style={{width:'30%', margin:'1%'}}>
            <Card.Body>
                <Card.Title><b>{examName} ({maxMarks} Marks)</b></Card.Title>
                <Card.Text><b>Date: {examDate} ||  Time: {startTime}</b></Card.Text>
                <Card.Text>Number of Questions: {numberQuestions}</Card.Text>
                <Card.Text>Duration: {durationMinutes} minutes</Card.Text>
                
                {currentDateTime>endDateTime? 
                    <Button variant='secondary' disabled style={{marginTop:'10px'}}>Expired</Button>
                 :isStartButtonActive?
                    <Button variant='success' onClick={()=> handleStartExam(exam.examId)} style={{marginTop:'10px'}}>Start Exam</Button>
                    :
                    <Button variant='secondary' disabled style={{marginTop:'10px'}}>Start Exam</Button>}
            </Card.Body>
        </Card>
    </>
  )
}
