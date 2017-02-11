import { getCollections, getPhotosetPhotos, getPhotoSizes } from '../flickrApi';
import request from 'request';

const getPhotoshotUrlFromPhoto = photo => {
  return "http://c1.staticflickr.com/1/" + 
        photo.server + "/" + photo.primary + "_" + photo.secret + "_" + "t.jpg";
}

const getLandingData = ({ photosets : { photoset }}) => {
    const responseData = {
      metaData : {
        title : 'Collections',
      },
      template : 'collections',
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

export default () => new Promise((resolve, reject) => 
    getCollections()
        .then(response => resolve(getLandingData(response)))
);


export const collectionDetail = (req, res) => {
    const collectionId = req.params.collectionId;

     getPhotosetPhotos(collectionId)
            .then(response => res.json(response))
            .catch(e => res.status(404).send('Not found'))

}


export const getLargeImage = (req, res) => {
  const photoId = req.params.photoId;

  getPhotoSizes(photoId)
      .then(({ sizes : { size }}) => {
          const url = size.find(s => s.label == 'Large 2048').source;
          request.get(url).pipe(res);
      })
      .catch(e => res.status(404).send('Not found'))

}