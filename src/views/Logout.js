/* eslint-disable no-unused-vars */
import {useContext} from 'react';
import PropTypes from 'prop-types';
import {MediaContext} from '../contexts/MediaContext';

const Logout = ({history}) => {
  const [user, setUser] = useContext(MediaContext);
  setUser(null);
  localStorage.clear();
  history.push('/');
  return (
    <>
      <h1>Logout</h1>
    </>
  );
};

Logout.propTypes = {
  history: PropTypes.object,
};

export default Logout;

