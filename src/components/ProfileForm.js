import {useMedia, useTag, useUsers} from '../hooks/ApiHooks';
import {Grid, Typography, Button, Box} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {useEffect} from 'react';
import PropTypes from 'prop-types';
import useUploadForm from '../hooks/UploadHooks';

const ProfileForm = ({user, setUser, setUpdate}) => {
  const {putUser, getUser} = useUsers();
  const {postMedia} = useMedia();
  const {postTag} = useTag();

  const validators = {
    confirmPassword: ['isPasswordMatch'],
    email: ['required', 'isEmail'],
    // eslint-disable-next-line max-len
    full_name: ['matchRegexp:^[a-zA-ZåäöÅÄÖ]+(([\',. -][a-zA-ZåäöÅÄÖ ])?[a-zA-ZåäöÅÄÖ]*)*$'],
  };

  const errorMessages={
    confirmPassword: ['salasanat eivät täsmää'],
    email: ['vaadittu kenttä', 'sähköposti väärää muotoa'],
    full_name: ['vain kirjaimia'],
  };

  const doRegister = async () => {
    try {
      console.log('user muokkaus lomake lähtee');
      if (inputs.file) {
        const fd = new FormData();
        fd.append('title', inputs.username);
        fd.append('file', inputs.file);
        const fileResult = await postMedia(fd, localStorage.getItem('token'));
        const tagResult = await postTag(localStorage.getItem('token'),
            fileResult.file_id,
            'avatar_'+user.user_id,
        );
        console.log('doRegister user muokkauslomake', fileResult, tagResult);
        if (fileResult) {
          alert(tagResult.message);
          setUpdate(true);
        }
        delete inputs.confirmPassword;
        delete inputs.file;
        const result = await putUser(inputs, localStorage.getItem('token'));
        console.log('doUpload', result);
        if (result) {
          alert(result.message);
          const userData = await getUser(localStorage.getItem('token'));
          setUser(userData);
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit, handleFileChange} =
    useUploadForm(doRegister, user);

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch',
        (value) => (value === inputs.password),
    );
  }, [inputs]);


  console.log('RegisterForm', inputs);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box m={2}>
          <Typography
            component="h1"
            variant="h2"
            align='center'>
          Modify user</Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <ValidatorForm onSubmit={handleSubmit}>
          <Grid container >

            <Grid container item style={{
              display: 'block',
            }}>
              <TextValidator
                fullWidth
                type="password"
                name="password"
                label="Password"
                onChange={handleInputChange}
                validators={validators.password}
                errorMessages={errorMessages.password}
              />
            </Grid>

            <Grid container item style={{
              display: 'block',
            }}>
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

            <Grid container item style={{
              display: 'block',
            }}>
              <TextValidator
                fullWidth
                type="email"
                name="email"
                label="Email"
                onChange={handleInputChange}
                value={inputs?.email}
                validators={validators.email}
                errorMessages={errorMessages.email}
              />
            </Grid>

            <Grid container item style={{
              display: 'block',
            }}>
              <Box mb={3}>
                <TextValidator
                  fullWidth
                  type="text"
                  name="full_name"
                  label="Full name"
                  onChange={handleInputChange}
                  value={inputs?.full_name}
                  validators={validators.full_name}
                  errorMessages={errorMessages.full_name}
                />
              </Box>
            </Grid>
            <Grid container item style={{
              display: 'block',
            }}>
              <TextValidator
                type="file"
                name="file"
                accept="image/*, audio/*, video/*"
                fullWidth
                onChange={handleFileChange}
              />
            </Grid>
            <Grid container item style={{
              display: 'block',
            }}>
              <Button fullWidth
                color="primary"
                type="submit"
                variant="contained">
                Update
              </Button>
            </Grid>
          </Grid>
        </ValidatorForm>
      </Grid>
    </Grid>
  );
};

ProfileForm.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
  setUpdate: PropTypes.func,
};

export default ProfileForm;
