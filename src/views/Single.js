import {uploadUrl} from '../utils/variables';
import PropTypes from 'prop-types';
import {
  Card,
  CardActionArea, CardContent, CardMedia,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});


const Single = ({location}) => {
  const classes = useStyles();
  const file = location.state;

  return (
    <>
      <Typography
        component="h1"
        variant="h2"
        gutterBottom>
        {file.title}</Typography>
      <Paper elevation="3">
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia className={classes.media}
              image={uploadUrl + file.filename} title={file.title}/>
          </CardActionArea>
          <CardContent>
            <Typography gutterBottom>{file.description}</Typography>
            <Typography variant="subtitle2">{file.user_id}</Typography>
          </CardContent>
        </Card>
      </Paper>
    </>
  );
};

Single.propTypes = {
  location: PropTypes.object,
};

export default Single;
