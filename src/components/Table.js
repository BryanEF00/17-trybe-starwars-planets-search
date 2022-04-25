import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

// Referência para .sort(): https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value

// Referência para sort com 1 e -1 de retorno: https://stackoverflow.com/questions/28835311/moving-array-elements-to-end-of-array-by-sorting

function Table() {
  const { data, filterByName, filterByNumericValues, order } = useContext(PlanetsContext);
  const [tableData, setTableData] = useState([]);
  const [tableHeader, setTableHeader] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      data.map((planet) => delete planet.residents);
      setTableData(data);

      setTableHeader(Object.keys(data[0]));
    }
  }, [data]);

  useEffect(() => {
    const newData = data.filter(
      ({ name }) => name.toLowerCase().includes(filterByName.toLowerCase()),
    );

    if (filterByNumericValues.length > 0) {
      const applyFilters = filterByNumericValues.reduce((acc, filter) => {
        const { column, comparison, value } = filter;
        if (comparison === 'maior que') {
          const getData = acc.filter((planet) => planet[column] > Number(value));
          acc = getData;
        }
        if (comparison === 'menor que') {
          const getData = acc.filter((planet) => planet[column] < Number(value));
          acc = getData;
        }
        if (comparison === 'igual a') {
          const getData = acc.filter((planet) => planet[column] === value);
          acc = getData;
        }

        return acc;
      }, [...newData]);

      setTableData(applyFilters);
    } else { setTableData(newData); }
  }, [data, filterByName, filterByNumericValues]);

  const negative = -1;

  const sortASC = (a, b) => {
    if (a[order.column] === 'unknown') { return 1; }
    if (b[order.column] === 'unknown') { return negative; }
    return a[order.column] - b[order.column];
  };
  const sortDESC = (a, b) => {
    if (a[order.column] === 'unknown') { return 1; }
    if (b[order.column] === 'unknown') { return negative; }
    return b[order.column] - a[order.column];
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            {tableHeader.length > 0
            && tableHeader.map((value, index) => (
              <th key={ index }>
                {value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0
            && tableData.sort((a, b) => {
              if (order.active) {
                if (order.sort === 'ASC') {
                  return sortASC(a, b);
                }
                if (order.sort === 'DESC') {
                  return sortDESC(a, b);
                }
              }
              return a.name.localeCompare(b.name);
            })
              .map((planetInfo, index) => (
                <tr key={ index }>
                  {Object.values(planetInfo).map((info, infoIndex) => {
                    if (infoIndex === 0) {
                      return (
                        <td data-testid="planet-name" key={ info }>
                          {info}
                        </td>
                      );
                    }
                    return (
                      <td key={ info }>
                        {info}
                      </td>
                    );
                  })}
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
