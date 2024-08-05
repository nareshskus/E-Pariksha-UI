import React, { useState } from 'react'
import { Alert, Button, Col, Container, Form, Nav, Row } from 'react-bootstrap'
import Swal from 'sweetalert2';
import '../../cssPages/registrationPage.css'
import { Link, useNavigate } from 'react-router-dom';

export const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        userName: '',
        studentName: '',
        mobileNo: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [validationErrors, setValidationErrors] = useState({});
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setFormData({...formData,  [name]: value});
        setValidationErrors({ ...validationErrors, [name]: '' });
    }

    const handleRegistration = async () => {
        const errors = {};
        if (!formData.userName) {
          errors.userName = 'Username is required';
        }
        if (!formData.studentName) {
          errors.studentName = 'Full Name is required';
        }
        if (!/^\d{10}$/.test(formData.mobileNo)) {
          errors.mobileNo = 'Enter a valid 10-digit mobile number';
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          errors.email = 'Enter a valid email address';
        }
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{12,}$/.test(formData.password)) {
          errors.password =
            'Password must be at least 12 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.';
        }
        if (formData.password !== formData.confirmPassword) {
          errors.confirmPassword = 'Passwords do not match';
        }
    
        if (Object.keys(errors).length > 0) {
          setValidationErrors(errors);
          return;
        }

        try {
          const response = await fetch('http://localhost:8080/students/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            setFormData({
                userName: '',
                studentName: '',
                mobileNo: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
            Swal.fire({
                title: "User Registered Successfully.",
                icon: "success"
              });
              navigate('/',{replace:true});
            setError('');
          } else {
            const errorData = await response.json();
            setError(errorData.error);
          }
        } catch (error) {
          console.error('Error during registration:', error);
        }
      };

      const handleLogin = () => {
          navigate('/')
      }

  return (
    <div className='d-flex justify-content-evenly'>
    <div className='registrationForm'>
        <Container>
            <Row>
                <Col>
                    <h4 className='text-center'>Registration</h4>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form autoComplete='off'>
                        <Form.Group controlId="userName">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            name="userName"
                            value={formData.userName}
                            onChange={handleInputChange}
                            isInvalid={!!validationErrors.userName}
                            autoComplete='off'
                        />
                        <Form.Control.Feedback type="invalid">{validationErrors.userName}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="studentName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter full name"
                            name="studentName"
                            value={formData.studentName}
                            onChange={handleInputChange}
                            isInvalid={!!validationErrors.studentName}
                        />
                        <Form.Control.Feedback type="invalid">{validationErrors.studentName}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="mobileNo">
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter mobile number"
                            name="mobileNo"
                            value={formData.mobileNo}
                            onChange={handleInputChange}
                            isInvalid={!!validationErrors.mobileNo}
                        />
                        <Form.Control.Feedback type="invalid">{validationErrors.mobileNo}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            isInvalid={!!validationErrors.email}
                        />
                        <Form.Control.Feedback type="invalid">{validationErrors.email}</Form.Control.Feedback>
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
                            autoComplete='off'
                        />
                        <Form.Control.Feedback type="invalid">{validationErrors.password}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            isInvalid={!!validationErrors.confirmPassword}
                        />
                        <Form.Control.Feedback type="invalid">{validationErrors.confirmPassword}</Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="primary" type="button" onClick={handleRegistration} style={{marginTop:'5px'}}>
                        Register
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
        </div>

        <div className='text-center other' >
                <p className='d-flex justify-content-center' 
                style={{fontSize:'15px', marginTop:'4px'}}>Already Registered? 
                <Nav.Link style={{color:'blue', marginLeft:'10px'}} onClick={()=> handleLogin()}>Login</Nav.Link></p>
                <p>or sign up with:</p>
        </div>
    </div>
  )
}
