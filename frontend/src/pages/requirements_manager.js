import React, { useState } from 'react';
import { Container, Navbar, Button, Row, Col } from 'react-bootstrap';
import TraceabilityMatrix from '../components/TraceabilityMatrix';
import { graphql, useStaticQuery } from 'gatsby';
import Chatbot from '../components/ChatBot';

const ReqPage = () => {
  const data = useStaticQuery(graphql`
    query reqs {
      allStrapiRequirement {
        nodes {
          id
          Name
          Description
          strapi_id
          source_activity {
            Name
            id
          
          }
        }
      }
    }
  `);

  const requirements = data.allStrapiRequirement.nodes;
  
  // Define state for active button
  const [activeButton, setActiveButton] = useState('basic');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand style={{ margin: '0 10px' }} href="/"> Project: ECC correction algorithm </Navbar.Brand>
        <Container className="d-flex justify-content-start">
          <Button variant="success" className="mr-2" style={{ margin: '0 10px' }} href="/">Home</Button>
          <Button variant="success" className="mr-2" style={{ margin: '0 10px' }}>Open project</Button>
          <Button variant="success" className="mr-2" style={{ margin: '0 10px' }}>Save</Button>
          <Button variant="success" className="mr-2" style={{ margin: '0 10px' }}>Edit mode</Button>
        </Container>
      </Navbar>
      
      <Container fluid>
        <Row>
          <Col lg={2}>
            <div className="sidebar" style={{ margin: '10px 0' }}>
              <button
                className={`btn btn-primary ${activeButton === 'basic' ? 'active' : ''}`}
                style={{ width: '100%', marginBottom: '10px' }}
                onClick={() => handleButtonClick('basic')}
              >
                Basic
              </button>
              <button
                className={`btn btn-primary ${activeButton === 'activity_map' ? 'active' : ''}`}
                style={{ width: '100%', marginBottom: '10px' }}
                onClick={() => handleButtonClick('activity_map')}
              >
                Activity mapping
              </button>
              <button
                className={`btn btn-primary ${activeButton === 'stakeholder' ? 'active' : ''}`}
                style={{ width: '100%', marginBottom: '10px' }}
                onClick={() => handleButtonClick('stakeholder')}
              >
                Stakeholders mapping
              </button>
              <button
                className={`btn btn-primary ${activeButton === 'req_trace' ? 'active' : ''}`}
                style={{ width: '100%', marginBottom: '10px' }}
                onClick={() => handleButtonClick('req_trace')}
              >
                Requirements traceability mapping
              </button>
            </div>
          </Col>
          <Col lg={7}>
            <TraceabilityMatrix reqs={requirements} view={activeButton} />
          </Col>
          <Col lg={3}>
            <Chatbot />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ReqPage;
