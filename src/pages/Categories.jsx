import React from 'react'
import { HeaderWebsite } from '../components/Header'
import { Container, Footer, Header } from 'rsuite'
import SideBarQuizApp from '../components/SideBarQuizApp'
import { Category } from './Category'
import { FooterWebsite } from '../components/FooterWebsite'
const Categories = () => {
  return (
    <div>
      <Header style={{ position: "sticky", top: "0", zIndex: "100" }}>
        <HeaderWebsite />
      </Header>
      <Container style={{minHeight:'82vh'}}>
        <SideBarQuizApp />
        <Container>

          <Category />

        </Container>
      </Container>

      <Footer className=''>
        <FooterWebsite/>
      </Footer>
    </div>
  );
}

export default Categories