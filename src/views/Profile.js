import {useContext} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {Link as RouterLink} from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  makeStyles, Container, Box, Button,
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
              <Button component={RouterLink}
                to="/myfiles"
              >My Files</Button>
            </CardContent>
          </Card>
        </Box>
        }
      </Container>
    </>
  );
};

export default Profile;
