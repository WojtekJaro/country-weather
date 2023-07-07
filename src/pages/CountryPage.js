import {
  Button,
  ButtonGroup,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState, useTransition } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const CountryPage = () => {
  const {
    state: { item },
  } = useLocation();

  const [neighbours, setNeighbours] = useState([]);

  useEffect(() => {
	if(!item.borders) return;
    getNeighbours();
  }, []);

  const navigate = useNavigate();

  const handleNavigate = (neighbour) => {
	const slug =neighbour.name.common.replaceAll(" ", "-").toLowerCase();
    navigate(`/country/${slug}`, { state: { item:neighbour }});
  };

  console.log(neighbours)

  const nativeKey = Object.keys(item.name.nativeName)[0];
  const nativeName = item.name.nativeName[nativeKey];
  const languages = Object.values(item.languages);
  const currenciesKey = Object.keys(item.currencies)[0];
  const currencies = item.currencies[currenciesKey];

  const getNeighbours = async () => {
    const borders = item.borders.join(",");
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha?codes=${borders}`
    );
    const data = await response.json();
    setNeighbours(data);
  };

  return (
    <Container maxWidth="xl">
      <Button variant="outlined">
        <Link to="/">Wróć</Link>
      </Button>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <CardMedia
            sx={{ height: 400 }}
            image={item.flags.png}
            title="green iguana"
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h2">{item.name.common} </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle1">
                Native Name:{nativeName.official}{" "}
              </Typography>
              <Typography variant="subtitle1" component="span">
                {item.region}{" "}
              </Typography>

              {languages.map((language) => (
                <p key={language}>{language}</p>
              ))}
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" component="span">
                {item.subregion}{" "}
              </Typography>
              <br />
              <Typography variant="subtitle1" component="span">
                {item.capital}{" "}
              </Typography>

              <br />
              <Typography variant="subtitle1" component="span">
                {currencies.name}{" "}
              </Typography>
            </Grid>
          </Grid>

          <ButtonGroup size="medium" aria-label="large button group">
            {neighbours.map(neighbour => <Button onClick={() =>handleNavigate(neighbour)} key={neighbour.name.common}>{neighbour.name.common}</Button>)}
          </ButtonGroup>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CountryPage;
