/** @format */

import React from 'react';
import Resizer from 'react-image-file-resizer';
import { useSelector } from 'react-redux';
import axios from 'axios';

// CSS & MUI Icons
import './fileUpload.scss';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

function FileUpload(props) {
  const { values, setValues, setLoading } = props;
  const { user } = useSelector(state => ({ ...state }));

  const fileUploadAndResize = e => {
    //console.log(e.target.files);

    let files = e.target.files;
    let allUploadedFiles = values.images;

    console.log(allUploadedFiles);

    if (files) {
      setLoading(true);

      for (let i = 0; i < files.length; i++) {
        // Resize
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          'JPEG',
          100,
          0,
          uri => {
            console.log(uri);

            axios
              .post(
                // Send resized image URLs to Cloudinary
                `${process.env.REACT_APP_API}/images`,
                { image: uri },
                {
                  headers: {
                    authtoken: user ? user.token : '',
                  },
                }
              )
              .then(res => {
                // Cloudinary send back image_id(public_id) & url
                console.log('IMAGE UPLOAD RES DATA', res);

                // Add the result to allUploadedFiles array
                // Set url to images[]/'values.images' in the parent component state - Product
                allUploadedFiles.push(res.data);
                setValues({ ...values, images: allUploadedFiles });

                setLoading(false);
              })
              .catch(err => {
                setLoading(false);
                console.log('CLOUDINARY UPLOAD ERR', err);
              });
          },
          'base64'
        );
      }
    }
  };

  const handleImageRemove = public_id => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API}/image`,
        { public_id },
        {
          headers: {
            authtoken: user?.token,
          },
        }
      )
      .then(res => {
        const { images } = values;
        let filteredImages = images.filter(img => {
          return img.public_id !== public_id;
        });

        //console.log('filteredImages', filteredImages);
        setValues({ ...values, images: filteredImages });

        setLoading(false);
      })
      .catch(err => {
        console.log('REMOVING IMG ERROR', err);
        setLoading(false);
      });
  };

  return (
    <div className='fileUpload__section'>
      {/* <h3 className='dashboard__title--sub'> </h3> */}
      <form className='fileUpload__form'>
        <label className='fileUpload__label'>
          Upload File <FileUploadIcon className='fileUpload__icon' />
          <input
            type='file'
            multiple
            accept='images/*'
            className='fileUpload__input'
            onChange={fileUploadAndResize}
            hidden
          />
        </label>
      </form>
      <div className='fileUpload__images'>
        {values.images.map(img => (
          <div className='fileUpload__preview' key={img.public_id}>
            <img className='fileUpload__preview--img' src={img.url} />
            <RemoveCircleIcon
              className='fileUpload__preview--delete'
              onClick={() => handleImageRemove(img.public_id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
