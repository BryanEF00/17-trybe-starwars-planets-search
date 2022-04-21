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
      filterByNumericValues.forEach(({ column, comparison, value }) => {
        if (comparison === 'maior que') {
          const getData = newData.filter((planet) => planet[column] > Number(value));
          setTableData(getData);
        }
        if (comparison === 'menor que') {
          const getData = newData.filter((planet) => planet[column] < Number(value));
          setTableData(getData);
        }
        if (comparison === 'igual a') {
          const getData = newData.filter((planet) => planet[column] === value);
          setTableData(getData);
        }
      });
    } else { setTableData(newData); }
  }, [data, filterByName, filterByNumericValues]);

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
