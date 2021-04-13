import {Box, Container, Typography} from '@material-ui/core';
import MediaTable from '../components/MediaTable';


const MyFiles = () => {
  return (
    <>
      <Container>
        <Box display='flex' justifyContent='center' m={2}>
          <Typography
            component="h1"
            variant="h3"
            gutterBottom>
            My files</Typography>
        </Box>
        <MediaTable ownFiles={true}/>
      </Container>
    </>
  );
};

export default MyFiles;
