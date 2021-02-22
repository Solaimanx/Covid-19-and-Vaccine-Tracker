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
import Table from "./Table";
import "./Table.css";
import { sortData, prettyPrintStat } from "./util";
import LineGraph from "./LineGraph";
import LineGraphVaccine from "./LineGraphVaccine";
import "leaflet/dist/leaflet.css";
import LinkIcon from '@material-ui/icons/Link';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';





const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState([34.80736, -40.4796]);
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  /// STATE = how to write a veriable in REACT <<<<
  //// https://disease.sh/v3/covid-19/countries >>> API request link
  /// USEEFFECT =   Run a piece of code base on a given conditions
  // The code inside here will run once , when the component loads not again
  // async -> send a request , wait for it, do something with the info

  useEffect(() => {
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
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
          setMapCountries(data);
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
        setCountryInfo(data);
        countryCode === "worldwide"
          ? setMapCenter([34.80736, -40.4796])
          : setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  return (
    <div className="app">
      <div className="app__top">
        <div className="app__left">
          <div className="app__header">
            <h1>COVID 19 TRACKER</h1>
            <FormControl className="app__dropdown">
              {/* onchnage function will run once something has change from the select element */}
              <Select
                variant="outlined"
                onChange={onCountryChange}
                value={country}
              >
                {/* Loop through all the countries and show a drop down list of the option  */}
                <MenuItem value="worldwide" name={country.name}>
                  Worldwide
                </MenuItem>
                {countries.map((country) => (
                  <MenuItem value={country.value} name={country.name}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="app__stats">
            <InfoBox
              isRed
              active={casesType === "cases"}
              onClick={(e) => setCasesType("cases")}
              title="Coronavirus Cases"
              cases={prettyPrintStat(countryInfo.todayCases)}
              total={prettyPrintStat(countryInfo.cases)}
            />
             
            <InfoBox
              active={casesType === "recovered"}
              onClick={(e) => setCasesType("recovered")}
              title="Recovered"
              cases={prettyPrintStat(countryInfo.todayRecovered)}
              total={prettyPrintStat(countryInfo.recovered)}
            />
             
            <InfoBox
              isRed
              active={casesType === "deaths"}
              onClick={(e) => setCasesType("deaths")}
              title="Deaths"
              cases={prettyPrintStat(countryInfo.todayDeaths)}
              total={prettyPrintStat(countryInfo.deaths)}
            />
          </div>

          <Map
            casesType={casesType}
            countries={mapCountries}
            center={mapCenter}
            zoom={mapZoom}
          />
        </div>
        <Card className="app__right">
          <CardContent>
            <h3>Live Cases by country</h3>
            <Table countries={tableData} />
            <h3 className="app__graphTitle">Worldwide new {casesType}</h3>
            <LineGraph className="app__graph" casesType={casesType} />
            <h3 className="app__graphTitle"> {country} Vaccine Graph </h3>
            <LineGraphVaccine className="app__graph2" country={country} />
          </CardContent>
        </Card>
      </div>
      <div className="app__bottom">
        <h5>Build by solaiman</h5>
        <div className="app__bottomSocialLink">
        <a href="https://github.com/solaimanx">
            <GitHubIcon className="app__bottomIcon" />
          </a>
          <a href="https://www.facebook.com/Mohammadsolaiman0/">
            <FacebookIcon className="app__bottomIcon" />
          </a>
          <a href="http://edevelopmark.com/">
            <LinkIcon className="app__bottomIcon" />
          </a>
        </div>
          
        
      </div>
    </div>
  );
};

export default App;
