import React from 'react';

// MATERIAL UI ===============================================
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';


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
    margin: theme.spacing(.5)
  }
}));

// RENDER =======================================================
const CommentOutput = ({ commentObj }) => {
  const classes = useStyles();

  return (
    <div className={classes.commentOutput}>
      <Grid container spacing={1} alignItems="flex-end" direction="row" wrap="nowrap">
        <Grid item >
          <Avatar src={commentObj.userImg} alt="user" className={classes.avatarSmall} />
        </Grid>
        <Grid item container direction="column">
          <Grid item container direction="row" wrap="nowrap" spacing={1}>
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
