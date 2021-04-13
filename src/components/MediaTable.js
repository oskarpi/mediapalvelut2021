import MediaRow from './MediaRow';
import {useAllMedia} from '../hooks/ApiHooks';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';


const MediaTable = ({ownFiles}) => {
  const picArray = useAllMedia(ownFiles);

  console.log('MediaTable', picArray);
  return (
    <Grid container spacing={3} justify='center'>
      {picArray.map((item, index) => (<MediaRow key={index} file={item}
        ownFiles={ownFiles}/>))}
    </Grid>
  );
};

MediaTable.propTypes = {
  ownFiles: PropTypes.bool,
};

export default MediaTable;
