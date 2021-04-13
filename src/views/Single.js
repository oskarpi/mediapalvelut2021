import {uploadUrl} from '../utils/variables';
import PropTypes from 'prop-types';
import {
  Card,
  CardActionArea, CardContent, CardMedia,
  makeStyles,
  Typography,
  Container, Box,
} from '@material-ui/core';
import BackButton from '../components/BackButton';
import {useUsers} from '../hooks/ApiHooks';
import {useEffect, useState} from 'react';

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
  const [owner, setOwner] = useState(null);

  const classes = useStyles();
  const {getUserById} = useUsers();

  const file = location.state;
  const desc = JSON.parse(file.description);

  useEffect(()=>{
    (async ()=>{
      try {
        setOwner(await getUserById(localStorage.getItem('token'),
            file.user_id));
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, []);

  if (file.media_type === 'image') file.media_type = 'img';

  return (
    <>
      <Container>
        <BackButton/>
        <Box style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component={file.media_type}
                controls
                className={classes.media}
                image={uploadUrl + file.filename}
                title={file.title}
                style={{
                  filter: `
                        brightness(${desc.filters.brightness}%)
                        contrast(${desc.filters.contrast}%)
                        saturate(${desc.filters.saturate}%)
                        sepia(${desc.filters.sepia}%)
                        `,
                }}
              />
            </CardActionArea>
            <CardContent>
              <Typography
                component="h1"
                variant="h4"
                gutterBottom>
                {file.title}</Typography>
              <Typography gutterBottom>{desc.description}</Typography>
              <Typography variant="subtitle2">{owner?.username}</Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  )
  ;
};

Single.propTypes = {
  location: PropTypes.object,
};

export default Single;
