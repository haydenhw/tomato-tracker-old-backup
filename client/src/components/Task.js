import React from 'react';
import PropTypes from 'prop-types';

import store from '../redux-files/store'

export default function Task(props) {
  const { taskData } = props;
  const { taskName, recordedTime } = taskData;

  return(
    <div className="list-item">
      <span>{taskName}</span>
      <span>{recordedTime}</span>
    </div>
  );
}

Task.propTypes = {
  taskData: PropTypes.object.isRequired
}