import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Table } from 'react-bootstrap';

const NeedsTable = () => {
  const data = useStaticQuery(graphql`
    query Needs {
      allStrapiNeed{
        nodes {
          strapi_id
          Description
          stakeholder{
            name
            }
          
        }
      }
    }
  `);

  const needs = data.allStrapiNeed.nodes;

  return (
    <div className="container mt-5">
      <h1>Needs</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Discription</th>
            <th>Stakeholder name</th>
          </tr>
        </thead>
        <tbody>
          {needs.map((need) => (
            <tr key={need.strapi_id}>
              <td>{need.Description}</td>
              <td>{need.stakeholder.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default NeedsTable;
