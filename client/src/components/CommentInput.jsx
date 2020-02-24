import React, { useContext } from 'react';

// CONTEXT =============================================
import { authContext } from '../context/AuthContext';

// MATERIAL UI ===============================================
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


// STYLES ====================================================
const useStyles = makeStyles(theme => ({
  avatarSmall: {
    width: '40px',
    height: '40px'
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
  }
}));

// RENDER =======================================================
const CommentInput = ({ inputValue, handleInput, handleInputCancel }) => {
  const classes = useStyles();

  const { authState } = useContext(authContext);

  return (
    <div className={classes.commentInput}>
      <Grid container spacing={1} alignItems="flex-end" direction="row" wrap="nowrap">
        <Grid item >
          <Avatar src={authState.user.userImg} alt="user image" className={classes.avatarSmall} />
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
  );
};

export default CommentInput;
