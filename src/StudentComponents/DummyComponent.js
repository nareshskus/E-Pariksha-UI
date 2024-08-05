import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

const QuizComponent = ({ questions }) => {
  const [responses, setResponses] = useState([]);

  const handleSingleAnswerChange = (questionId, selectedOption) => {
    const existingResponse = responses.find((response) => response.questionId === questionId);

    if (existingResponse) {
      // If response exists, update the selected option for SINGLE_ANSWER type
      const updatedResponses = responses.map((response) =>
        response.questionId === questionId
          ? { ...response, selectedOptions: [selectedOption] }
          : response
      );
      setResponses(updatedResponses);
    } else {
      // If response doesn't exist, add a new response for SINGLE_ANSWER type
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

    if (existingResponse) {
      // If response exists, toggle the selected option for MULTIPLE_ANSWER type
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
      // If response doesn't exist, add a new response for MULTIPLE_ANSWER type
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

  const handleSubmit = () => {
    // Handle submitting responses, e.g., sending them to the server
    console.log(responses);
  };

  const isResponseExists = (questionId) => {
    return responses.some((response) => response.questionId === questionId);
  };

  // Add default blank responses for unanswered questions
  const unansweredQuestions = questions.filter((question) => !isResponseExists(question.questionId));
  
  unansweredQuestions.forEach((question) => {
    setResponses((prevResponses) => [
      ...prevResponses,
      {
        questionId: question.questionId,
        selectedOptions: [],
        descriptiveAnswer: '',
      },
    ]);
  });

  return (
    <div>
      {questions.map((question) => (
        <Card key={question.questionId} className="mb-3">
          <Card.Body>
            <Card.Title>{question.description}</Card.Title>
            <Form>
              {question.options.map((option) => (
                <Form.Check
                  key={option}
                  type={question.question_type === 'MULTIPLE_ANSWER' ? 'checkbox' : 'radio'}
                  label={option}
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
              ))}
            </Form>
          </Card.Body>
        </Card>
      ))}
      <Button variant="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default QuizComponent;
