import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getExamById } from '../service/ExamService';
import Swal from 'sweetalert2';

export const StopWatch = ({onSubmit}) => {

    const { examId } = useParams();
    const [exam, setExam] = useState(null);
    const [valuesSet, setValuesSet] = useState(false);

    useEffect(() => {
        getExamById(examId)
        .then(data => {
            setExam(data);
            setValuesSet(true);
        })
        .catch(error => console.error('Error fetching Exam: ', error));
    }, [examId]);

    const { examDate, startTime, durationMinutes } = exam || {};
    const examDateTime = new Date(`${examDate} ${startTime}`);
    const currentDateTime = new Date();
    const endDateTime = new Date(examDateTime.getTime() + (durationMinutes || 0) * 60000);
    const initialTimeLeft = Math.max(0, Math.floor((endDateTime - currentDateTime) / 1000));

    const [timeLeft, setTimeLeft] = useState(initialTimeLeft);
    const [notification, setNotification] = useState(false);

    useEffect(() => {
        if (valuesSet && exam) {
            setTimeLeft(initialTimeLeft)
        const interval = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);

            if (timeLeft === 60) {
            setNotification(true);
            }

            if (timeLeft === 0) {
            clearInterval(interval);
            onSubmit();
            }
        }, 1000);

        return () => clearInterval(interval);
        }
    }, [valuesSet, exam, timeLeft, onSubmit]);

    const formatTime = seconds => {
        const hours = Math.floor(seconds/3600);
        const minutes = Math.floor((seconds %3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    
  return (
    <div>
      {exam && (
        <>
            {timeLeft<60? <h6 style={{ color: 'rgb(230 45 45)', fontSize:'20px' }}>Time Left: {formatTime(timeLeft)}</h6>
            :<h6 style={{ color: 'rgb(0 0 0)', fontSize:'20px' }}>Time Left: {formatTime(timeLeft)}</h6>}
        </>
      )}
      
    </div>
  )
}
