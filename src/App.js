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
    const [days, setDays] = useState(7);
    const [country, setCountry] = useState('');
    const [coronaCountAr, setCoronaCountAr] = useState([]);

  useEffect(() => {
    

    setLoading(true);
    axios.get('/summary')
    .then(res => {
      setLoading(false)


      if(res.status === 200){
        setTotalConfirmed(res.data.Global.TotalConfirmed);
        setTotalRecovered(res.data.Global.NewRecovered);
        setTotalDeaths(res.data.Global.TotalDeaths); 
        setCovidSummary(res.data);

      }

      
      console.log(res);
    })
    .catch(error => {
      console.log(error)
    })
      

  }, []);

  const formatDate = (date) => {
    const d = new Date(date);
    //2020-05-04;
    const year = d.getFullYear();
    const month = `0${d.getMonth() + 1}` .slice(-2); //12 -> 012 -> 12
    const _date = d.getDate();
    return `${year}-${month}-${_date}`;
  }

  const countryHandler = (e) => {
    setCountry(e.target.value);
    const d = new Date();
    const to = formatDate(d);
    const from = formatDate(d.setDate(d.getDate() - 7));

    // console.log(from , to);

     getCoronaReportByDateRange(e.target.value, from, to );
  }

  const daysHandler = (e) => {
    setDays(e.target.value);
    
  }

  const getCoronaReportByDateRange = (countrySlug, from, to) => {

    axios.get(`/country/${countrySlug}/status/confirmed?from=${from}T00:00:00Z&to=${to}T00:00:00Z`)
    .then(res => {
      console.log(res);

      const yAxisCoronaCount = res.data.map(d => d. Cases);
      setCoronaCountAr(yAxisCoronaCount);
    })
    .catch(error => {
      console.log(error);
    })
  }
  


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
      <select value={country} onChange={countryHandler}>
        {
          covidSummary.Countries && covidSummary.Countries.map(country => <option key={country.Slug} value={country.Slug}>{country.Country}</option>)
        }
      </select>
      <select value={days} onChange={daysHandler}>
        <option value="7">Last 7 days</option>
        <option value="30">Last 30 days</option>
        <option value="90">Last 90 days</option>
      </select>
     
     </div>
        <LineGraph
          yAxis={coronaCountAr}
        />
      
    </div>
  );
}

export default App;
