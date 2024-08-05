import React, { useState } from 'react'
import { Alert, Button, Col, Container, Form, InputGroup, Nav, Row } from 'react-bootstrap';
import '../../cssPages/loginPage.css'
import { Link, json, useNavigate } from 'react-router-dom';
export const LoginForm = () => {
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
    });

    const [validationErrors, setValidationErrors] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setValidationErrors({ ...validationErrors, [name]: '' });
  };

  const handleLogin = async () => {
    const errors = {};
    if (!formData.userName) {
      errors.userName = 'Username is required';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
        const url = `http://localhost:8080/students/login?userName=${formData.userName}&password=${formData.password}`
        const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: json.toString(formData)
      });

      if (response.ok) {
        const data =await response.json();
        localStorage.setItem('userId', data.studentId)
        localStorage.setItem('userName', data.userName)
        localStorage.setItem('studentName', data.studentName)
        localStorage.setItem('mobileNo', data.mobileNo)
        localStorage.setItem('email', data.email)
        setError('');
        setFormData({
            userName:'',
            password:''
        })
        window.history.replaceState(null,'', '/');
        window.history.forward();
        navigate('/studentDashboard', {replace: true})
      }
       else {
        const errorData = await response.json();
        if(response.status===401){
            setError('UserName or password is incorrect')
        }else
            setError(errorData.error);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleRegister = () => {
      navigate('/registration');
  }

  return (
    <div className='loginForm'>
    <Container>
    <Row>
      <Col>
        <h4 className='text-center'>Login</h4>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group controlId="userName">
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
            <InputGroup.Text id='inputGroupPrepend'>@</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              isInvalid={!!validationErrors.userName}
            />
            <Form.Control.Feedback type="invalid">{validationErrors.userName}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              isInvalid={!!validationErrors.password}
            />
            <Form.Control.Feedback type="invalid">{validationErrors.password}</Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="button" onClick={handleLogin} style={{marginTop:'5px' }}>
            Login
          </Button>
          
        </Form>
        
        <div className='d-flex justify-content-center'>
            <p style={{fontSize:'17px'}}>Not a User?</p>
            <Nav.Link style={{fontSize:'17px', marginLeft:'20px', color:'blue'}} onClick={handleRegister}>Register</Nav.Link>
        </div>
        
      </Col>
    </Row>
  </Container>
  </div>
  )
}
