import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import requestPlanets from '../services/api';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [planetData, setPlanetData] = useState({
    data: [],
    filterByName: '',
  });

  useEffect(() => {
    const getData = async () => {
      const response = await requestPlanets();
      const data = response.results;
      setPlanetData((prevState) => ({ ...prevState, data }));
    };
    getData();
  }, []);

  const filterName = (name) => {
    setPlanetData((prevState) => ({ ...prevState, filterByName: name }));
  };

  return (
    <PlanetsContext.Provider value={ { ...planetData, filterName } }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default PlanetsProvider;
