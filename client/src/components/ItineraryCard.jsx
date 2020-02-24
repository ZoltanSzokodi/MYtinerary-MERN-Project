import React, { useContext, useState, useEffect } from 'react';
import clsx from 'clsx';
import axios from 'axios';

// CONTEXT =============================================
import { authContext } from '../context/AuthContext';

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

// COMPONENTS ==========================================
import CommentOutput from '../components/CommentOutput';
import CommentInput from '../components/CommentInput';


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


// COMPONENT =============================================
const ItineraryCard = props => {
  const classes = useStyles();

  const { authState } = useContext(authContext);

  const [expanded, setExpanded] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [comments, setComments] = useState([]);

  const {
    title,
    description,
    userImg,
    duration,
    price,
    username,
    hashTags,
    _id
  } = props.itinerary;

  const {
    favorites,
    handleToggleFav
  } = props;

  // its working
  useEffect(() => {
    axios.get(`http://localhost:5000/api/comments/${_id}`,
      { headers: { 'Authorization': `bearer ${authState.token}` } })
      .then(res => {
        setComments([...res.data.comments]);

      })
      .catch(err => console.log(err))
  }, [])
  console.log(comments)

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
          <Avatar src={userImg} alt='user' className={classes.avatarLarge} />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
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
          <Typography paragraph>{`${comments.length} comment(s)`}</Typography>

          <CommentInput
            inputValue={inputValue}
            handleInput={handleInput}
            handleInputCancel={handleInputCancel} />

          {comments.map(commentObj => (
            <CommentOutput
              key={commentObj._id}
              commentObj={commentObj} />
          ))}

        </CardContent>
      </Collapse>


    </Card>
  );
}

export default ItineraryCard;