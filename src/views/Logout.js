/* eslint-disable no-unused-vars */
import {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import {MediaContext} from '../contexts/MediaContext';
import {Redirect} from 'react-router-dom';

const Logout = ({history}) => {
  const [user, setUser] = useContext(MediaContext);
  useEffect(()=>{
    setUser(null);
    localStorage.clear();
    // history.push('/');
  }, []);

  return (
    <>
      <Redirect to={'/'}/>
    </>
  );
};

Logout.propTypes = {
  history: PropTypes.object,
};

export default Logout;

