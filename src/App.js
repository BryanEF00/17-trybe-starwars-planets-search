import React from 'react';
import './App.css';
import Filter from './components/Filter';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <Filter />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
