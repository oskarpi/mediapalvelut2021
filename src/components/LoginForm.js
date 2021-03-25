import useLoginForm from '../hooks/LoginHooks';
import {useLogin} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

const LoginForm = ({history}) => {
  const {postLogin} = useLogin();

  const doLogin = async () => {
    try {
      const userData = await postLogin(inputs);
      console.log('userData', userData);
      localStorage.setItem('token', userData.token);
      history.push('/home');
    } catch (e) {
      console.log('doLogin', e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useLoginForm(doLogin);

  console.log('LoginForm', inputs);

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" onChange={handleInputChange}
        value={inputs.username}/>
      <input name="password" type="password" onChange={handleInputChange}
        value={inputs.password}/>
      <button>Kirjaudu</button>
    </form>
  );
};

LoginForm.propTypes = {
  history: PropTypes.object,
};

export default withRouter(LoginForm);
