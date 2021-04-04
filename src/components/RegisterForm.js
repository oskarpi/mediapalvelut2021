import useSignUpForm from '../hooks/RegisterHooks';
import {useUsers} from '../hooks/ApiHooks';
import {Grid, TextField, Typography, Button, Box} from '@material-ui/core';

const RegisterForm = () => {
  const {postRegister, getUserAvailable} = useUsers();

  const doRegister = async () => {
    try {
      console.log('rekisteröinti lomake lähtee');
      const available = await getUserAvailable(inputs.username);
      console.log('availabale', available);
      if (available) {
        postRegister(inputs);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useSignUpForm(doRegister);
  // console.log('RegisterForm', inputs);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box m={2}>
          <Typography
            component="h1"
            variant="h2"
            gutterBottom
            align='center'
          >Register</Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit}>
          <Grid container>
            <Grid container item>
              <TextField
                fullWidth
                type="text"
                name="username"
                label="Username"
                onChange={handleInputChange}
                value={inputs.username}
              />
            </Grid>

            <Grid container item>
              <TextField
                fullWidth
                type="password"
                name="password"
                label="Password"
                onChange={handleInputChange}
                value={inputs.password}
              />
            </Grid>

            <Grid container item>
              <TextField
                fullWidth
                type="email"
                name="email"
                label="Email"
                onChange={handleInputChange}
                value={inputs.email}
              />
            </Grid>

            <Grid container item style={{
              display: 'block',
            }}>
              <Box mb={3}>
                <TextField
                  fullWidth
                  type="text"
                  name="full_name"
                  label="Full name"
                  onChange={handleInputChange}
                  value={inputs.full_name}
                />
              </Box>
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
        </form>
      </Grid>
    </Grid>
  );
};

export default RegisterForm;
