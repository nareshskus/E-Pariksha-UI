import React, { useState } from 'react'
import { Container, Header, Sidebar, Sidenav, Content, Navbar, Nav } from 'rsuite';
import CogIcon from '@rsuite/icons/legacy/Cog';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import DashboardIcon from '@rsuite/icons/Dashboard';
import PageIcon from '@rsuite/icons/Page';
import { Link } from 'react-router-dom';
import GridIcon from '@rsuite/icons/Grid';
import HelpOutlineIcon from '@rsuite/icons/HelpOutline';
import PublicOpinionIcon from '@rsuite/icons/PublicOpinion';
import DetailIcon from '@rsuite/icons/Detail';
import '../cssPages/SideBar.css'
const SideBarQuizApp = () => {

    const NavToggle = ({ expand, onChange }) => {
        return (
          <Navbar appearance="subtle" className="nav-toggle">
            <Nav>
              <Nav.Menu
                noCaret
                placement="topStart"
                trigger="click"
                title={<CogIcon style={{ width: 20, height: 20 }} size="sm" />}
              >
                <Nav.Item>Help</Nav.Item>
                <Nav.Item>Settings</Nav.Item>
              </Nav.Menu>
            </Nav>
      
            <Nav pullRight>
              <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
                {expand ? <AngleLeftIcon /> : <AngleRightIcon />}
              </Nav.Item>
            </Nav>
          </Navbar>
        );
      };

      const [expand, setExpand] = useState(true);
  return (
      <div  style={{paddingRight:"30px"}}>
      {/* <Sticky> */}
        <Sidebar
          style={{ display: 'flex', flexDirection: 'column', backgroundColor:"rgb(199 239 255)", minHeight:'100%' }}
          width={expand ? 260 : 56}
          collapsible
        >
          <Sidenav expanded={expand} defaultOpenKeys={['2']} appearance="subtle">
            <Sidenav.Body>
              <Nav>
                <Nav.Item eventKey="1" active icon={<DashboardIcon />}>
                <Link to='/teacherDashboard' className='nav-link navItemText'>Dashboard</Link>
                </Nav.Item>
                <Nav.Item eventKey="2" icon={<GridIcon/>}>
                <Link to='/categories' className='nav-link navItemText'>Categories</Link>
                </Nav.Item>
                <Nav.Menu
                  eventKey="3"
                  trigger="hover"
                  title="Questions"
                  icon={<HelpOutlineIcon/>}
                  placement="rightStart"
                >
                  <Nav.Item eventKey="3-1"><Link to='/questionsList' className='nav-link navItemText'>Questions List</Link></Nav.Item>
                  <Nav.Item eventKey="3-2">
                    <Link to='/addQuestion' className='nav-link navItemText'>Add Questions</Link></Nav.Item>
                </Nav.Menu>
                <Nav.Menu
                  eventKey="4"
                  trigger="hover"
                  title="Exam"
                  icon={<PageIcon/>}
                  placement="rightStart"
                >
                  <Nav.Item eventKey="4-1">
                    <Link to='/scheduleExam' className='nav-link navItemText'>Add/ Modify Exams</Link></Nav.Item>
                  <Nav.Item eventKey="4-2">Add Questions to Exam</Nav.Item>
                  <Nav.Item eventKey="4-3">Modify</Nav.Item>
                  <Nav.Item eventKey="4-5">Add or Remove Students from Exam</Nav.Item>
                </Nav.Menu>

                <Nav.Item eventKey="5" icon={<DetailIcon/>}>
                <Link to='/studentResults' className='nav-link navItemText'>Student Results</Link>
                </Nav.Item>

                <Nav.Item eventKey="6" icon={<PublicOpinionIcon/>}>
                <Link to='/feedbacks' className='nav-link navItemText'>Student Feedbacks</Link>
                </Nav.Item>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
          <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
        </Sidebar>
    </div>
  );
};

export default SideBarQuizApp;
