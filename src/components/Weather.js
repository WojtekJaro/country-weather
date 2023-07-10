import React, { useEffect, useState } from 'react'

const Weather = ({ capital }) => {
	const getWeather = async () => {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=b8f337afbc9706d3f8db77374b959a7d`
		)
		const data = await response.json()
		setWeather(data)
	}
	const [weather, setWeather] = useState([])

	useEffect(() => {
		getWeather()
	}, [capital])
	if (weather.length === 0) {
		return 'Loading'
	}

	const convertTemp = temp => {
		return (temp - 273.15).toFixed();
	}

	console.log(weather)

	return (
		<div>
			<h2>Nazwa miasta: {weather.name} </h2>
			<h2>Temperatura: {convertTemp(weather.main.temp)}℃ </h2>
			<h2>Wilgotność: {weather.main.humidity} % </h2>
			<h2>Ciśnienie: {weather.main.pressure} hpa </h2>
		</div>
	)
}

export default Weather
