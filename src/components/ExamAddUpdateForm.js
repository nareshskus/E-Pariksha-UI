import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import '../cssPages/Forms.css'
export const ExamAddUpdateForm = ({initialData, onUpdate, setShowForm}) => {

    const [formData, setFormData] = useState({...initialData});

    const handleChange =(event) =>{

        const{name, value, type, checked} = event.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData({...formData, [name]: newValue});
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        Swal.fire({
            title: "Exam Updated Successfully",
            icon: "success"
          });
        onUpdate(formData);
        setShowForm(false)
    }
    
  return (
    <div>
    {console.log(formData)}
        <Form onSubmit={handleSubmit} className='examForm'>
            <Form.Group controlId='formExamName'>
                <Form.Label>Exam Name</Form.Label>
                <Form.Control type='text' name='examName' value={formData.examName} onChange={handleChange} autoComplete='' required/>
            </Form.Group>

            <div className='row'>
            <Form.Group controlId='formExamDate' className='col-md-6'>
                <Form.Label>Exam Date</Form.Label>
                <Form.Control type='date' name='examDate' value={formData.examDate} onChange={handleChange} required/>
            </Form.Group>
            <Form.Group controlId='formExamTime' className='col-md-6'>
                <Form.Label>Start Time</Form.Label>
                <Form.Control type='time' name='startTime' value={formData.startTime} onChange={handleChange} required/>
            </Form.Group>
            </div>

            <Form.Group controlId='formMaxMarks'>
                <Form.Label>Maximum Marks</Form.Label>
                <Form.Control type='number' name='maxMarks' value={formData.maxMarks} onChange={handleChange} required/>
            </Form.Group>

            <Form.Group controlId='formQuestions'>
                <Form.Label>Question</Form.Label>
                <Form.Control type='number' name='numberQuestions' value={formData.numberQuestions} onChange={handleChange} required/>
            </Form.Group>

            <Form.Group controlId='formDuration'>
                <Form.Label>Duration in (Minutes)</Form.Label>
                <Form.Control type='number' name='durationMinutes' value={formData.durationMinutes} onChange={handleChange} required/>
            </Form.Group>

            <Form.Group>
                <Form.Check 
                    type='checkbox'
                    label='Active'
                    name='active'
                    checked={formData.active}
                    onChange={handleChange}
                />
            </Form.Group>
            <Button variant='success' type='submit' style={{marginRight:'5px'}}>Submit</Button>
            <Button variant='danger' onClick={()=> setShowForm(false)}>Cancel</Button>
        </Form>
    </div>
  )
}
