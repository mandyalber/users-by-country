import React, { useState, useEffect } from "react";
import user from "../APIs/user";
import countries from "../APIs/countries";
import CountryCard from "./countryCard";
import "./mainFunctional.css";

function MainFunctional() {
  const [userData, setUserData] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    user.getRandomUserNames().then((response) => {
      //console.log("got users", response.data);
      setUserData(response.data.results);
    });
    countries.getCountries().then((response) => {
      //console.log("got countries", response);
      setCountryData(response.data);
    });
  }, []);
  /* filters countries as input state is updated */
  useEffect(() => {
    setFilteredCountries(
      countryData.filter((country) =>
        country.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, countryData]);

  return (
    <div id="top" className="App">
      <input
        type="text"
        placeholder="Search for a country"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="countries">
        {filteredCountries.map((country, index) => {
          return (
            <CountryCard
              country={country}
              key={index}
              /* pass users for given country to CountryCard component */
              users={userData.filter((user) => user.nat === country.alpha2Code)}
            />
          );
        })}
      </div>
      <a href="#top">Back to top</a>
    </div>
  );
}

export default MainFunctional;
