import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const Country = ({ item }) => {
  const navigate = useNavigate();
  const slug = item.name.common.replaceAll(" ", "-").toLowerCase();

  const handleNavigate = () => {
    navigate(`/country/${slug}`, { state: { item } });
  };

  return (
    <Card onClick={handleNavigate}>
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
          <strong> Populacja: </strong> {item.population}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong> Region: </strong> {item.region}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong> Stolica: </strong> {item.capital}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Country;
