import useUploadForm from '../hooks/UploadHooks';
import {useMedia} from '../hooks/ApiHooks';
import {
  CircularProgress,
  Button,
  Grid,
  Typography,
  Container, Box,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import {useEffect} from 'react';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const Upload = ({history}) => {
  const {postMedia, loading} = useMedia();

  const doUpload = async () => {
    try {
      const fd = new FormData();
      fd.append('title', inputs.title);
      fd.append('description', inputs.description);
      fd.append('file', inputs.file);
      const result = await postMedia(fd, localStorage.getItem('token'));
      console.log('doUpload', result);
    } catch (e) {
      alert(e.message);
    } finally {
      history.push('/');
    }
  };

  const {inputs, handleInputChange, handleSubmit, handleFileChange, setInputs} =
    useUploadForm(doUpload, {
      title: '',
      description: '',
      file: null,
    });

  useEffect(() => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      setInputs((inputs) => ({
        ...inputs,
        dataUrl: reader.result,
      }));
    });

    if (inputs.file !== null) {
      if (inputs.file.type.includes('image')) {
        reader.readAsDataURL(inputs.file);
      } else {
        setInputs((inputs) => ({
          ...inputs,
          dataUrl: 'logo512.png',
        }));
      }
    }
  }, [inputs]);

  console.log(inputs);

  return (
    <Container>
      <Grid container justify="center">
        <Grid item xs={12}>
          <Box m={2}>
            <Typography
              component="h1"
              variant="h2"
              gutterBottom
              align="center"
            >Upload</Typography>
          </Box>
        </Grid>

        {inputs.dataUrl?.length > 0 &&
      <Grid item xs={12} style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <img src={inputs.dataUrl}/>
      </Grid>
        }
        <Grid item>
          {!loading ?
          <ValidatorForm onSubmit={handleSubmit}>
            <Grid container>
              <Grid container item style={{
                display: 'block',
              }}>
                <TextValidator
                  name="tittle"
                  label="Tittle"
                  value={inputs.tittle}
                  fullWidth
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid container item style={{
                display: 'block',
              }}>
                <TextValidator
                  name="description"
                  label="Description"
                  value={inputs.description}
                  fullWidth
                  onChange={handleInputChange}
                />
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
                <Box mt={1}>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth
                  >Upload</Button>
                </Box>
              </Grid>
            </Grid>
          </ValidatorForm> :
          <CircularProgress/>
          }
        </Grid>
      </Grid>
    </Container>
  );
};

Upload.propTypes = {
  history: PropTypes.object,
};

export default Upload;
