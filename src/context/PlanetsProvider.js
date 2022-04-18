import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import requestPlanets from '../services/api';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [planetData, setPlanetData] = useState({
    data: [],
  });

  useEffect(() => {
    const getData = async () => {
      const response = await requestPlanets();
      const data = response.results;
      setPlanetData((prevState) => ({ ...prevState, data }));
    };
    getData();
  }, []);

  return (
    <PlanetsContext.Provider value={ { ...planetData } }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PlanetsProvider;
