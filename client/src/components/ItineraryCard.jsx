import React from 'react';
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
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded';
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
    height: 'auto'
  },
  cardTitle: {
    fontSize: '20px',
    textTransform: 'capitalize'
  }
}));

const ItineraryCard = ({ itinerary }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const {
    title,
    description,
    pictureURL,
    duration,
    price,
    tourGuide,
    hashTags
  } = itinerary;

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
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="like">
          <ThumbUpAltRoundedIcon />
        </IconButton>
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