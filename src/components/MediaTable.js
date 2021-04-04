import MediaRow from './MediaRow';
import {useAllMedia} from '../hooks/ApiHooks';
import Grid from '@material-ui/core/Grid';

const MediaTable = () => {
  const picArray = useAllMedia();

  console.log('MediaTable', picArray);
  return (
    <Grid container spacing={3} justify='center'>
      {picArray.map((item, index) => (<MediaRow key={index} file={item}/>))}
    </Grid>
  );
};

export default MediaTable;
