import React, { Fragment, useState, useContext } from 'react';
import { useHistory, Link } from "react-router-dom";

// CONTEXT ================================================
import { citiesContext } from '../context/CitiesContext';
import { authContext } from '../context/AuthContext';

// MATERIAL UI ============================================
import { fade, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';

// COMPONENTS =============================================
import LoginDialog from '../screen/authentication/LoginDialog';
import LogoutDialog from '../screen/authentication/LogoutDialog';
import SignupDialog from '../screen/authentication/SignupDialog';
import DeleteDialog from '../screen/authentication/DeleteDialog';


// STYLES =================================================
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  backButton: {
    marginRight: theme.spacing(2),
  },
  toolBarRoot: {
    justifyContent: 'space-between'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  usersList: {
    textDecoration: 'none',
    color: 'inherit'
  }
}));


// COMPONENT =====================================================
const HideOnScroll = props => {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });


  // RENDER ====================================================== 
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};


// COMPONENT =====================================================
const MenuAppbar = props => {
  const classes = useStyles();

  // to enable go back button;
  let history = useHistory();

  const { handleFilter } = useContext(citiesContext);
  const { authState } = useContext(authContext);

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  // EVENT HANDLERS =============================================
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  // RENDER =====================================================
  return (
    <Fragment>
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar
            classes={{
              root: classes.toolBarRoot
            }}
          >
            <IconButton
              edge="start"
              className={classes.backButton}
              color="inherit"
              aria-label="go back"
              onClick={history.goBack}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <div className={classes.search}
              style={props.type === 'cities' ?
                { display: 'block' } :
                { display: 'none' }}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                onChange={handleFilter}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>

            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
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
                  {!authState.isAuthenticated ? <LoginDialog /> : <LogoutDialog />}
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <SignupDialog />
                </MenuItem>
                {authState.isAuthenticated &&
                  <div>
                    <MenuItem>
                      <DeleteDialog />
                    </MenuItem>
                    <MenuItem>
                      <Link className={classes.usersList} to="/users">Users list</Link>
                    </MenuItem>
                  </div>}
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </Fragment>
  );
};

export default MenuAppbar;