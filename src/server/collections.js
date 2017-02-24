import { getCollections, getPhotosetPhotos, getPhotoSizes } from '../flickrApi';
import request from 'request';

const getPhotoshotUrlFromPhoto = photo => {
  return `/api/photos/${photo.primary}`
}



const getAlbumData = ({ photosets : { photoset }}) => {
    const responseData = {
      metaData : {
        title : 'Album',
      },
      template : 'album',
      content : undefined
    };

    return {
      ...responseData,
      content : {
      photosets : photoset.slice(0, 5).map(set => ({
          ...set,
          url : getPhotoshotUrlFromPhoto(set)
        }))
      }
    }
}

export const collections = (req, res) => new Promise((resolve, reject) =>
    getCollections()
        .then(response => resolve(getAlbumData(response)))
);

const getDetailData = ([collections, {photoset}], id) => {
  const title = photoset.title.replace(/[0-9]/g, '');

  const responseData = {
    metaData : {
      title : title,
    },
    template : 'collectionDetail',
    content : undefined
  };


  const selectedCoverPhoto = collections.photosets.photoset.filter(set => set.id == id)[0];
  const thePhoto = photoset.photo.filter(photo => photo.id == selectedCoverPhoto.primary)[0];
  
  return {
    ...responseData,
    content : {
      title : title,
      photos : photoset.photo.map(photo => ({
        ...photo,
        url : `/api/photos/${photo.id}`
      })),
      headerPhoto : `/api/photos/${thePhoto.id}?size=Large`
    }
  }
}


export const collectionPage = (res, req) => new Promise((resolve, reject) => {
    const collectionId = req.params.collectionId;
    
    return Promise
        .all([
          getCollections(),
          getPhotosetPhotos(collectionId),
        ])
        .then(values => {
          resolve(getDetailData(values, collectionId));
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


export const getImage = (req, res) => {
  const photoId = req.params.photoId;
  const query = req.query && req.query.size;
  const sizes = ["Square", "Large Square", "Thumbnail", "Small", "Small 320", "Medium", "Medium 640", "Medium 800", "Large", "Large 1600", "Large 2048", "Original"];
  const selectedSize = sizes.includes(query) ? query : 'Original';

  getPhotoSizes(photoId)
      .then(({ sizes : { size }}) => {
          const url = size.find(s => s.label == selectedSize).source;
          request.get(url).pipe(res);
      })
      .catch(e => res.status(404).send('Not found'))

};


export const collectionPager = (req, res) => {
  const offset = parseInt(req.query && req.query.offset) || 0;


  getCollections()
      .then(response => {
        const { photosets : { photoset } } = response;
        const totalLength = photoset.length;
        const count = 5;


        const pager = {
          items : photoset.slice(offset, offset + count).map(set => ({
            ...set,
            url : getPhotoshotUrlFromPhoto(set)
          })),
          last : totalLength < (offset + count)
        };

        res.json(pager);

      })
}