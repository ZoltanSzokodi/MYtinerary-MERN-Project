import React, { useContext, useState } from 'react';
import clsx from 'clsx';

// CONTEXT =============================================
import { authContext } from '../context/AuthContext';

// MATERIAL UI =========================================
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Chip from '@material-ui/core/Chip';


// STYLES ==============================================
const useStyles = makeStyles(theme => ({
  root: {
    width: '95%',
  },
  // media: {
  //   height: 0,
  //   paddingTop: '56.25%', // 16:9
  // },
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
  avatarLarge: {
    width: '60px',
    height: '60px'
  },
  avatarSmall: {
    width: '40px',
    height: '40px'
  },
  cardTitle: {
    fontSize: '20px',
    textTransform: 'capitalize'
  },
  contentPadding: {
    padding: '0 16px 0'
  },
  commentPadding: {
    paddingTop: 0
  },
  commentInput: {
    margin: theme.spacing(.5),
    marginBottom: theme.spacing(2)
  },
  commentBody: {
    width: '100%',
    marginLeft: theme.spacing(1)
  },
  commentButtons: {
    marginTop: theme.spacing(1)
  },
  commentOutput: {
    margin: theme.spacing(.5)
  }
}));


// COMPONENT =============================================
const ItineraryCard = props => {
  const classes = useStyles();

  const { authState } = useContext(authContext);

  const [expanded, setExpanded] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const {
    title,
    description,
    userImg,
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


  // EVENT HANDLERS ===============================================
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleInput = event => {
    setInputValue(event.target.value);
  };

  const handleInputCancel = () => {
    setInputValue('');
  };


  // RENDER =======================================================
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar src={userImg} alt={tourGuide} className={classes.avatarLarge} />
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

      <CardContent classes={{ root: classes.contentPadding }}>
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

      <CardContent classes={{ root: classes.contentPadding }}>
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

      {/* COMMENTS SECTION */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent classes={{ root: classes.commentPadding }}>
          <Typography paragraph>Comments</Typography>

          <div className={classes.commentInput}>
            <Grid container spacing={1} alignItems="flex-end" direction="row" wrap="nowrap">
              <Grid item >
                <Avatar src={userImg} alt={tourGuide} className={classes.avatarSmall} />
              </Grid>
              <Grid item container>
                <TextField
                  className={classes.commentBody}
                  label="add a comment..."
                  multiline
                  value={inputValue}
                  onChange={handleInput} />
              </Grid>
            </Grid>
            <Grid
              className={classes.commentButtons}
              container
              justify="flex-end"
              style={{ display: inputValue.length > 0 ? 'flex' : 'none' }}
            >
              <Button
                size="small"
                style={{ marginRight: '10px' }}
                onClick={handleInputCancel}>cancel</Button>
              <Button size="small" variant="contained">comment</Button>
            </Grid>
          </div>

          <div className={classes.commentOutput}>
            <Grid container spacing={1} alignItems="flex-end" direction="row" wrap="nowrap">
              <Grid item >
                <Avatar src={userImg} alt={tourGuide} className={classes.avatarSmall} />
              </Grid>
              <Grid item container direction="column">
                <Grid item container direction="row" wrap="nowrap" spacing={1}>
                  <Grid item>
                    <Typography color="textSecondary" component="div">
                      <Box fontSize={13} fontStyle="italic">username</Box>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography color="textSecondary" component="div">
                      <Box fontSize={13} fontStyle="italic" variant="body1">03.07.2020</Box>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography className={classes.commentBody}>This is a test comment</Typography>
                </Grid>
              </Grid>
            </Grid>
          </div>

        </CardContent>
      </Collapse>


    </Card>
  );
}

export default ItineraryCard;