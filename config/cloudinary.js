const cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,     //"dyieekcre"
    api_key:  process.env.CLOUD_KEY,        //"732513327822775"
    api_secret: process.env.CLOUD_SECRET    //"HzlXLGG447c9m92q6a8vhWoiR-c"
});

exports.uploads = (file, folder) => {
    return new Promise(resolve => {
      cloudinary.uploader.upload(file, (result) => {
        resolve({
          url: result.url,
          id: result.public_id
        })
      }, {
        resource_type: "auto",
        folder: folder
      })
    })
  }
