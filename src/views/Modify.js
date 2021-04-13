import useUploadForm from '../hooks/UploadHooks';
import {useMedia} from '../hooks/ApiHooks';
import {
  CircularProgress,
  Button,
  Grid,
  Typography,
  Container, Box, Slider,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import useSlider from '../hooks/SliderHooks';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import BackButton from '../components/BackButton';
import {uploadUrl} from '../utils/variables';

const Modify = ({history, location}) => {
  const {putMedia, loading} = useMedia();
  const file = location.state;
  const desc = JSON.parse(file.description);

  const validators = {
    title: ['required', 'minStringLength: 3'],
    // eslint-disable-next-line max-len
    description: ['minStringLength: 5'],
  };

  const errorMessages={
    title: ['vaadittu kenttä', 'vähintään 3 merkkiä'],
    description: ['vähintään 5 merkkiä'],
  };

  const doUpload = async () => {
    try {
      const data ={
        title: inputs.title,
        description: JSON.stringify({
          description: inputs.description,
          filters: sliderInputs,
        }),
      };
      const result = await putMedia(data, file.file_id,
          localStorage.getItem('token'));
      console.log('doUpload', result);
    } catch (e) {
      alert(e.message);
    } finally {
      history.push('/myfiles');
    }
  };

  const {inputs, handleInputChange, handleSubmit} =
    useUploadForm(doUpload, {
      title: file.title,
      description: desc.description,
    });

  const [sliderInputs, handleSliderChange] = useSlider(desc.filters);

  console.log(inputs, sliderInputs);

  return (
    <Container>
      <BackButton/>
      <Grid container justify="center">
        <Grid item xs={12}>
          <Box m={2}>
            <Typography
              component="h1"
              variant="h2"
              gutterBottom
              align="center"
            >Modify</Typography>
          </Box>
        </Grid>


        <Grid item>
          {!loading ?
          <ValidatorForm onSubmit={handleSubmit}>
            <Grid container>
              <Grid container item style={{
                display: 'block',
              }}>
                <TextValidator
                  name="title"
                  label="Title"
                  value={inputs.title}
                  fullWidth
                  onChange={handleInputChange}
                  validators={validators.title}
                  errorMessages={errorMessages.title}
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
                  validators={validators.description}
                  errorMessages={errorMessages.description}
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
              <>
                <Grid item xs={12} style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}>
                  <img
                    src={uploadUrl + file.filename}
                    style={{
                      filter: `
                        brightness(${sliderInputs.brightness}%)
                        contrast(${sliderInputs.contrast}%)
                        saturate(${sliderInputs.saturate}%)
                        sepia(${sliderInputs.sepia}%)
                        `,
                    }}
                  />
                </Grid>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography>Brightness</Typography>
                    <Slider
                      min={0}
                      max={200}
                      step={1}
                      name="brightness"
                      value={sliderInputs?.brightness}
                      onChange={handleSliderChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>Contrast</Typography>
                    <Slider
                      min={0}
                      max={200}
                      step={1}
                      name="contrast"
                      value={sliderInputs?.contrast}
                      onChange={handleSliderChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>Saturation</Typography>
                    <Slider
                      min={0}
                      max={200}
                      step={1}
                      name="saturate"
                      value={sliderInputs?.saturate}
                      onChange={handleSliderChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>Sepia</Typography>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      name="sepia"
                      value={sliderInputs?.sepia}
                      onChange={handleSliderChange}
                    />
                  </Grid>
                </Grid>
              </>
            </Grid>
          </ValidatorForm> :
          <CircularProgress/>
          }
        </Grid>
      </Grid>
    </Container>
  );
};

Modify.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default Modify;
