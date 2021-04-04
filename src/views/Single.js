import {uploadUrl} from '../utils/variables';
import PropTypes from 'prop-types';
import {
  Card,
  CardActionArea, CardContent, CardMedia,
  makeStyles,
  Container,
  Typography,
  Box,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 800,
    minWidth: 500,
  },
  media: {
    height: 300,
  },
});


const Single = ({location}) => {
  const classes = useStyles();
  const file = location.state;

  return (
    <>
      <Container>
        <Box style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia className={classes.media}
                image={uploadUrl + file.filename} title={file.title}/>
            </CardActionArea>
            <CardContent>
              <Typography
                component="h1"
                variant="h4"
                gutterBottom>
                {file.title}</Typography>
              <Typography gutterBottom>{file.description}</Typography>
              <Typography variant="subtitle2">{file.user_id}</Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
};

Single.propTypes = {
  location: PropTypes.object,
};

export default Single;
