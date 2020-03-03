import React, { Fragment } from 'react';

// MATERIAL UI ===========================================
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

// STYLES ================================================
// Styled material ui component
const StyledBadge = withStyles(theme => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const useStyles = makeStyles({
  inline: {
    display: 'inline',
  },
});


// COMPONENT =========================================================
const UserListItem = ({ userObj }) => {
  const classes = useStyles();

  // RENDER ============================================================
  return (
    <Fragment>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          {userObj.isLoggedin ?
            <StyledBadge
              overlap="circle"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              variant="dot"
            >
              <Avatar alt="profile picture" src={userObj.userImg} />
            </StyledBadge> :
            <Avatar alt="profile picture" src={userObj.userImg} />
          }
        </ListItemAvatar>
        <ListItemText
          primary={`${userObj.firstName} ${userObj.lastName}`}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {userObj.email}
              </Typography>
              {userObj.isLoggedin ?
                " — I am available, posting itineraries..." :
                " — I am currenty offline"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </Fragment >
  );
};

export default UserListItem;
