import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Container} from '@material-ui/core';

const Login = () => {
  return (
    <>
      <Container maxWidth='sm'>
        <LoginForm/>
        <RegisterForm/>
      </Container>
    </>
  );
};

export default Login;
