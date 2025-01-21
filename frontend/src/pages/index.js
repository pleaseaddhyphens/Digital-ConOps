import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Container, Row, Col, Navbar, Button } from 'react-bootstrap';
import StakeholdersTable from "../components/stakeholders_table"
import NeedsTable from "../components/needs_table"
import ProblemsTable from "../components/problems_table"
import SolutionDropdown from '../components/SolutionDropdown';
import SolutionOverview from '../components/SolutionOverview';
import Chatbot from '../components/ChatBot';


const IndexPage = () => {
  // State to manage the active button
  const [activeButton, setActiveButton] = useState('');

  // Function to handle button click
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    // You can perform additional actions based on the clicked button
  };
  const [selectedSolution1, setSelectedSolution1] = useState(null)
  const [selectedSolution2, setSelectedSolution2] = useState(null)
  
  const data = useStaticQuery(graphql`
query Solution {
  allStrapiSolution {
    nodes {
      id
      Name
      Description
      processes {
        Name
        Description
        Cost
        time
        strapi_parent {
          Name
          id
        }
        id
        enterprises {
          Name
          Description
        }
        technologies {
          Name
          Description
        }
      }
    }
  }
}
  `);
  const solutions = data.allStrapiSolution.nodes;
  
 

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand style={{ margin: '0 10px' }}> Project: ECC correction algorithm </Navbar.Brand>
        <Container className="d-flex justify-content-start">
          <Button variant="success" className="mr-2" style={{ margin: '0 10px' }}>Open project</Button>
          <Button variant="success" className="mr-2" style={{ margin: '0 10px' }}>Save</Button>
          <Button variant="success" className="mr-2" style={{ margin: '0 10px' }}>Edit mode</Button>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container fluid>
        <Row>
          {/* Left Container */}
          <Col lg={2} className="p-0">
            <div className="sidebar" style={{ margin: '0 10px' }}>
              
              <button
                className={`btn btn-primary ${activeButton === 'Stakeholders' ? 'active' : ''}`}
                style={{ width: '100%', marginBottom: '10px', marginTop: '10px'}}
                onClick={() => handleButtonClick('Stakeholders')}
              >
                Stakeholders
              </button>
              <button
                className={`btn btn-primary ${activeButton === 'Needs' ? 'active' : ''}`}
                style={{ width: '100%', marginBottom: '10px' }}
                onClick={() => handleButtonClick('Needs')}
              >
                Needs
              </button>
              <button
                className={`btn btn-primary ${activeButton === 'Problems' ? 'active' : ''}`}
                style={{ width: '100%', marginBottom: '10px' }}
                onClick={() => handleButtonClick('Problems')}
              >
                Problems
              </button>
              <hr />
              <button
                className={`btn btn-primary ${activeButton === 'Solutions' ? 'active' : ''}`}
                style={{ width: '100%', marginBottom: '10px' }}
                onClick={() => handleButtonClick('Solutions')}
              >
                Compare potential solutions
              </button>

              <a 
              class="btn btn-primary" href="requirements_manager" role="button"
              style={{ width: '100%', marginBottom: '10px' }}>
                Requirements
                </a>

              
              
              
            </div>

            
          </Col>

          {/* Main Container */}
          <Col lg={7} className="main-content" style={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
          
            {activeButton === 'Stakeholders' && <StakeholdersTable />}
            {activeButton === 'Needs' && <NeedsTable />}
            {activeButton === 'Problems' && <ProblemsTable />}
            {activeButton === 'Solutions' && (
              <>
                <Container>
                  <Row className="justify-content-center" style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <Col xs={12} lg={6} className="d-flex justify-content-center">
                      <SolutionDropdown
                        solutions={solutions}
                        onSelect={setSelectedSolution1}
                        label="Select Solution 1"
                      />

                    </Col>
                    <Col xs={12} lg={6} className="d-flex justify-content-center">
                      <SolutionDropdown
                        solutions={solutions}
                        onSelect={setSelectedSolution2}
                        label="Select Solution 2"
                      />
                      
                    </Col>
                  </Row>
                  <Row className="justify-content-center" style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <Col xs={12} lg={6}>
                      {selectedSolution1 && (
                        <div style={{ marginTop: '20px', marginLeft: '20px' }}>

                              <SolutionOverview
                                solution={selectedSolution1}
                                activity={selectedSolution1.processes}
                                
                              />
                        </div>
                      )}
                    </Col>
                    <Col xs={12} lg={6}>
                      {selectedSolution2 && (
                        <div style={{ marginTop: '20px', marginLeft: '20px' }}>
                          <SolutionOverview
                                solution={selectedSolution2}
                                activity={selectedSolution2.processes}
                                
                              />
                        </div>
                      )}
                    </Col>
                  </Row>
                </Container>
              </>
            )}
          </Col>

          {/* Chat bot container */}
          <Col lg={3}>
          <Chatbot/>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default IndexPage;
