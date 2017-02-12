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

export const collections = (req, res) => new Promise((resolve, reject) =>
    getCollections()
        .then(response => resolve(getLandingData(response)))
);

const getDetailData = ([{photoset}]) => {
  const responseData = {
    metaData : {
      title : photoset.title,
    },
    template : 'collectionDetail',
    content : undefined
  };

  // console.log(photoset.photo)
  // console.log(photos.photosets.photoset)


  return {
    ...responseData,
    content : {
      title : photoset.title,
      photos : photoset.photo.map(photo => ({
        ...photo,
        url : `/api/photos/${photo.id}`
      }))
    }
  }
}


export const collectionPage = (res, req) => new Promise((resolve, reject) => {
    const collectionId = req.params.collectionId;

    return Promise
        .all([
          getPhotosetPhotos(collectionId),
        ])
        .then(values => {
          resolve(getDetailData(values));
        })
        .catch(e => reject())
});


// Api
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

};

