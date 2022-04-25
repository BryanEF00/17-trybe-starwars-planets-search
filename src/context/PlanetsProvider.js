import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import requestPlanets from '../services/api';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [planetData, setPlanetData] = useState({
    data: [],
    filterByName: '',
    filterByNumericValues: [],
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

  const filterNumeric = (filter) => {
    setPlanetData((prevState) => ({
      ...prevState,
      filterByNumericValues: [...prevState.filterByNumericValues, filter],
    }));
  };

  const removeFilter = (id) => {
    setPlanetData((prevState) => ({
      ...prevState,
      filterByNumericValues: prevState.filterByNumericValues
        .filter(({ column }) => column !== id),
    }));
  };

  const removeAllFilters = () => {
    setPlanetData((prevState) => ({
      ...prevState,
      filterByNumericValues: [],
    }));
  };

  const context = {
    ...planetData, filterName, filterNumeric, removeFilter, removeAllFilters,
  };

  return (
    <PlanetsContext.Provider
      value={ context }
    >
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default PlanetsProvider;
