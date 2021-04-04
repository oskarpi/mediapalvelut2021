import PropTypes from 'prop-types';
import {uploadUrl} from '../utils/variables';
import {Link} from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  makeStyles,
  Typography, Button, Box, Grid,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 145,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
});

const MediaRow = ({file}) => {
  const classes = useStyles();
  return (
    <Grid item xs={4}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={file.thumbnails ? uploadUrl + file.thumbnails.w160 : '#'}
            alt={file.title}/>
        </CardActionArea>

        <CardContent>
          <Typography
            component="h2"
            variant="h5"
            gutterBottom>
            {file.title}</Typography>
          <Box display='flex' flexWrap='wrap'>
            <Typography gutterBottom>{file.description}</Typography>
          </Box>
          <Button color='primary' variant='contained'>
            <Link className={classes.link} to={
              {
                pathname: '/single',
                state: file,
              }
            }
            >View</Link>
          </Button>
        </CardContent>
      </Card>
    </Grid>

  );
};

MediaRow.propTypes = {
  file: PropTypes.object,
};

export default MediaRow;
