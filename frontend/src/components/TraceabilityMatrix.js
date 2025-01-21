import React from 'react';
import { Table } from 'react-bootstrap';

const TraceabilityMatrix = ({ reqs, view }) => {
  if (!Array.isArray(reqs)) {
    return <p>No requirements yet here.</p>;
  }

  const renderTable = () => {
    switch (view) {
      case 'basic':
        return (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {reqs.map((req) => (
                <tr key={req.id}>
                  <td>{req.strapi_id}</td>
                  <td>{req.Name}</td>
                  <td>{req.Description}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        );
      case 'activity_map':
        return (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Source Activity</th>
                <th>Source Requirement</th>
              </tr>
            </thead>
            <tbody>
              {reqs.map((req) => (
                <tr key={req.id}>
                  <td>{req.strapi_id}</td>
                  <td>{req.Name}</td>
                  <td>{req.source_activity ? req.source_activity.Name : ''}</td>
                  <td>{req.strapi_parent ? req.strapi_parent.Name : ''}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        );
      case 'stakeholder':
        return (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Stakeholder</th>
              </tr>
            </thead>
            <tbody>
              {reqs.map((req) => (
                <tr key={req.id}>
                  <td>{req.strapi_id}</td>
                  <td>{req.Name}</td>
                  <td>{req.Stakeholder ? req.Stakeholder.Name : ''}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        );
      case 'req_trace':
        return (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Parent Requirement</th>
                <th>Child Requirements</th>
              </tr>
            </thead>
            <tbody>
              {reqs.map((req) => (
                <tr key={req.id}>
                  <td>{req.strapi_id}</td>
                  <td>{req.Name}</td>
                  <td>{req.Description}</td>
                  <td>{req.strapi_parent ? req.strapi_parent.Name : ''}</td>
                  <td>{req.children ? req.children.map(child => child.Name).join(', ') : ''}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        );
      default:
        return <p>Invalid view selected.</p>;
    }
  };

  return (
    <div className="container mt-5">
      <h1>Requirements Manager</h1>
      {renderTable()}
    </div>
  );
};

export default TraceabilityMatrix;
