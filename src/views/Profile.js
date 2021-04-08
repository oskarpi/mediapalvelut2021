import {useContext} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {
  Card,
  CardContent,
  Typography,
  makeStyles, Container, Box,
} from '@material-ui/core';
import BackButton from '../components/BackButton';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

const Profile = () => {
  const classes = useStyles();
  const [user] = useContext(MediaContext);

  return (
    <>
      <Container>
        <BackButton/>
        <Box display='flex' justifyContent='center' m={2}>
          <Typography variant="h3" component="h1">
            Profile
          </Typography>
        </Box>
        {user &&
        <Box style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}>
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="body2" component="p">
                {user.full_name}
              </Typography>
              <Typography variant="body2" component="p">
                {user.email}
              </Typography>
              <Typography variant="body2" component="p">
                {user.username}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        }
      </Container>
    </>
  );
};

export default Profile;
