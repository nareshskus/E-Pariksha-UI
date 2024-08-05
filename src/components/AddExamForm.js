import React, { useState } from 'react'
import Swal from 'sweetalert2'

export const AddExamForm = () => {

    const ExamForm =({onSubmit}) =>{
        const [formData, setFormData] = useState({
            examName: '',
            scheduleDate:'',
            maxMarks:'',
            numberQuestions:'',
            durationMinutes:'',
            active: false,
        });

        const handleChange = (event) =>{
            const {name, value, type, checked} = event.target;
            const updatedValue = type === 'checkbox' ? checked :value;
            setFormData({...formData, [name]: updatedValue});
        }

        const handleSubmit = () =>{
            onSubmit(formData);
            Swal.close();
        }

        return(
            <div>
                <label>Exam Name: 
                    <input type='text' name='examName' value={formData.examName} onChange={handleChange} />
                </label>

                <label>Schedule Date:
                    <input type='date' name='scheduleDate' value={formData.scheduleDate} onChange={handleChange} />
                </label>

                <label>Total Marks:
                    <input type='number' name='maxMarks' value={formData.maxMarks} onChange={handleChange} />
                </label>

                <label>Number of Questions: 
                    <input type='number' name='numberQuestions' value={formData.numberQuestions} onChange={handleChange} />
                </label>

                <label>Duration in Minutes: 
                    <input type='number' name='durationMinutes' value={formData.durationMinutes} onChange={handleChange} />
                </label>

                <label>Active: 
                    <input type='checkbox' name='active' value={formData.active} onChange={handleChange} />
                </label>

                <button onClick={handleSubmit}>Submit</button>
            </div>
        )
    }

    const handleFormSubmit = (formData) =>{
        console.log(formData);
    }

    const openExamForm =()=>{
        console.log('Hello in OpenForm')
        Swal.fire({
            html: '<ExamForm onSubmit={handleFormSubmit}/>'+'',
            showCancelButton: true,
            showConfirmButton:true,
        })
    }
  return (
    <div>
        <button className='bn632-hover bn25' onClick={openExamForm}>Schedule New Exam</button>
        <ExamForm onSubmit={handleFormSubmit}/>
    </div>
  )
}
