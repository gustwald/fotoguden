import request from 'request';
import { stringify } from 'qs';
const API_KEY = 'b5b36f430b9920365ecad5acb78b1f9d';
const USER_ID = '142680935';


const getUrl = (options) => 'https://api.flickr.com/services/rest/' + stringify({
  ...options,
  nojsoncallback : 1,
  user_id : USER_ID,
  api_key : API_KEY,
  format : 'json'
});

export const getCollections = () => {
  const url = getUrl({
    method : 'flickr.photosets.getList'
  });

  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        resolve(JSON.parse(body))
      }
      else {
        reject(error);
      }
    })

  });
};
