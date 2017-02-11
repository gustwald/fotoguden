/* @flow */
import http from 'http';
import express from 'express';
import path from 'path';
import request from 'request';
import { renderFile } from 'ejs';
import { getCollections } from '../flickrApi';

const PROD = process.env.NODE_ENV === 'production';

const app = express();

app.use('/static', express.static('dist'));
app.set('views', path.join(__dirname, '../pages'));
app.engine('html', renderFile);

// type ResData = {
//   metaData : ?Object,
//   content : Object
// };

const page = (res, getData) => {
  getData().then(data => {
    const { metaData, content, template } = data;

    res.render('index.html', {
      prod : PROD,
      template : template,
      ...content
    });
  })
};

const getPhotoshotUrlFromPhoto = photo => {
  return "http://c1.staticflickr.com/1/" + 
        photo.server + "/" + photo.primary + "_" + photo.secret + "_" + "t.jpg";
}

const getUrlFromPhoto = photo => {
  return "http://farm" + photo.farm + ".static.flickr.com/" + 
        photo.server + "/" + photo.id + "_" + photo.secret + "_" + "t.jpg";
}

// const url = 'https://api.flickr.com/services/rest/?per_page=500&method=flickr.people.getPhotos&nojsoncallback=1&user_id=142680935@N04&api_key=b5b36f430b9920365ecad5acb78b1f9d&format=json';

const getLandingData = ({ photosets : { photoset }}) => {
    const responseData = {
      metaData : {
        title : 'Startsida',
      },
      template : 'landing',
      content : undefined
    };

    return {
      ...responseData,
      content : {
      photosets : photoset.map(set => ({
          ...set,
          url : getPhotoshotUrlFromPhoto(set)
        }))
      }
    }
}

// Routes
app.get('/', (req, res) => page(res, () => {
  return new Promise((resolve, reject) => {
    getCollections()
        .then(response => resolve(getLandingData(response)));
    });
}));

app.get('/collections', (req, res) => page(res, () => {
  return new Promise((resolve, reject) => {
    const url = 'https://api.flickr.com/services/rest/?per_page=500&method=flickr.photosets.getList&nojsoncallback=1&user_id=142680935@N04&api_key=b5b36f430b9920365ecad5acb78b1f9d&format=json';

    const jsonFlickrApi = rsp => rsp;

    request(url, (error, response, body) => {
      if (!error && response.statusCode == 200) {
      
        const { photosets } = JSON.parse(body)
        console.log(photosets);

        const data = {
            metaData : {
              title : 'collection',
            },
            template : 'collection',
            content : {
              photosets : photosets.photoset.map(photoset => {
                return {
                  ...photoset,
                  url : getPhotoshotUrlFromPhoto(photoset)
                }
              }),
              collections : []
            }
          };

          resolve(data);
      }
      else {
        reject();
      }

    });
    
  });

}));

app.get('/collections/:collectionId', (req, res) => page(res, () => {

}));




const server = http.createServer(app);
const PORT = process.env.PORT || 3000;


server.listen(PORT, () => {

  console.log(`listening on ${PORT}`);

})