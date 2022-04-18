import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filter() {
  const { filterByName, filterName } = useContext(PlanetsContext);

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        value={ filterByName }
        onChange={ (event) => filterName(event.target.value) }
      />
    </div>
  );
}

export default Filter;
