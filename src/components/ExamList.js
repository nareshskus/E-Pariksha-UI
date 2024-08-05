import React, { useEffect, useState } from 'react'
import { deleteExam, getAllExams, updateExam } from '../service/ExamService';
import { Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { ExamAddUpdateForm } from './ExamAddUpdateForm';
import { Link } from 'react-router-dom';

export const ExamList = ({isAdded}) => {
    const [exams, setExams] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [examForForm, setExamForForm] = useState([]);
    const [changeInExam, setChangeInExam] = useState(false)
    useEffect(() => {
        getAllExams()
            .then(data => setExams(data))
            .catch(error => console.error('Error fetching exams: ', error));
    }, [changeInExam, isAdded])

    const handleUpdateExam = async (updatedExam) => {
        try {
            const data = await updateExam(updatedExam.examId, updatedExam);
            setExams(prevExam=>
                prevExam.map((exam)=>
                exam.examId === exams.examId? exam: exams)
                );
            changeInExam? setChangeInExam(false): setChangeInExam(true)
        } catch (error) {
            console.error(('Error Updating Exam: ',error));
        }
    }

    const DeleteExam = async (deletedExam) =>{
        console.log(deletedExam.questionId)
        try {
            await deleteExam(deletedExam.examId);
            setExams((prevExam)=>
            prevExam.filter((exam)=>
            exam.examId!==deletedExam.examId)
            );
        } catch (error) {
            console.error('Error deleting Exam: ',error);
            Swal.fire({
                title: "Cancelled",
                text: "Exam is not deleted.",
                icon: "error"
              });
        }
    }

    const handleDelete = (exam)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                DeleteExam(exam)
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
    }
    const handleExam = (exam)=>{
        setShowForm(true)
        setExamForForm(exam);
    }

    const reverseExam = [...exams].reverse();

  return (
    <div>
        {!showForm?<><h2>Exams List</h2>
        <Table>
            <thead>
                <tr>
                    <th>Exam Name</th>
                    <th>Exam Date</th>
                    <th>Start Time</th>
                    <th>Max Marks</th>
                    <th>Questions</th>
                    <th>Duration</th>
                    <th>Active</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {reverseExam.map((exam) => (
                    <tr key={exam.examId}>
                        <td>{exam.examName}</td>
                        <td>{exam.examDate}</td>
                        <td>{exam.startTime}</td>
                        <td>{exam.maxMarks}</td>
                        <td>{exam.numberQuestions}</td>
                        <td>{exam.durationMinutes} Minutes</td>
                        <td>{exam.active ? 'Yes' :'No'}</td>
                        <td className='d-flex justify-content-start'>
                            <Button variant='info' style={{marginRight:'5px'}} onClick={()=> handleExam(exam)}>Edit</Button>
                            <Link to={`/questionToExam/${exam.examId}`} className='nav-link navItemText'>
                                <Button variant='success' style={{marginRight:'5px'}}>Questions</Button>
                            </Link>
                            <Button variant='danger' onClick={()=>handleDelete(exam)}>Delete</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table></>:
            <ExamAddUpdateForm initialData={examForForm} onUpdate={handleUpdateExam} setShowForm={setShowForm}/>
        }
    </div>
  )
}
