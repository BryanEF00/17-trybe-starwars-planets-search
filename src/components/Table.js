import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { data, filterByName } = useContext(PlanetsContext);
  const [tableData, setTableData] = useState([]);
  const [tableHeader, setTableHeader] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      data.map((planet) => delete planet.residents);
      setTableData(data);
      setTableHeader(Object.keys(data[0]));
    }
  }, [data]);

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
            && tableData.filter(({ name }) => name.toLowerCase().includes(filterByName))
              .map((planetInfo, index) => (
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
