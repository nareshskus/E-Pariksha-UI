import React from 'react'
import { Button, Container, Nav, Navbar, NavbarBrand } from 'react-bootstrap'
import logo from '../../images/logo.png'
import { useNavigate } from 'react-router-dom'
export const HeaderBeforeLogin = () => {
    const backGradient = {   
        background: 'rgb(40,102,203)',
        background: 'linear-gradient(27deg, rgba(40,102,203,1) 33%, rgba(8,224,188,1) 96%, rgba(6,232,187,1) 100%)'
    }

    const navigate = useNavigate();
  return (
    <div>
        <Navbar style={backGradient}>
            <Container>
                <Navbar.Brand href='/' style={{textDecoration:'none'}}>
                    <img src={logo} width='70px' height='35px'/> E-Pariksha
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-navs'/>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'></Nav>
                    <Button variant='outline-light' onClick={()=> navigate('/teacherDashboard',{replace: true})}>Teacher Dashboard</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}
