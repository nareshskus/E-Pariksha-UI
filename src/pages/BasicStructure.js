import React from "react";
import { Container, Header, Content, Footer, Sidebar } from "rsuite";
export const BasicStructure = () => {
  return (
    <div className="show-container">

      <Container>
        <Header>Header</Header>
        <Container>
          <Content>Content</Content>
          <Sidebar>Sidebar</Sidebar>
        </Container>
        <Footer>Footer</Footer>
      </Container>
    </div>
  );
};
