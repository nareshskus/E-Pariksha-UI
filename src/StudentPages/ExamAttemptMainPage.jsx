import React, { useEffect, useRef, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getQuestionsFromExam } from '../service/ExamAttemptService';
import { Container, Footer, Header } from 'rsuite';
import { HeaderExamAttempt } from '../StudentComponents/HeaderExamAttempt';
import { FooterStudent } from '../StudentComponents/FooterStudent';
import Swal from 'sweetalert2';
import axios from 'axios';
import { FaFlag } from "react-icons/fa";
import '../cssPages/QuestionAttempt.css'
import Webcam from 'react-webcam';
import { WebCamComponent } from '../StudentComponents/WebCamComponent';

export const ExamAttemptMainPage = () => {
    const {examId} = useParams();
    const [questions, setQuestions] = useState([])
    const [responses, setResponses] = useState([])
    const examResultId = localStorage.getItem('examResultId');
    const navigate = useNavigate();
    const questionRefs = questions.map(() => React.createRef());

    const submitExam = async () =>{
        const API_BASE_URL = 'http://localhost:8080/studentExam';
        try {
            const response = await axios.post(`${API_BASE_URL}/submit/${examResultId}`, responses,{
                headers:{
                    'content-Type': 'application/json',
                },
            })
            return response.data;
        } catch (error) {
            console.error('Error Submitting Exam: ',error);
            throw error;
        }
    }

    useEffect(() => {
        getQuestionsFromExam(examId)
            .then(data => setQuestions(data))
            .catch(error => console.error('Error fetching Questions: ', error));
    }, [])

    const handleSingleAnswerChange = (questionId, selectedOption) => {
      const existingResponse = responses.find((response) => response.questionId === questionId);
      const updatedIds =unansweredIds.filter(id => id !== questionId)
      setUnansweredIds(updatedIds)
      if (existingResponse) {
        const updatedResponses = responses.map((response) =>
          response.questionId === questionId
            ? { ...response, selectedOptions: [selectedOption] }
            : response
        );
        setResponses(updatedResponses);
      } else {
        setResponses((prevResponses) => [
          ...prevResponses,
          {
            questionId,
            selectedOptions: [selectedOption],
            descriptiveAnswer: '',
          },
        ]);
      }
    };
  
    const handleMultipleAnswerChange = (questionId, selectedOption) => {
      const existingResponse = responses.find((response) => response.questionId === questionId);
      const updatedIds =unansweredIds.filter(id => id !== questionId)
      setUnansweredIds(updatedIds)
      if (existingResponse) {
        const updatedResponses = responses.map((response) =>
          response.questionId === questionId
            ? {
                ...response,
                selectedOptions: response.selectedOptions.includes(selectedOption)
                  ? response.selectedOptions.filter((option) => option !== selectedOption)
                  : [...response.selectedOptions, selectedOption],
              }
            : response
        );
        setResponses(updatedResponses);
      } else {
        setResponses((prevResponses) => [
          ...prevResponses,
          {
            questionId,
            selectedOptions: [selectedOption],
            descriptiveAnswer: '',
          },
        ]);
      }
    };

    const handleDescriptiveAnswer = (questionId, descriptiveAnswer) => {
      const updatedIds =unansweredIds.filter(id => id !== questionId)
      setUnansweredIds(updatedIds)
      const updatedResponses = responses.map((response) =>
        response.questionId === questionId
        ?{
          ...response, descriptiveAnswer: descriptiveAnswer
        }
        : response
      );
      setResponses(updatedResponses);
    }
  
    const isResponseExists = (questionId) => {
      return responses.some((response) => response.questionId === questionId);
    };

    const [flagIds, setFlagIds] = useState([])
    const [unansweredIds, setUnansweredIds] = useState([])
  
    const unansweredQuestions = questions.filter((question) => !isResponseExists(question.questionId));
    
    unansweredQuestions.forEach((question) => {
      setUnansweredIds((prevValue)=>[...prevValue,question.questionId])
      setResponses((prevResponses) => [
        ...prevResponses,
        {
          questionId: question.questionId,
          selectedOptions: [],
          descriptiveAnswer: '',
        },
      ]);
    });

    const handleSubmit = () => {
        Swal.fire({
            title: "Are you sure you want to submit?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#28a745",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Submit!"
          }).then((result) => {
            if (result.isConfirmed) {
                submitExam()
                Swal.fire({
                    title: "Submitted!",
                    icon: "success"
                });
                localStorage.removeItem('examResultId')
                window.close();
            }
          });
    };

    const handleTimeExpiredSubmit = () => {
      submitExam();
      localStorage.removeItem('examResultId')
      navigate("/examSubmitted", {replace:true})
    }

    const handleClearResponse = (question)=>{

    }

    const handleFlagClick = (questionId) => {
      if(flagIds.includes(questionId)){
        const updatedIds =flagIds.filter(id => id !== questionId)
        setFlagIds(updatedIds);
      }
      else {
        setFlagIds((prevValue)=>[...prevValue, questionId])
      }
    }
    
  return (
    <div>

      <Header style={{ position: "sticky", top: "0", zIndex: "100" }}>
        <HeaderExamAttempt onSubmit={handleTimeExpiredSubmit}/>
      </Header>

      <Container style={{minHeight:'82vh'}}>
        <div className='d-flex flex-wrap justify-content-start'>
            <div style={{width:'65%', minHeight:'82vh'}}>
            <Alert variant='danger' style={{textAlign:'center', width:'80%', marginLeft:'10%', marginTop:'2%'}}>AI proctored Exam. Don't turn off camera or switch tabs.</Alert>
              {questions.map((question, index) => (
                  <Card key={question.questionId} className="mb-3 question" ref={questionRefs[index]}>
                    <Card.Body>
                      <Card.Title>{index+1}. {question.description}</Card.Title>
                      <Button variant={flagIds.includes(question.questionId)?'warning': 'outline-warning'} size='sm' 
                        onClick={()=> handleFlagClick(question.questionId)} style={{position:'absolute', right:'20px'}}>
                        {<FaFlag/>}</Button>
                      <Form>
                        {question.question_type !== 'DESCRIPTIVE'?
                        <>
                        {question.options.map((option) => (
                          <div className="d-flex justify-content-start">
                          <Form.Check
                            key={option}
                            type={question.question_type === 'MULTIPLE_ANSWER' ? 'checkbox' : 'radio'}
                            checked={
                              (responses.find((r) => r.questionId === question.questionId)?.selectedOptions || []).includes(
                                option
                              )
                            }
                            onChange={() =>
                              question.question_type === 'MULTIPLE_ANSWER'
                                ? handleMultipleAnswerChange(question.questionId, option)
                                : handleSingleAnswerChange(question.questionId, option)
                            }
                          />
                            <label htmlFor={`${question.questionId}-${option}`}
                                  onClick={() =>
                                    question.question_type === "MULTIPLE_ANSWER"
                                      ? handleMultipleAnswerChange(
                                          question.questionId,
                                          option
                                        )
                                      : handleSingleAnswerChange(
                                          question.questionId,
                                          option
                                        )
                                  }
                                  style={{ marginLeft: "10px" }}>
                                  {option}
                              </label>
                          </div>
                      ))}</>:
                            <><br/>
                              <Form.Group>
                                <Form.Label>Answer</Form.Label>
                                <Form.Control as='textarea' onChange={(e)=> handleDescriptiveAnswer(question.questionId,e.target.value)}></Form.Control>
                              </Form.Group>
                            </>
                      }
                      </Form>
                    <Button  variant='outline-dark' size='sm' style={{marginTop:'20px'}}
                    onClick={()=>handleClearResponse(question)}>Clear Response</Button>
                  </Card.Body>
                </Card>
              ))}
            </div>

            <div className='cameraPagination'>

              <div className='camera'><Webcam style={{width:'220px', height:'150px'}} autoFocus={true} imageSmoothing={true} mirrored={true}/></div>
            
              <div className='flex-wrap justify-content-start pagination'>

                <div style={{overflowY:'scroll', height:'180px'}}>{questions.map((question, index) => (
                  <Button key={index} 
                    variant={flagIds.includes(question.questionId)?'warning':unansweredIds.includes(question.questionId)?'danger':'primary'} 
                    size='sm' style={{marginRight:'5%', margin:'1%', maxHeight:'35px'}}
                    onClick={() =>
                      questionRefs[index].current.scrollIntoView({
                        behavior: "smooth",
                        block: 'center',
                      })
                    }>
                      {index + 1}
                  </Button>
                  ))}
                </div>

                <Button variant='success' onClick={handleSubmit}
                style={{height:'40px', position:'absolute', bottom:'5%'}}>Submit</Button>

              </div>

            </div>

        </div>
      </Container>

      <Footer>
        <FooterStudent />
      </Footer>

    </div>
  );
}
