import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Country from "../components/Country";

const HomePage = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountriesData();
  }, []);

  const getCountriesData = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    setCountries(data);
  };

  console.log(countries);

  return (
    <Container maxWidth="xl">
      <Typography variant="h3">All Countries</Typography>
      <Grid container spacing={2}>
        {countries.map((country) => (
          <Grid item md={3} sm={6} xs={12}>
            <Country item={country} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
