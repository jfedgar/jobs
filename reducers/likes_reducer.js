import _ from 'lodash';
import {
  LIKE_JOB,
  CLEAR_LIKED_JOBS
} from '../actions/types';

export default (state = [], { type, payload }) => {
  switch (type) {
    case LIKE_JOB:
      console.log({ payload })
      // take list of 'liked' jobs, add newly liked job
      //   and return only the uniq ones
      return _.uniqBy([
        payload, ...state
      ], 'jobkey');
    case CLEAR_LIKED_JOBS:
      return [];
    default:
      return state;
  }
};
