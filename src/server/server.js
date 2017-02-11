/* @flow */
import http from 'http';
import express from 'express';
import path from 'path';
import request from 'request';
import { renderFile } from 'ejs';
import { getCollections } from '../flickrApi';
import landing from './landing';
import collections, { collectionDetail, getLargeImage } from './collections';

const PROD = process.env.NODE_ENV === 'production';

const app = express();
const router = express.Router();

app.use('/api', router);
app.use('/static', express.static('dist'));
app.use('/images', express.static('src/img'));

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
      template : template,
      ...content
    });
  })
};



// Routes
app.get('/', (req, res) => page(res, landing));
app.get('/collections', (req, res) => page(res, collections));

app.get('/collections/:collectionId', (req, res) => page(res, () => {

}));

// Api
router.get('/collections/:collectionId', (req, res) => collectionDetail(req, res));
router.get('/photos/:photoId', (req, res) => getLargeImage(req, res));



const server = http.createServer(app);
const PORT = process.env.PORT || 3000;


server.listen(PORT, () => {

  console.log(`listening on ${PORT}`);

})