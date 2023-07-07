import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

const Country = ({item}) => {

    const navigate = useNavigate();
    const slug = item.title.replaceAll(" ", "-").toLowerCase();

    const handleNavigate = () => {
      navigate(`/countries/${slug}`, {state:{item}})
    }


  return (
    <Card onClick={handleNavigate} >
    <CardMedia
      sx={{ height: 180 }}
      image={item.flags.png}
      title="green iguana"
    />
    <CardContent>
      <Typography gutterBottom variant="h6" component="div">
        {item.name.common}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Populacja: {item.population}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Region: {item.region}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Stolica: {item.capital}
      </Typography>
    </CardContent>
   
  </Card>
  )
}

export default Country