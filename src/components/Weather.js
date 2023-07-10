import { Slider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

function valuetext(value) {
	return `${value}°C`
}

const marks = [
	{
		value: 0,
		label: '0°C',
	},
	{
		value: 20,
		label: '20°C',
	},
	{
		value: 37,
		label: '37°C',
	},
	{
		value: 100,
		label: '100°C',
	},
]

const Weather = ({ capital }) => {
	const getWeather = async () => {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.REACT_APP_API_KEY}`
		)
		const data = await response.json()
		setWeather(data)
	}
	const [weather, setWeather] = useState(null)
	const [temp, setTemp] = useState()

	useEffect(() => {
		getWeather()
	}, [capital])

	// useEffect(() => {
	// 	const celcius = (weather.main?.temp - 273.15).toFixed()
	// 	setTemp(celcius)
		

	// }, [weather])

	if (!weather) {
		return 'Loading'
	}
console.log(weather)
		const convertTemp = temp => {
			return (temp - 273.15).toFixed()
		}
		const currentTemp = convertTemp(weather.main.temp);
	console.log(currentTemp)
		console.log(weather)

	return (
		<div>
			<Typography gutterBottom variant='h6' component='div'>
				{weather.name}
			</Typography>
			<Typography variant='body2' color='text.secondary'>
				<strong> Temperatura: </strong> {convertTemp(weather.main.temp)}℃
			</Typography>
			<Typography variant='body2' color='text.secondary'>
				<strong> Wilgotność: </strong> {weather.main.humidity} %
			</Typography>
			<Typography variant='body2' color='text.secondary'>
				<strong> Ciśnienie: </strong> {weather.main.pressure} hpa
			</Typography>
			<Slider
				aria-label='Custom marks'
				defaultValue={weather.main.temp - 272}
				getAriaValueText={valuetext}
				step={10}
				valueLabelDisplay='auto'
				marks={marks}
			/>
		</div>
	)
}

export default Weather
