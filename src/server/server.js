/* @flow */
import http from 'http';
import express from 'express';
import path from 'path';
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
  const { metaData, content, template } = getData();

  res.render('index.html', {
    prod : PROD,
    template : template,
    ...content
  });
};


// Routes
app.get('/', (req, res) => page(res, () => {

  return {
    metaData : {
      title : 'Startsida',
    },
    template : 'landing',
    content : {
      photos : [
          1, 2, 3
      ],
      collections : []
    }
  }

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