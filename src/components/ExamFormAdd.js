import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
export const ExamFormAdd = ({show, setShow, setIsAdded, isAdded, handleAddExam}) => {

    const [formData, setFormData] = useState({
        examName: '',
        examDate:'',
        maxMarks:0,
        numberQuestions:0,
        durationMinutes:0,
        startTime:'',
        active: false,
    });

    const handleChange = (event) =>{
        const {name, value, type, checked} = event.target;
        const updatedValue = type === 'checkbox' ? checked :value;
        setFormData({...formData, [name]: updatedValue});
    }

    const handleFormSubmit =(e) =>{
        e.preventDefault();

        const examData ={
            examName: formData.examName,
            examDate: formData.examDate,
            maxMarks: parseInt(formData.maxMarks),
            numberQuestions:parseInt(formData.numberQuestions),
            durationMinutes:parseInt(formData.durationMinutes),
            startTime:formData.startTime,
            active: formData.active,
        };
        isAdded? setIsAdded(false): setIsAdded(true);
        handleAddExam(examData);
        setShow(false)

        formData.examName=''
        formData.examDate=''
        formData.maxMarks=''
        formData.numberQuestions=0
        formData.durationMinutes=0
        formData.startTime=0
        formData.active=''
    }

    const handleClose = () =>{
        setShow(false)
    }

  return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Exam</Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
                <Form onSubmit={handleFormSubmit}>
                <Form.Group controlId='formExamName'>
                    <Form.Label>Exam Name</Form.Label>
                    <Form.Control type='text' name='examName' value={formData.examName} onChange={handleChange} required/>
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
                <Button variant='danger' onClick={()=> setShow(false)}>Cancel</Button>
            </Form>
            </Modal.Body>
        </Modal>
  )
}
