import './App.css';
import React,{useState, useEffect} from "react";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from './Table';
import {sortData} from './util'
import LineGraph from './LineGraph';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent
} from "@material-ui/core";

import 'leaflet/dist/leaflet.css';


function App() {

  const [countries,setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries,setMapCountries] = useState([])

  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response) => response.json())
    .then((data)=>{
      setCountryInfo(data);
    })
  },[]);

  useEffect(()=>{
    const getCountriesData = async () =>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2,
        }));
        const sortedData = sortData(data);
        setTableData(sortedData);
        setCountries(countries);
        setMapCountries(data);
      });
    };
    getCountriesData();
  },[])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode)

    const url = countryCode === 'worldwide' 
    ? "https://disease.sh/v3/covid-19/all"
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode)
      setCountryInfo(data);

      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(1);

    });
  }

  return (
    <div className="app">
      <div className="app_left">
        {/* header */}
        <div className="app_header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app_dropdown">
            <Select variant="outlined" value={country} onChange={onCountryChange}>
              <MenuItem value="worldwide">WorldWide</MenuItem>
              {
                countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
              
            </Select>
          </FormControl>
        </div>
        {/*  */}

        {/* card */}
        <div class="app_stat">
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title="Deaths Cases" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>
        {/* MAp */}
        <Map
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live cases by country</h3>
          <Table countries={tableData}/>
          <h3>Worldwide new cases</h3>
          <LineGraph/>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
