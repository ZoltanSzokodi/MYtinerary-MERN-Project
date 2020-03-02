import React, { useState, useContext, Fragment } from 'react';
import clsx from 'clsx';
import OpenSocket from 'socket.io-client';

// CONTEXT =============================================
import { authContext } from '../context/AuthContext';
import { commentsContext } from '../context/CommentsContext';

// MATERIAL UI =========================================
import { makeStyles } from '@material-ui/core/styles';
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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


// COMPONENTS ==========================================
import CommentOutput from '../components/CommentOutput';
import CommentInput from '../components/CommentInput';
import UpdateItineraryDialog from '../screen/UpdateItineraryDialog';
import DeleteItineraryDialog from '../screen/DeleteItineraryDialog';


// STYLES ==============================================
const useStyles = makeStyles(theme => ({
  root: {
    width: '95%',
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
  avatarLarge: {
    width: '60px',
    height: '60px'
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
  }
}));

// function for calculating likes
const calcLikes = (allFavs, id) => {
  let count = 0;
  if (allFavs !== undefined) {
    allFavs.map(fav => fav === id && count++);
    return count;
  }
};


// COMPONENT =============================================
const ItineraryCard = props => {
  const classes = useStyles();

  const { authState } = useContext(authContext);
  const { comments } = useContext(commentsContext);

  const [expanded, setExpanded] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const socket = OpenSocket('http://localhost:5000');

  const {
    title,
    description,
    userImg,
    duration,
    price,
    username,
    userId,
    hashTags,
    _id
  } = props.itinerary;

  const {
    userFavorites,
    allFavorites,
    handleToggleFav,
    // socket
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

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // RENDER =======================================================
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar src={userImg} alt='user' className={classes.avatarLarge} />
        }
        action={
          (authState.isAuthenticated && authState.user.id === userId) &&
          (
            <Fragment>
              < IconButton
                aria-label="itinerary"
                aria-controls="itinerary-ops"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit">
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="itinerary-ops"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <UpdateItineraryDialog itinerary={props.itinerary} />
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <DeleteItineraryDialog itineraryId={_id} />
                </MenuItem>
              </Menu>
            </Fragment>
          )
        }
        title={title}
        subheader={`posted by: ${username}`}
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
              {`likes: ${calcLikes(allFavorites[0], _id)}`}
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
          checked={userFavorites.includes(_id) ? true : false}
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
          <Typography paragraph>comments</Typography>

          {authState.isAuthenticated &&
            <CommentInput
              inputValue={inputValue}
              handleInput={handleInput}
              handleInputCancel={handleInputCancel}
              itineraryId={_id}
              itineraryTitle={title}
              socket={socket}
            />
          }

          {comments.map(commentObj => (
            commentObj.itineraryId === _id &&
            <CommentOutput
              key={commentObj._id}
              commentObj={commentObj}
              socket={socket}
            />
          ))}

        </CardContent>
      </Collapse>
    </Card>
  );
}
export default ItineraryCard;