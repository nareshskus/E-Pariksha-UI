import React, { useEffect, useState } from 'react'
import '../cssPages/ExamCardForResults.css'
import { useNavigate } from 'react-router-dom';
export const ExamCardForResults = ({exam}) => {

    const {
        examId,
        examName,
        examDate,
        durationMinutes,
        startTime,
    } = exam;

    const [show, setShow] = useState(false)
    const examDateTime =  new Date(`${examDate} ${startTime}`);
    const currentDateTime = new Date();

    const navigate = useNavigate();

    useEffect(() => {
        if(currentDateTime>= examDateTime){
            setShow(true)
        }
    }, [examDate, startTime, durationMinutes]);

    const handleClick = () => {
        navigate(`/resultExam/${examId}`)
    }
    
  return (
    <div style={{width:'30%', margin:'1%'}}>
        {show?<button style={{width:'250px', height:'100px'}} className='examCard' onClick={handleClick}>{examName}<br/>({examDate})</button>: null}
    </div>
  )
}
