import MediaTable from '../components/MediaTable';
import {Box, Container, Typography} from '@material-ui/core';


const Home = () => {
  return (
    <>
      <Container>
        <Box display='flex' justifyContent='center' m={2}>
          <Typography
            component="h1"
            variant="h3"
            gutterBottom>
              Home</Typography>
        </Box>
        <MediaTable/>
      </Container>
    </>
  );
};

export default Home;
