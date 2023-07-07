import { CardMedia, Grid, Typography } from '@mui/material'
import React, { useTransition } from 'react'
import { useLocation } from 'react-router-dom'

const CountryPage = () => {
	const {
		state: { item },
	} = useLocation()
	console.log(item)

	const person = {
		firstname:"Jan",
		lastname:"Kowalski"
	}

	const nativeKey = Object.keys(item.name.nativeName)[0];
	const nativeName = item.name.nativeName[nativeKey];

	return (
		<div>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<CardMedia sx={{ height: 400 }} image={item.flags.png} title='green iguana' />
				</Grid>
				<Grid item xs={6}>
                    <Typography variant="h2">{item.name.common} </Typography>
                    <Typography variant="h5">{nativeName.official} </Typography>
                    <Typography variant="subtitle1" component="span" >{item.region} </Typography><br />
                    <Typography variant="subtitle1" component="span" >{item.subregion} </Typography><br />
                    <Typography variant="subtitle1" component="span" >{item.capital} </Typography><br />
                    <Typography variant="subtitle1" component="span" >{item.borders} </Typography><br />
                
                    
                    
                      
                  

                </Grid>
			</Grid>
		</div>
	)
}

export default CountryPage
