import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filter() {
  const {
    filterByName, filterName, filterNumeric, filterByNumericValues,
    removeFilter, removeAllFilters,
  } = useContext(PlanetsContext);

  const filters = {
    columns: [
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
    ],
    comparison: ['maior que', 'menor que', 'igual a'],
  };

  const [columnFilters, setColumnFilters] = useState(filters.columns);
  const [numericFilter, setNumericFilter] = useState(
    { column: 'population',
      comparison: 'maior que',
      value: 0,
    },
  );

  const handleChange = ({ target: { name, value } }) => {
    setNumericFilter({ ...numericFilter, [name]: value });
  };

  const handleSubmit = () => {
    filterNumeric(numericFilter);
    setColumnFilters(columnFilters.filter((filter) => filter !== numericFilter.column));
    setNumericFilter({ ...numericFilter, column: columnFilters[1] });
  };

  const handleRemove = ({ target: { id } }) => {
    const activeFilters = filterByNumericValues.filter(({ column }) => column !== id);

    if (activeFilters.length === 0) {
      setColumnFilters(filters.columns);
    } else {
      const availableFilters = activeFilters.reduce((acc, currentFilter) => {
        const { column } = currentFilter;

        return acc.filter((filter) => filter !== column);
      }, [...filters.columns]);

      setColumnFilters(availableFilters);
    }

    removeFilter(id);
  };

  const handleRemoveAll = () => {
    removeAllFilters();
    setColumnFilters(filters.columns);
  };

  return (
    <>
      <div>
        <input
          data-testid="name-filter"
          type="text"
          value={ filterByName }
          onChange={ (event) => filterName(event.target.value) }
        />
      </div>
      <div>
        <select
          data-testid="column-filter"
          name="column"
          value={ numericFilter.column }
          onChange={ handleChange }
          disabled={ columnFilters.length === 0 }
        >
          { columnFilters.map((column, index) => (
            <option key={ index } value={ column }>
              {column}
            </option>
          ))}
        </select>
        <select
          data-testid="comparison-filter"
          name="comparison"
          value={ numericFilter.comparison }
          onChange={ handleChange }
        >
          {
            filters.comparison.map((comparison, index) => (
              <option key={ index } value={ comparison }>
                {comparison}
              </option>
            ))
          }
        </select>
        <input
          data-testid="value-filter"
          type="number"
          name="value"
          value={ numericFilter.value }
          onChange={ handleChange }
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ handleSubmit }
        >
          FILTRAR
        </button>
        <button
          data-testid="button-remove-filters"
          type="button"
          onClick={ handleRemoveAll }
        >
          REMOVER FILTROS
        </button>
        <div>
          {filterByNumericValues.length > 0
        && filterByNumericValues.map(({ column, comparison, value }) => (
          <div data-testid="filter" key={ column }>
            <h4>
              {`${column} ${comparison} ${value}`}
            </h4>
            <button
              type="button"
              id={ column }
              onClick={ handleRemove }
            >
              X
            </button>
          </div>
        ))}
        </div>
      </div>
    </>
  );
}

export default Filter;
