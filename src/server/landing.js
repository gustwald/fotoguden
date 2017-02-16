import { getCollections } from '../flickrApi';

const getPhotoshotUrlFromPhoto = photo => {

  return `/api/photos/${photo.primary}`
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
      selectedImages : [
        'http://localhost:3000/api/photos/29140268763?size=Large',
        'http://localhost:3000/api/photos/29653164632?size=Large',
        'http://localhost:3000/api/photos/28851867815?size=Large',
        'http://localhost:3000/api/photos/28746896672?size=Large',
        'http://localhost:3000/api/photos/28236880103?size=Large',
        'http://localhost:3000/api/photos/32007398410?size=Large',
        'http://localhost:3000/api/photos/27344909850?size=Large',
        'http://localhost:3000/api/photos/32007391890?size=Medium',
      ],
      photosets : photoset.slice(0, 5).map(set => ({
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