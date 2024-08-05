import React, { useEffect, useState } from 'react'
import { getExamsForAttempt } from '../service/ExamAttemptService';
import { ExamCard } from './ExamCard';

export const ExamListToAttempt = () => {

    const [exams, setExams] = useState([])
    useEffect(() => {
      getExamsForAttempt(localStorage.getItem('userId'))
          .then(data => setExams(data))
          .catch(error => console.error('Error fetching Exams: ', error));
    }, [])

    const reverseData = [...exams].reverse();
  return (
    <div className='d-flex flex-wrap justify-content-start' style={{marginLeft:'5%'}}>
      {reverseData.length === 0?<h3 style={{marginTop:'5%', marginLeft:'10%'}}>No Exam to Attempt</h3>: null}
        {reverseData.map((exam)=> (
            <ExamCard key={exam.examId} exam={exam}/>
        ))}
    </div>
  )
}
