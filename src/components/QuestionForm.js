import React, { useState } from 'react'
import { Button, Col, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import '../cssPages/Forms.css'

export const QuestionForm = ({onSubmitQuestion, categoryName}) => {
    const [description, setDescription] = useState('');
    const [options, setOptions] = useState(['', '']);
    const [correctOptions, setCorrectOptions] = useState([]);
    const [questionType, setQuestionType] = useState('SINGLE_ANSWER')

    const handleAddOption =() =>{
        setOptions((prevOptions)=> [...prevOptions,'']);
    }

    const handleRemoveOption = (index)=>{
        setOptions((prevOptions)=> prevOptions.filter((_,i)=> i !== index))
    }

    const handleOptionChange = (index, value) =>{
        setOptions((prevOptions)=> {
            const updatedOptions = [...prevOptions];
            updatedOptions[index]= value;
            return updatedOptions;
        });
    };

    const handleCorrectOptionChange = (value)=> {
        setCorrectOptions([value]);
    };

    const handleAddCorrectOption =() =>{
        setCorrectOptions((prevCorrectOptions)=> [...prevCorrectOptions, '']);
    };

    const handleRemoveCorrectOption =(index) =>{
        setCorrectOptions((prevCorrectOptions)=>
            prevCorrectOptions.filter((_,i) => i !== index)
        );
    };

    const handleSubmit = e =>{
        e.preventDefault();

        if(questionType === 'MULTIPLE_ANSWER' && correctOptions.length === 0){
            alert('Please select atleast one correct answer for multiple answer type questions.');
            return;
        }

        const question = {
            description,
            options,
            correctOptions,
            questionType,
            categoryName,
        }

        onSubmitQuestion(question);

        Swal.fire({
            title: `Question added to ${categoryName} successfully.`,
            icon: "success"
          });
        setDescription('');
        setOptions(['', '']);
        setCorrectOptions([]);
        setQuestionType('SINGLE_ANSWER');
    };
  
    return (
      <div className='questionForm'>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Question Text</Form.Label>
                <Form.Control type='text' placeholder='Enter question text'
                    value={description} onChange={(e)=> setDescription(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId='questionType'>
                <Form.Label>Question Type</Form.Label>
                <Form.Control as='select'
                    value={questionType}
                    onChange={(e) => setQuestionType(e.target.value)}>

                    <option value='SINGLE_ANSWER'>Single Answer</option>
                    <option value='MULTIPLE_ANSWER'>Multiple Answer</option>
                    <option value='DESCRIPTIVE'>DESCRIPTIVE</option>    
                </Form.Control>
            </Form.Group>

            {questionType !== 'DESCRIPTIVE' &&(
            <Form.Group controlId='options'>
                <Form.Label>Options</Form.Label>
                {options.map((option, index)=>(
                    <div className='d-flex justify-content-start'>
                        <Col>
                            <Form.Control
                                type='text' placeholder={`Option ${String.fromCharCode(65+index)}`}
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                required
                                style={{marginTop:'5px'}}
                            />
                        </Col>
                        {index>1 &&(
                            <Button variant='danger' onClick={()=> handleRemoveOption(index)} style={{marginLeft:'2px', marginTop:'5px'}}>Remove</Button>
                        )}
                    </div>
                ))}
                <Button variant='primary' onClick={handleAddOption} style={{marginTop:'5px'}}>Add Option</Button>
            </Form.Group>)}

            {questionType!== 'DESCRIPTIVE' &&(
                <Form.Group  controlId='correctOptions'>
                    <Form.Label>Correct Options</Form.Label>
                    {questionType === 'SINGLE_ANSWER' ?(
                        <Form.Control as='select' value={correctOptions[0] || ''}
                            onChange={(e)=> handleCorrectOptionChange(e.target.value)}>
                            <option value="" disabled style={{marginTop:'5px', marginBottom:'5px'}}>Select Correct Option</option>
                            {options.map((option, index)=>(
                                <option key={index} value={option}>
                                    {`Option ${String.fromCharCode(65+index)}`}
                                </option>
                            ))}
                        </Form.Control>
                    ):(
                        <>
                            {correctOptions.map((correctOption, index)=> (
                                <div key={index} className='d-flex'>
                                    <Col>
                                        <Form.Control as='select' value={correctOption}
                                        onChange={(e)=>{
                                            const value = e.target.value;
                                            setCorrectOptions((prevCorrectOptions)=>
                                                prevCorrectOptions.map((option,i) => (i===index ? value: option))
                                                );
                                        }}>
                                            <option value="" disabled style={{marginTop:'5px'}}>Select correct Option</option>
                                            {options.map((option, optionIndex)=>(
                                                <option key={optionIndex} value={option}>
                                                    {`Option ${String.fromCharCode(65+optionIndex)}`}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    {index>0 && (
                                        <Button variant='danger' onClick={()=> handleRemoveCorrectOption(index)} style={{marginLeft:'2px', marginTop:'5px'}}>Remove</Button>
                                    )}
                                </div>
                            ))}
                            <Button variant='primary' onClick={handleAddCorrectOption} style={{marginTop:'5px'}}>Add correct option</Button>
                        </>
                    )}
                </Form.Group>
            )}

            <Button variant='success' type='submit' style={{marginTop:'5px'}}>Submit</Button>
        </Form>
      </div>
    );
}
