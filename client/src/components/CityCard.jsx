import React from 'react';
import { Link } from 'react-router-dom';

// MATERIAL UI ===============================================
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import IconButton from '@material-ui/core/IconButton';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


// STYLES =====================================================
const useStyles = makeStyles(theme => ({
  root: {
    width: '95%',
  },
  media: {
    height: '300px',
  },
  typographyRoot: {
    textTransform: 'capitalize'
  },
  link: {
    textDecoration: 'none',
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(2)
  }
}));


// COMPONENT =================================================
const CityCard = props => {
  const classes = useStyles();
  const {
    img,
    name,
    country,
    description,
  } = props.city;


  // RENDER ===============================================================
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={img}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" classes={{ root: classes.typographyRoot }}>
            {name} - {country}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid container justify="space-between">
          <Link to={`/itineraries/${name}`} className={classes.link}>
            <Button variant="contained" color="primary">Go to itineraries</Button>
          </Link>
          {/* <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton> */}
        </Grid>
      </CardActions>
    </Card>
  );
};

export default CityCard;
