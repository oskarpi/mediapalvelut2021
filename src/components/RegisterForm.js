import useSignUpForm from '../hooks/RegisterHooks';
import {useUsers} from '../hooks/ApiHooks';
import {Grid, Typography, Button} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {useEffect} from 'react';
import PropTypes from 'prop-types';

const RegisterForm = ({setToggle}) => {
  const {postRegister, getUserAvailable} = useUsers();

  const validators = {
    username: ['required', 'minStringLength: 3', 'isAvailable'],
    password: ['required', 'minStringLength: 5'],
    confirmPassword: ['required', 'isPasswordMatch'],
    email: ['required', 'isEmail'],
    // eslint-disable-next-line max-len
    full_name: ['matchRegexp:^[a-zA-ZåäöÅÄÖ]+(([\',. -][a-zA-ZåäöÅÄÖ ])?[a-zA-ZåäöÅÄÖ]*)*$'],
  };

  const errorMessages={
    username: ['vaadittu kenttä', 'vähintään 3 merkkiä', 'tunnus ei ole vapaa'],
    password: ['vaadittu kenttä', 'vähintään 5 merkkiä'],
    confirmPassword: ['vaadittu kenttä', 'salasanat eivät täsmää'],
    email: ['vaadittu kenttä', 'sähköposti väärää muotoa'],
    full_name: ['vain kirjaimia'],
  };

  const doRegister = async () => {
    try {
      console.log('rekisteröinti lomake lähtee');
      const available = await getUserAvailable(inputs.username);
      console.log('available', available);
      if (available) {
        delete inputs.confirmPassword;
        const result = await postRegister(inputs);
        if (result.message.length > 0) {
          alert(result.message);
          setToggle(true);
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useSignUpForm(doRegister);
  useEffect(() =>{
    ValidatorForm.addValidationRule('isAvailable', async (value) => {
      if (value.length > 2) {
        try {
          const available = await getUserAvailable(value);
          console.log('onko vapaana', available);
          return available;
        } catch (e) {
          console.log(e.message);
          return true;
        }
      }
    });
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      return value === inputs.password;
    });
  }, [inputs]);


  // console.log('RegisterForm', inputs);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography
          component="h1"
          variant="h2"
          gutterBottom
          align='center'>
          Register</Typography>
      </Grid>
      <Grid item xs={12}>
        <ValidatorForm onSubmit={handleSubmit}>
          <Grid container>
            <Grid container item>
              <TextValidator
                fullWidth
                type="text"
                name="username"
                label="Username"
                onChange={handleInputChange}
                value={inputs.username}
                validators={validators.username}
                errorMessages={errorMessages.username}
              />
            </Grid>

            <Grid container item>
              <TextValidator
                fullWidth
                type="password"
                name="password"
                label="Password"
                onChange={handleInputChange}
                value={inputs.password}
                validators={validators.password}
                errorMessages={errorMessages.password}
              />
            </Grid>

            <Grid container item>
              <TextValidator
                fullWidth
                type="password"
                name="confirmPassword"
                label="Confirm password"
                onChange={handleInputChange}
                value={inputs.confirmPassword}
                validators={validators.confirmPassword}
                errorMessages={errorMessages.confirmPassword}
              />
            </Grid>

            <Grid container item>
              <TextValidator
                fullWidth
                type="email"
                name="email"
                label="Email"
                onChange={handleInputChange}
                value={inputs.email}
                validators={validators.email}
                errorMessages={errorMessages.email}
              />
            </Grid>

            <Grid container item>
              <TextValidator
                fullWidth
                type="text"
                name="full_name"
                label="Full name"
                onChange={handleInputChange}
                value={inputs.full_name}
                validators={validators.full_name}
                errorMessages={errorMessages.full_name}
              />
            </Grid>

            <Grid container item>
              <Button fullWidth
                color="primary"
                type="submit"
                variant="contained">
                Register
              </Button>
            </Grid>
          </Grid>
        </ValidatorForm>
      </Grid>
    </Grid>
  );
};

RegisterForm.propTypes = {
  setToggle: PropTypes.func,
};

export default RegisterForm;
