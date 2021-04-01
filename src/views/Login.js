import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Button} from '@material-ui/core';
import {useState} from 'react';

const Login = () => {
  const [toggle, seToggle] = useState(true);

  const showHide = () => {
    seToggle(!toggle);
  };

  return (
    <>
      { toggle ? <LoginForm/> : <RegisterForm/>
      }
      <Button onClick={showHide}>{ toggle ? 'or register' : 'or login'}</Button>
    </>
  );
};

export default Login;
