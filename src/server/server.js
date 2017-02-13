/* @flow */
import http from 'http';
import express from 'express';
import path from 'path';
import request from 'request';
import { renderFile } from 'ejs';
import { getCollections } from '../flickrApi';
import landing from './landing';
import { collections, collectionDetail, getImage, collectionPage } from './collections';

const PROD = process.env.NODE_ENV === 'production';

const app = express();
const router = express.Router();

app.use('/api', router);
app.use('/static', express.static('dist'));
app.use('/images', express.static('src/img'));

app.set('views', path.join(__dirname, '../pages'));
app.engine('html', renderFile);


const page = (res, req, getData) => {
  getData(res, req)
    .then(data => {
      const { metaData, content, template } = data;

      res.render('index.html', {
        template : template,
        title : metaData.title,
        ...content
      });
    })
    .catch(e => res.status(404).send('Not found'))
};



// Routes
app.get('/', (req, res) => page(res, req, landing));
app.get('/collections', (req, res) => page(res, req, collections));
app.get('/collections/:collectionId', (req, res) => page(res, req, collectionPage));


// Api
router.get('/collections/:collectionId', (req, res) => collectionDetail(req, res));
router.get('/photos/:photoId', (req, res) => getImage(req, res));



const server = http.createServer(app);
const PORT = process.env.PORT || 3000;


server.listen(PORT, () => {

  console.log(`listening on ${PORT}`);

})