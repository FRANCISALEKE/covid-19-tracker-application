import React from 'react';
import './App.css';
import LineGraph from './components/LineGraph';
import CovidSummary from './components/CovidSummary';

function App() {
  return (
    <div className="App">
      <CovidSummary 
        totalConfirmed={0}
        totalRecovered={0}
        totalDeaths={0}
        country={'Nigeria'}
      />
    <LineGraph/>
      
    </div>
  );
}

export default App;
