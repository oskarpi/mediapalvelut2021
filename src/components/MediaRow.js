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
import {useMedia} from '../hooks/ApiHooks';
import {withRouter} from 'react-router-dom';

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

const MediaRow = ({file, ownFiles, history}) => {
  const classes = useStyles();
  const {deleteMedia} = useMedia();
  let desc = {}; // jos kuva tallennettu ennen week4C, description ei ole JSONia
  try {
    desc = JSON.parse(file.description);
    console.log(desc);
  } catch (e) {
    desc = {description: file.description};
  }
  return (
    <Grid item xs={4}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={file.thumbnails ? uploadUrl + file.thumbnails.w160 : '#'}
            alt={file.title}
            style={{
              filter: `
            brightness(${desc.filters?.brightness}%)
            contrast(${desc.filters?.contrast}%)
            saturate(${desc.filters?.saturate}%)
            sepia(${desc.filters?.sepia}%)
            `,
            }}
          />
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
          {ownFiles &&
          <>
            <Button color='primary' variant='contained'>
              <Link className={classes.link} to={
                {
                  pathname: '/modify',
                  state: file,
                }
              }
              >modify</Link>
            </Button>
            <Button color='secondary' variant='contained'
              onClick={() => {
                try {
                  const conf = confirm('Do you really want to delete?');
                  if (conf) {
                    deleteMedia(file.file_id,
                        localStorage.getItem('token'));
                    history.push('/profile');
                  }
                } catch (e) {
                  console.log(e.message);
                }
              }
              }
            >
              <Link className={classes.link}
              >Delete</Link>
            </Button>
          </>
          }
        </CardContent>
      </Card>
    </Grid>
  );
};

MediaRow.propTypes = {
  file: PropTypes.object,
  ownFiles: PropTypes.bool,
  history: PropTypes.object,
  deleteMedia: PropTypes.func,
};

export default withRouter(MediaRow);
