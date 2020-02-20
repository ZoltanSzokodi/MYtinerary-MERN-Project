import React, { useContext } from 'react';
import { authContext } from '../context/AuthContext';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  root: {
    width: '95%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  chip: {
    margin: theme.spacing(0.5)
  },
  avatar: {
    width: '60px',
    height: '64px'
  },
  cardTitle: {
    fontSize: '20px',
    textTransform: 'capitalize'
  }
}));

const ItineraryCard = props => {
  const classes = useStyles();
  const { authState } = useContext(authContext);
  const [expanded, setExpanded] = React.useState(false);

  const {
    title,
    description,
    pictureURL,
    duration,
    price,
    tourGuide,
    hashTags,
    _id
  } = props.itinerary;

  const {
    favorites,
    handleToggleFav
  } = props;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar src={pictureURL} alt={tourGuide} className={classes.avatar} />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={`Tour Guide: ${tourGuide}`}
        classes={{
          title: classes.cardTitle
        }}
      />

      <CardContent>
        <Typography variant="body1" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>

      <CardContent>
        <Grid container justify="space-between">
          <Grid item sm={4}>
            <Typography variant="body1" color="textSecondary" component="p">
              {`duration: ${duration} hours`}
            </Typography>
          </Grid>
          <Grid item sm={4}>
            <Typography variant="body1" color="textSecondary" component="p">
              {`price: $${price}`}
            </Typography>
          </Grid>
          <Grid item sm={4}>
            <Typography variant="body1" color="textSecondary" component="p">
              {`likes: 6`}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

      <CardContent>
        {hashTags.map(tag => <Chip key={tag} size="small" label={tag} className={classes.chip} />)}
      </CardContent>

      <CardActions disableSpacing>
        <Checkbox
          icon={<FavoriteBorder />}
          disabled={!authState.isAuthenticated && true}
          checkedIcon={<Favorite />}
          value={_id}
          checked={favorites.includes(_id) ? true : false}
          onChange={handleToggleFav}
        />

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show comments"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Comments</Typography>
          <Typography paragraph>
            THIS WILL BE THE COMMENTS SECTION
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default ItineraryCard;