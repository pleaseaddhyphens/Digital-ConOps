import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Collapse } from 'react-bootstrap';

const SolutionOverview = ({ solution, activity }) => {
  const [openActivities, setOpenActivities] = useState({});

  const toggleActivity = (activityName) => {
    setOpenActivities((prevState) => ({
      ...prevState,
      [activityName]: !prevState[activityName],
    }));
  };

  const calculateSums = (act) => {
    let totalCost = act.Cost || 0; // || is state default value in that case
    let totalTime = act.time || 0;
    // let because variables that will be reassigned as we accumulate the cost and time of the child activities.

    const childActivities = activity.filter(
      (childAct) => childAct.strapi_parent && childAct.strapi_parent.Name === act.Name
    );

    childActivities.forEach((child) => {
      const childSums = calculateSums(child);
      totalCost += childSums.totalCost;
      totalTime += childSums.totalTime;
    });

    return { totalCost, totalTime };
  };

  const renderActivity = (act, level = 0) => {
    const { totalCost, totalTime } = calculateSums(act);

    const childActivities = activity.filter(
      (childAct) => childAct.strapi_parent && childAct.strapi_parent.Name === act.Name
    );

    return (
      <div key={act.Name} style={{ marginLeft: `${level * 40}px`, marginBottom: '10px' }}>
        <h5 style={{ marginBottom: '5px' }}>{act.Name}</h5>
        <div style={{ marginBottom: '5px' }}>
          <p style={{ margin: '2px 0' }}><strong>Description:</strong> {act.Description}</p>
          <p style={{ margin: '2px 0' }}><strong>Objective:</strong> </p>
          <p style={{ margin: '2px 0' }}><strong>Technology:</strong> {act.technologies.map((tech) => tech.Name).join(', ')}</p>
          <p style={{ margin: '2px 0' }}><strong>Enterprise:</strong> {act.enterprises.map((ent) => ent.Name).join(', ')}</p>
          <p style={{ margin: '2px 0' }}><strong>Cost:</strong> {totalCost ? `$${totalCost}` : 'N/A'}</p>
          <p style={{ margin: '2px 0' }}><strong>Time:</strong> {totalTime ? `${totalTime} days` : 'N/A'}</p>
        </div>
        {childActivities.length > 0 && (
          <>
            <Button
              variant="success"
              onClick={() => toggleActivity(act.Name)}
              aria-controls={`collapse-${act.Name}`}
              aria-expanded={openActivities[act.Name]}
            >
              {openActivities[act.Name] ? 'Hide Sub-Activities' : 'Show Sub-Activities'}
            </Button>
            <Collapse in={openActivities[act.Name]}>
              <div id={`collapse-${act.Name}`} style={{ marginTop: '10px' }}>
                {childActivities.map((childAct) => (
                  <div key={childAct.Name}>
                    {renderActivity(childAct, level + 1)}
                  </div>
                ))}
              </div>
            </Collapse>
          </>
        )}
      </div>
    );
  };

  const renderActivities = (activities, parentName = null, level = 0) => {
    const filteredActivities = activities.filter((act) => {
      if (act.strapi_parent) {
        return act.strapi_parent.Name === parentName;
      }
      return parentName === null;
    });

    return (
      <div>
        {filteredActivities.map((act, index) => (
          <div key={act.Name}>
            {index > 0 && <hr className={`level-${level}`} style={{ margin: '10px 0' }} />}
            <div style={{ position: 'relative', marginBottom: '10px' }}>
              {renderActivity(act, level)}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h5 style={{ marginBottom: '10px'}}>Solution name: {solution.Name}</h5>
      <p style={{ marginBottom: '10px' }}>{solution.Description}</p>
      <div>
        <p style={{ marginBottom: '10px' }}> <em>Activities to be conducted during the solution:</em></p>
        {renderActivities(activity)}
      </div>
    </div>
  );
};

export default SolutionOverview;
