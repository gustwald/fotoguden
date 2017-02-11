/* @flow */
import http from 'http';
import express from 'express';
import path from 'path';
import request from 'request';
import { renderFile } from 'ejs';

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

const getUrlFromPhoto = photo => {
  return "http://farm" + photo.farm + ".static.flickr.com/" + 
        photo.server + "/" + photo.id + "_" + photo.secret + "_" + "t.jpg";
}

// Routes
app.get('/', (req, res) => page(res, () => {

  return new Promise((resolve, reject) => {
    const url = 'https://api.flickr.com/services/rest/?per_page=500&method=flickr.people.getPhotos&nojsoncallback=1&user_id=142680935@N04&api_key=b5b36f430b9920365ecad5acb78b1f9d&format=json';

    const jsonFlickrApi = rsp => rsp;

    request(url, (error, response, body) => {
      if (!error && response.statusCode == 200) {
      
        const { photos } = JSON.parse(body)
        console.log(photos);

        const data = {
            metaData : {
              title : 'Startsida',
            },
            template : 'landing',
            content : {
              photos : photos.photo.map(photo => {
                return {
                  ...photo,
                  url : getUrlFromPhoto(photo)
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

app.get('/collections', (req, res) => page(res, () => {

}));

app.get('/collections/:collectionId', (req, res) => page(res, () => {

}));




const server = http.createServer(app);
const PORT = process.env.PORT || 3000;


server.listen(PORT, () => {

  console.log(`listening on ${PORT}`);

})