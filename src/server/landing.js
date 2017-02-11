import { getCollections } from '../flickrApi';

const getPhotoshotUrlFromPhoto = photo => {
  return "http://c1.staticflickr.com/1/" + 
        photo.server + "/" + photo.primary + "_" + photo.secret + "_" + "t.jpg";
}

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

export default () => new Promise((resolve, reject) => 
    getCollections()
        .then(response => resolve(getLandingData(response)))
);