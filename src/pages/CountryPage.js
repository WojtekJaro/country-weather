import {
	Button,
	ButtonGroup,
	CardMedia,
	Container,
	Grid,
	List,
	ListItem,
	Typography,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { Link, useLocation, useNavigate } from "react-router-dom";
  import Weather from "../components/Weather";
  
  const CountryPage = () => {
	const {
	  state: { item },
	} = useLocation();
  
	const [neighbours, setNeighbours] = useState([]);
  
	useEffect(() => {
	  if (!item.borders) return;
	  getNeighbours();
	}, [item.borders]);
  
	const navigate = useNavigate();
  
	const handleNavigate = (neighbour) => {
	  const slug = neighbour.name.common.replaceAll(" ", "-").toLowerCase();
	  navigate(`/country/${slug}`, { state: { item: neighbour } });
	};
  
	console.log(neighbours);
  
	const nativeKey = item.name.nativeName
	  ? Object.keys(item.name.nativeName)[0]
	  : null;
	const nativeName = nativeKey
	  ? item.name.nativeName[nativeKey]
	  : "Nie dotyczy";
	const languages = item.languages ? Object.values(item.languages) : [];
	const currenciesKey = item.currencies
	  ? Object.keys(item.currencies)[0]
	  : null;
	const currencies = currenciesKey ? item.currencies[currenciesKey] : "brak";
  
	console.log(languages)
  
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
		<Button sx={{ margin: "30px 0" }} variant="outlined">
		  <Link to="/">Wróć</Link>
		</Button>
  
		<Grid container spacing={2}>
		  <Grid item xs={12} md = {6}>
			<img style={{width: "100%"}} src={item.flags.png} alt="" />
			{/* <CardMedia
			  sx={{ height: 400, width: "100%" }}
			  image={item.flags.png}
			  title="green iguana"
			/> */}
			
		  </Grid>
		  <Grid item xs={12} md={6}>
			<Typography variant="h2">{item.name.common} </Typography>
			<Grid container spacing={2}>
			  <Grid item xs={12} md={6}>
				<Typography variant="subtitle1">
				  <strong>Lokalna nazwa: </strong>
				  {nativeName.official ?? "Nie dotyczy"}{" "}
				</Typography>
				<Typography variant="subtitle1" component="span">
				  <strong>Region:</strong> {item.region ?? "Nie dotyczy"}{" "}
				</Typography>
  
				<Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
				  <strong>Języki:</strong>
				</Typography>
  
				<List>
				  {languages.length > 0
					? languages.map((language) => (
						<ListItem key={language}>
						  <Typography>- {language}</Typography>
						</ListItem>
					  ))
					: "Brak"}
				</List>
			  </Grid>
			  <Grid item xs={12} md={6}>
				<Typography variant="subtitle1" component="span">
				  <strong>Region: </strong>
				  {item.subregion ?? "Nie dotyczy"}{" "}
				</Typography>
				<br />
				<Typography variant="subtitle1" component="span">
				  <strong>Stolica:</strong>: {item.capital ?? "Nie dotyczy"}{" "}
				</Typography>
  
				<br />
				<Typography variant="subtitle1" component="span">
				  <strong>Waluta:</strong> {currencies.name ?? "Nie dotyczy"}{" "}
				</Typography>
				{item.capital && <Weather capital={item.capital} />}
			  </Grid>
			  
			</Grid>
  
			<ButtonGroup
			  sx={{ display: "flex", flexWrap: "wrap", gap: "5px" }}
			  size="medium"
			  aria-label="large button group"
			>
			  {neighbours.map((neighbour) => (
				<Button
				  onClick={() => handleNavigate(neighbour)}
				  key={neighbour.name.common}
				>
				  {neighbour.name.common}
				</Button>
			  ))}
			</ButtonGroup>
		  </Grid>
		</Grid>
	  </Container>
	);
  };
  
  export default CountryPage;