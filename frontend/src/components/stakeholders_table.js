import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Table } from 'react-bootstrap';

const StakeholdersTable = () => {
  const data = useStaticQuery(graphql`
    query Stakeholders {
      allStrapiStakehlder{
        nodes {
          name
          type
          comments
        }
      }
    }
  `);

  const stakeholders = data.allStrapiStakehlder.nodes;

  return (
    <div className="container mt-5">
      <h1>Stakeholders</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {stakeholders.map((stakeholder) => (
            <tr key={stakeholder.id}>
              <td>{stakeholder.name}</td>
              <td>{stakeholder.type}</td>
              <td>{stakeholder.comments}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StakeholdersTable;
