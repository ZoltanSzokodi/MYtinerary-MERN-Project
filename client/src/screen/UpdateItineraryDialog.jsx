import React, { Fragment, useState, useContext } from 'react';
import axios from 'axios';

// CONTEXT ====================================================
import { authContext } from '../context/AuthContext';

// MATERIAL UI ==============================================
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';


// STYLES ===================================================
const useStyles = makeStyles(theme => ({
  formContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: theme.spacing(4),
  },
  cityname: {
    textTransform: 'capitalize'
  },
  form: {
    width: '100%',
    maxWidth: '700px',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
  formError: {
    textAlign: 'center',
    color: 'red'
  },
  textField: {
    width: '80%',
    marginTop: theme.spacing(2)
  },
  avatar: {
    width: '100px',
    height: '100px',
  },
  input: {
    display: 'none',
  },
  submit: {
    marginTop: theme.spacing(2)
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(-3.5),
    flex: 1,
  },
  loginButton: {
    width: '150px',
    marginBottom: theme.spacing(2),
  },
  buttonsContainer: {
    marginTop: theme.spacing(4)
  }
}));

// COMPONENT ====================================================
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// COMPONENT ======================================================
const UpdateItineraryDialog = ({ itinerary }) => {
  const classes = useStyles();

  const { authState } = useContext(authContext);
  const [open, setOpen] = useState(false);

  // converting the hashTags array to a string
  let hashtags = itinerary.hashTags.join(' ');

  const [values, setValues] = useState({
    title: itinerary.title,
    description: itinerary.description,
    duration: itinerary.duration,
    price: itinerary.price,
    hashTags: hashtags,
    isSubmiting: false,
    errorMessage: null
  });


  // EVENT HANDLERS ==============================================
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setValues({
      title: itinerary.title,
      description: itinerary.description,
      duration: itinerary.duration,
      price: itinerary.price,
      hashTags: hashtags,
    });
  };

  const handleChange = prop => event => {
    setValues({
      ...values,
      [prop]: event.target.value
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setValues({
      ...values,
      isSubmiting: true,
      errorMessage: null
    });
    try {
      const response = await axios
        .patch(`http://localhost:5000/api/itineraries/${itinerary._id}`,
          {
            title: values.title,
            description: values.description,
            duration: values.duration,
            price: values.price,
            hashTags: values.hashTags
          },
          { headers: { 'Authorization': `bearer ${authState.token}` } }
        );
      console.log(response)
      window.location.reload();
    }
    catch (error) {
      console.log(error.response);
      setValues({
        ...values,
        errorMessage: error.response.data.message || error.statusText
      });
    }
  };


  // RENDER =======================================================
  return (
    <Fragment>
      <div
        onClick={handleClickOpen}>
        Update your itinerary
      </div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" align="center" className={classes.title}>
              Update your itinerary
            </Typography>
          </Toolbar>
        </AppBar>

        <div className={classes.formContainer}>
          <form className={classes.form} noValidate autoComplete="off">
            <Typography
              className={classes.cityname}
              variant='h5'
              align='center'>
              {itinerary.title}</Typography>

            {values.errorMessage &&
              <div className={classes.formError}>
                {values.errorMessage}
              </div>}

            <FormControl className={classes.textField} variant="outlined">
              <InputLabel htmlFor="title">Title</InputLabel>
              <OutlinedInput
                id="title"
                value={values.title}
                onChange={handleChange('title')}
                labelWidth={36}
              />
            </FormControl>

            <FormControl className={classes.textField} variant="outlined">
              <InputLabel htmlFor="description">Description</InputLabel>
              <OutlinedInput
                id="description"
                value={values.description}
                multiline
                onChange={handleChange('description')}
                labelWidth={86}
              />
            </FormControl>

            <FormControl className={classes.textField} variant="outlined">
              <InputLabel htmlFor="price">Price</InputLabel>
              <OutlinedInput
                id="price"
                value={values.price}
                onChange={handleChange('price')}
                labelWidth={40}
              />
            </FormControl>

            <FormControl className={classes.textField} variant="outlined">
              <InputLabel htmlFor="duration">Duration (h)</InputLabel>
              <OutlinedInput
                id="duration"
                value={values.duration}
                onChange={handleChange('duration')}
                labelWidth={86}
              />
            </FormControl>

            <FormControl className={classes.textField} variant="outlined">
              <InputLabel htmlFor="hashTags">Hashtags</InputLabel>
              <OutlinedInput
                id="hashTags"
                value={values.hashTags}
                onChange={handleChange('hashTags')}
                labelWidth={70}
              />
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
              disabled={values.isSubmiting}
            >{values.isSubmiting ? 'Loading...' : 'Confirm'}</Button>
          </form>
        </div>
      </Dialog>
    </Fragment>
  );
};

export default UpdateItineraryDialog;