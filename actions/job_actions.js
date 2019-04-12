import axios from 'axios';
import geo2zip from 'geo2zip';
import qs from 'qs';
import JOB_DATA from './IndeedJobData.json';
import {
  FETCH_JOBS,
  LIKE_JOB,
  CLEAR_LIKED_JOBS
} from './types';

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';
const JOB_QUERY_PARAMS = {
  publisher: '4201738803816157',
  format: 'json',
  v: '2',
  latlong: 1,
  radius: 10,
  q: 'Senior Software Engineer'
};

const buildJobsUrl = (zip) => {
  const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
  console.log({ indeedQuery: query });
  return `${JOB_ROOT_URL}${query}`;
};

export const fetchJobs = (region, callback) => async (dispatch) => {
  try {
    let zip = await geo2zip(region)
    const url = buildJobsUrl(zip);
    // note: indeed shut down their API so we are faking the data with JOB_DATA
    //   (gathered from a local mock file)
    //let { data } = await axios.get(url);
    const data = JOB_DATA;
    dispatch({ type: FETCH_JOBS, payload: data });
    callback();
  } catch (e) {
    console.error(e);
  }
};

export const likeJob = (job) => {
  return {
    type: LIKE_JOB,
    payload: job
  };
};

export const clearLikedJobs = () => {
  return {
    type: CLEAR_LIKED_JOBS
  };
};
