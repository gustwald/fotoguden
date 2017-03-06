const { Vimeo } = require('vimeo');


export const videos = (req, res) => new Promise((resolve, reject) =>
    getVideos()
        .then(response => resolve(getVideoData(response)))
);


const getVideos = () => {
    const CLIENT_ID = 'bdea6ebb33be2fe918009e67cd4c29a1ff326a23';
    const CLIENT_SECRET = '1jgZvE54Ax3+gAtuphHMAOaquq4LmFsBN97DJowuhJqomE0bWHzN2qhj8wkjok9hQaL2OnN/vRTPB1QhRwHDmYs+4zgTC+vig7LGddg5OQ1C63qjQV6Sxrx7NIgOK0qd';
    const AUTH_TOKEN = 'e50460296831244cb8e1cdb7d330d63d';
    const lib = new Vimeo(CLIENT_ID, CLIENT_SECRET, AUTH_TOKEN);

    lib.request({
        path : 'users/user38855483/albums'
    }, (error, body, status_code, headers) => {
        console.log(error, body)
    })
}



const getVideoData = response => {
     const responseData = {
      metaData : {
        title : 'Videos',
      },
      template : 'videos',
      content : undefined
    };

    return {
      ...responseData,
      content : {}
    }
}

export default videos;