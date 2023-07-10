import { Button, ButtonGroup, CardMedia, Container, Grid, List, ListItem, Typography } from '@mui/material'
import React, { useEffect, useState, useTransition } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Weather from '../components/Weather'

const CountryPage = () => {
	const {
		state: { item },
	} = useLocation()

	const [neighbours, setNeighbours] = useState([])
	

	useEffect(() => {
		if (!item.borders) return
		getNeighbours()
	}, [item.borders])

	const navigate = useNavigate()

	const handleNavigate = neighbour => {
		const slug = neighbour.name.common.replaceAll(' ', '-').toLowerCase()
		navigate(`/country/${slug}`, { state: { item: neighbour } })
	}

	console.log(neighbours)

	const nativeKey = Object.keys(item.name.nativeName)[0]
	const nativeName = item.name.nativeName[nativeKey]
	const languages = Object.values(item.languages)
	const currenciesKey = Object.keys(item.currencies)[0]
	const currencies = item.currencies[currenciesKey]

	const getNeighbours = async () => {
		const borders = item.borders.join(',')
		const response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${borders}`)
		const data = await response.json()
		setNeighbours(data)
	}

	return (
		<Container maxWidth='xl'>
			<Button  sx={{ margin: '30px 0' }} variant='outlined'>
				<Link to='/'>Wróć</Link>
			</Button>

			<Grid container spacing={2}>
				<Grid item xs={6}>
					<CardMedia sx={{ height: 400 }} image={item.flags.png} title='green iguana' />
				</Grid>
				<Grid item xs={6}>
					<Typography variant='h2'>{item.name.common} </Typography>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<Typography variant='subtitle1'>
								<strong>Lokalna nazwa: </strong>
								{nativeName.official}{' '}
							</Typography>
							<Typography variant='subtitle1' component='span'>
								<strong>Region:</strong> {item.region}{' '}
							</Typography>

							<Typography sx={{ mt: 4, mb: 2 }} variant='h6' component='div'>
								<strong>Języki:</strong>
							</Typography>

							<List>
								{languages.map(language => (
									<ListItem key={language}>
										<Typography>- {language}</Typography>
									</ListItem>
								))}
							</List>
						</Grid>
						<Grid item xs={6}>
							<Typography variant='subtitle1' component='span'>
								<strong>Region: </strong>
								{item.subregion}{' '}
							</Typography>
							<br />
							<Typography variant='subtitle1' component='span'>
								<strong>Stolica:</strong>: {item.capital}{' '}
							</Typography>

							<br />
							<Typography variant='subtitle1' component='span'>
								<strong>Waluta:</strong> {currencies.name}{' '}
							</Typography>
						</Grid>
					</Grid>

					<ButtonGroup sx={{display:'flex',flexWrap:'wrap',gap:'5px'}} size='medium' aria-label='large button group'>
						{neighbours.map(neighbour => (
							<Button onClick={() => handleNavigate(neighbour)} key={neighbour.name.common}>
								{neighbour.name.common}
							</Button>
						))}
					</ButtonGroup>
				</Grid>
			</Grid>
			<Weather capital={item.capital}/>
		</Container>
		
	)
}

export default CountryPage
