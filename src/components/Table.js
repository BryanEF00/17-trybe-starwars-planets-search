import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { data, filterByName, filterByNumericValues } = useContext(PlanetsContext);
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

  return (
    <div>
      <div>
        {filterByNumericValues.length > 0
        && filterByNumericValues.map(({ column, comparison, value }) => (
          <h4 key={ column }>{`${column} ${comparison} ${value}`}</h4>
        ))}
      </div>
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
            && tableData.map((planetInfo, index) => (
              <tr key={ index }>
                {Object.values(planetInfo).map((info) => (
                  <td key={ info }>
                    {info}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
