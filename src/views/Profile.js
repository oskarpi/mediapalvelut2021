import {useContext, useEffect, useState} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {Link as RouterLink} from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  makeStyles, Container, Box, Button, Grid, CardMedia,
} from '@material-ui/core';
import BackButton from '../components/BackButton';
import ProfileForm from '../components/ProfileForm';
import {useTag} from '../hooks/ApiHooks';
import {uploadUrl} from '../utils/variables';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

const Profile = () => {
  const classes = useStyles();
  const [user, setUser] = useContext(MediaContext);
  const [update, setUpdate] = useState(false);
  const [avatar, setAvatar] = useState('logo512.png');
  const {getTag} = useTag();

  useEffect(()=>{
    (async () =>{
      try {
        const result = await getTag('avatar_'+user.user_id);
        if (result.length > 0) {
          const image = result.pop().filename;
          setAvatar(uploadUrl + image);
        }
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, [user, update]);

  console.log(avatar);

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
          <Card className={classes.root}>
            <CardMedia
              image={avatar}
              style={{
                height: '20vh',
              }}
            />
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
        }
        <Grid>
          <ProfileForm user={user} setUser={setUser} setUpdate={setUpdate}/>
        </Grid>
      </Container>
    </>
  );
};

export default Profile;
