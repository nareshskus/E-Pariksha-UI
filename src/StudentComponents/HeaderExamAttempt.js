import React, { useState } from 'react'
import { Button, Container, Modal, Nav, Navbar } from 'react-bootstrap'
import logo from '../images/logo.png'
import { StopWatch } from './StopWatch'
import { FaFlag } from "react-icons/fa";
export const HeaderExamAttempt = ({onSubmit}) => {
    const backGradient = {   
        background: 'rgb(40,102,203)',
        background: 'linear-gradient(27deg, rgba(40,102,203,1) 33%, rgba(8,224,188,1) 96%, rgba(6,232,187,1) 100%)'
    }

    const [lgShow, setLgShow] = useState(false);
  return (
    <div>
        <Navbar style={backGradient}>
            <Container>
                <Navbar.Brand style={{color:'white'}}>
                    <img src={logo} width='70px' height='35px'/>
                    E-Pariksha
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-navs'/>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'></Nav>
                    <StopWatch onSubmit={onSubmit}/>
                    <Button style={{marginLeft:'30px'}} variant='outline-light' onClick={()=> setLgShow(true)}>Guidelines</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Guidelines
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h5>1. Don't go back in the browser while attempting the exam.</h5><br/>
            <h5>2. Don't remove fullscreen mode or try to switch the tabs while attempting exam.</h5><br/>
            <h5>3. <Button variant='outline-warning' size='sm'><FaFlag/></Button> button will help to flag any particular question.</h5><br/>
            <h5>4. <Button variant='danger' size='sm'>X</Button> button shows the unattempted questions.</h5><br/>
            <h5>5. <Button variant='primary' size='sm'>X</Button> button shows the attempted questions.</h5><br/>
            <h5>6. <Button variant='warning' size='sm'>X</Button> button shows the flag questions.</h5><br/>
            <h5>7. By clicking buttons having number you can directly scroll to that specific question.</h5><br/>
            <h5>8. Once you are completed with the exam then only click the submit button.</h5><br/>
            <h5>9. Once submitted then you will not be able to re-attempt the exam.</h5><br/>
            <h5>10. In case of any other issue while attempting exam contact-: (support@epariksha.com)</h5><br/>
        </Modal.Body>
      </Modal>
    </div>
  )
}
