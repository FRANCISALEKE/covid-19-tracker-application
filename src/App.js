import React, { useEffect, useState} from 'react';
import './App.css';
import LineGraph from './components/LineGraph';
import CovidSummary from './components/CovidSummary';
import axios from './axios';

function App() {

    const [totalConfirmed, setTotalConfirmed] = useState(0);
    const [totalRecovered, setTotalRecovered] = useState(0);
    const [totalDeaths, setTotalDeaths] = useState(0);
    const [loading, setLoading] = useState(false);
    const [covidSummary, setCovidSummary] = useState ({})

  useEffect(() => {
    

    setLoading(true);
    axios.get('/summary')
    .then(res => {
      setLoading(false)


      if(res.status === 200){
        setTotalConfirmed(res.data.Global.TotalConfirmed);
        setTotalConfirmed(res.data.Global.NewRecovered);
        setTotalConfirmed(res.data.Global.TotalDeaths); 
        setCovidSummary(res.data);

      }

      
      console.log(res);
    })
    .catch(error => {
      console.log(error)
    })
      

  }, []);


  if(loading){
    return <p>Fetching data from api...! </p>
  }

  return (
    <div className="App">
      <CovidSummary 
          totalConfirmed={totalConfirmed}
          totalRecovered={totalRecovered}
          totalDeaths={totalDeaths}
          country={''}
     />

     <div>
      <select>
        {
          covidSummary.Countries && covidSummary.Countries.map(country => <option value={country.Slug}>{country.Country}</option>)
        }
      </select>
     
     </div>
        <LineGraph/>
      
    </div>
  );
}

export default App;
