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
        'https://unsplash.it/200/300?random',
        'https://unsplash.it/200/300?random',
        'https://unsplash.it/200/300?random',
        'https://unsplash.it/200/300?random',
        'https://unsplash.it/200/300?random',
        'https://unsplash.it/200/300?random',
        'https://unsplash.it/200/300?random',
        'https://unsplash.it/200/300?random',
        'https://unsplash.it/200/300?random',
        'https://unsplash.it/200/300?random',
        'https://unsplash.it/200/300?random',
        'https://unsplash.it/200/300?random'
      ],
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