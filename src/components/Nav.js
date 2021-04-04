import {Link} from 'react-router-dom';
import {useEffect, useContext} from 'react';
import {useUsers} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: 'black',
  },
}));

const Nav = ({history}) => {
  const classes = useStyles();
  const [user, setUser] = useContext(MediaContext);
  const {getUser} = useUsers();

  useEffect(() => {
    const checkUser = async () =>{
      try {
        const token = localStorage.getItem('token');
        const userData = await getUser(token);
        setUser(userData);
      } catch (e) {
        history.push('/');
      }
    };
    checkUser();
  }, []);

  return (
    <div className={classes.root}>
      <nav>
        {user &&
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              TestApp
            </Typography>
            <Box m={1}>
              <Button variant="contained"><HomeIcon/>
                <Link className={classes.link} to="/home">Home</Link></Button>
            </Box>
            <Box m={1}>
              <Button variant="contained"><PersonIcon/>
                <Link className={classes.link} to="/profile">
                  Profile</Link></Button>
            </Box>
            <Box m={1}>
              <Button variant="contained" color="secondary" href="/logout">
                <ExitToAppIcon/>
                <Link className={classes.link} style={{
                  color: 'white',
                }} to="/logout">
                  Logout</Link></Button>
            </Box>
          </Toolbar>
        </AppBar>
        }
      </nav>
    </div>
  );
};

Nav.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Nav);
