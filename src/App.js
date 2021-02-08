import React, { useState , useEffect} from 'react';
import './App.css';

import { 
  Select ,
  FormControl ,
  MenuItem
} from "@material-ui/core";

function App() {
  const [countries, setCountries] = useState ([]);

          /// STATE = how to write a veriable in REACT <<<<
    //// https://disease.sh/v3/covid-19/countries >>> API request link

      /// USEEFFECT =   Run a piece of code base on a given conditions

      useEffect(() => {
            // The code inside here will run once , when the component loads not again 
            // async -> send a request , wait for it, do something with the info

            const getCountriesData = async () => {
              await fetch ("https://disease.sh/v3/covid-19/countries")
              .then((response) => response.json())
              .then((data) => {
                const countries = data.map ((country) => ( /// map = Loop through with an list [item1, item2, item3 ] and returning an object in a shape
                  {
                    name: country.country, // united state , uinted kindgom , bangladesh
                    value: country.countryInfo.ios2 // UK , USA, BD, FR, 
                  }));
                setCountries(countries);

              });
            };
              
              getCountriesData();
      }, []);

  return (
    <div className="app">
            <div className="app__header">
              
      <h1>COVID 19 TRACKER1</h1>
      <FormControl className="app__dropdown" >
          <Select veriant="outlined" value="abc" >
                {/* Loop through all the countries and show a drop down list of the option  */}
                <MenuItem value="worldwide" >Worldwide</MenuItem>
              {
                countries.map(country => (
                  <MenuItem value={country.value} >{country.name}</MenuItem>
                ) )
              }
              
              {/* <MenuItem value="worldwide" >Worldwide</MenuItem>
              <MenuItem value="worldwide" >Worldwide2</MenuItem>
              <MenuItem value="worldwide" >Worldwide3</MenuItem>
              <MenuItem value="worldwide" >Worldwide4</MenuItem>
              <MenuItem value="worldwide" >Worldwide5</MenuItem> */}

          </Select>

      </FormControl>

            </div>


      {/* Header */ }
       {/* title + select input dropdown feild  */ }

        {/* info box */ }
         {/* info box */ }
          {/*info box  */ }

           {/* Table */ }
            {/* Graph */ }

            {/* Map */ }


    </div>
  );
}

export default App;
