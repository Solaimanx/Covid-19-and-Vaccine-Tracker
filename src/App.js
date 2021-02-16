import React, { useState, useEffect } from "react";
import "./App.css";

import {
  Select,
  FormControl,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});

  /// STATE = how to write a veriable in REACT <<<<
  //// https://disease.sh/v3/covid-19/countries >>> API request link

  /// USEEFFECT =   Run a piece of code base on a given conditions

  useEffect(() => {
    // The code inside here will run once , when the component loads not again
    // async -> send a request , wait for it, do something with the info

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((
            country /// map = Loop through with an list [item1, item2, item3 ] and returning an object in a shape
          ) => ({
            name: country.country, // united state , uinted kindgom , bangladesh
            value: country.countryInfo.iso2, // UK , USA, BD, FR,
          }));
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);

        // all of the data from the country response
        setCountryInfo(data);
      });
    ///
  };



  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID 19 TRACKER</h1>
          <FormControl className="app__dropdown">
            {/* onchnage function will run once something has change from the select element */}
            <Select
              veriant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              {/* Loop through all the countries and show a drop down list of the option  */}
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={1232} total={7000} />
           
          <InfoBox title="Recovered" cases={5232} total={2000} />
           
          <InfoBox title="Coronavirus Cases" cases={8232} total={8000} />
        </div>

        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>life Cases by country</h3>
          {/* Table */}
          <h3>Worldwide new cases</h3>
          {/* Graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
