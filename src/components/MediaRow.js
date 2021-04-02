import PropTypes from 'prop-types';
import {uploadUrl} from '../utils/variables';
import {Link} from 'react-router-dom';

// turha kommentti

const MediaRow = ({file}) => {
  return (
    <tr>
      <td>
        <img src={file.thumbnails ? uploadUrl + file.thumbnails.w160 : '#'}
          alt={file.title}/>
      </td>
      <td>
        <h3>{file.title}</h3>
        <p>{file.description}</p>
      </td>
      <td>
        <Link to={
          {
            pathname: '/single',
            state: file,
          }
        }
        >View</Link>
      </td>
    </tr>

  );
};

MediaRow.propTypes = {
  file: PropTypes.object,
};

export default MediaRow;
