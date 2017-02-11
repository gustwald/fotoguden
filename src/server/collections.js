import { getCollections, getPhotosetPhotos } from '../flickrApi';


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

    console.log(photoset)

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
const getCollectionPhotos = () => {
    
}