import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Button, Container, Box} from '@material-ui/core';
import {useState} from 'react';


const Login = () => {
  const [toggle, setToggle] = useState(true);

  const showHide = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <Container maxWidth='sm'>
        {toggle ? <LoginForm/> : <RegisterForm setToggle={setToggle}/>
        }
        <Box mt={1}>
          <Button color='primary' variant='outlined' fullWidth
            onClick={showHide}>{toggle ?
          'or register' :
          'or login'}</Button>
        </Box>
      </Container>
    </>
  );
};

export default Login;
