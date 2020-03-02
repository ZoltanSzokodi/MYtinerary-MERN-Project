import React, { useContext } from 'react';
import axios from 'axios';

// CONTEXT ===================================================
import { authContext } from '../context/AuthContext';
import { commentsContext } from '../context/CommentsContext';

// MATERIAL UI ===============================================
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import IconButton from '@material-ui/core/IconButton';


// STYLES ====================================================
const useStyles = makeStyles(theme => ({
  avatarSmall: {
    width: '40px',
    height: '40px'
  },
  commentBody: {
    width: '100%',
    marginLeft: theme.spacing(1)
  },
  commentOutput: {
    margin: theme.spacing(.5),
  },
  deleteBtnContainer: {
    marginLeft: 'auto'
  },
  deleteBtnRoot: {
    padding: '0 0 0 10px'
  }
}));


// COMPONENT ======================================================
const CommentOutput = props => {
  const classes = useStyles();

  const { authState } = useContext(authContext);
  const { comments, setComments, getComments } = useContext(commentsContext);

  const {
    commentObj,
    socket
  } = props;

  const commentId = commentObj._id;

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/comments/${commentId}`,
        { headers: { 'Authorization': `bearer ${authState.token}` } });
      console.log(response);

      // emitting event for socket.io ---------------------------
      // delete
      socket.emit('delte-comment', commentId);
      socket.on('delete-comment', commentI => {
        let currentComments = comments;
        currentComments.map((comment, index) => {
          if (comment._id === commentI) {
            return currentComments.splice(index, 1);
          }
          return null;
        });
        setComments([...currentComments])
      });
    }
    catch (error) {
      console.log(error.response)
    };
    getComments();
  };

  // RENDER =======================================================
  return (
    <div className={classes.commentOutput}>
      <Grid container spacing={1} alignItems="flex-end" direction="row" wrap="nowrap">
        <Grid item >
          <Avatar src={commentObj.userImg} alt="user" className={classes.avatarSmall} />
        </Grid>
        <Grid item container direction="column">
          <Grid item container direction="row" wrap="nowrap" spacing={1} alignItems="baseline">
            <Grid item>
              <Typography color="textSecondary" component="div">
                <Box fontSize={13} fontStyle="italic">{commentObj.username}</Box>
              </Typography>
            </Grid>
            <Grid item>
              <Typography color="textSecondary" component="div">
                <Box fontSize={13} fontStyle="italic" variant="body1">
                  {new Date(commentObj.date).toLocaleString('en-GB', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                  })}
                </Box>
              </Typography>
            </Grid>
            {(authState.isAuthenticated && commentObj.userId === authState.user.id) &&
              (<Grid item className={classes.deleteBtnContainer}>
                <IconButton
                  classes={{ root: classes.deleteBtnRoot }}
                  onClick={handleDelete} >
                  <DeleteForeverRoundedIcon fontSize="small" />
                </IconButton>
              </Grid>)}
          </Grid>
          <Grid item>
            <Typography className={classes.commentBody}>{commentObj.comment}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default CommentOutput;
