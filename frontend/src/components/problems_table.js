import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Table } from 'react-bootstrap';

const ProblemsTable = () => {
  const data = useStaticQuery(graphql`
    query Problems {
      allStrapiProblem {
        nodes {
          strapi_id
          Description
          stakeholder {
            strapi_id
            name
          }
        }
      }
    }
  `);

  const problems = data.allStrapiProblem.nodes;

  return (
    <div className="container mt-5">
      <h1>Problems</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Description</th>
            <th>Stakeholder name</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem, index) => (
            <tr key={index}>
              <td>{problem.Description}</td>
              <td>
                {problem.stakeholder.name}
          
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProblemsTable;
