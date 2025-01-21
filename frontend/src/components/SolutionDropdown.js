import React from 'react';
import { Dropdown } from 'react-bootstrap';

const SolutionDropdown = ({ solutions, onSelect, label }) => {

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {label}
      </Dropdown.Toggle>
      <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'scroll' }}>
        {solutions.map((solution) => (
          <Dropdown.Item key={solution.id} onClick={() => onSelect(solution)}>
            {solution.Name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SolutionDropdown;
