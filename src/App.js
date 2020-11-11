import React from 'react';
import './App.css';
import LineGraph from './components/LineGraph';
import CovidSummary from './components/CovidSummary';
import axios from './axios';

function App() {


  useEffect(() => {
    


  }, [])

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
