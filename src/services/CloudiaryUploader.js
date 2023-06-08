import React, { useState } from 'react';
import { addAppointmentCloudinary } from './api';
import { Input } from 'reactstrap';
import { toast } from 'react-hot-toast';
import '@styles/react/libs/react-select/_react-select.scss';


const ImageUploader = ({ id, update }) => {
  const [image, setImage] = useState('');
  //const cloudinary = new Cloudinary({ cloud_name: 'djqsy6b2p' });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'iestablero'); // Replace "your_upload_preset" with your actual upload preset name in Cloudinary

    // Send the image to the Cloudinary server
    fetch('https://api.cloudinary.com/v1_1/djqsy6b2p/image/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        addAppointmentCloudinary(
          { "id": id, "url": data.secure_url }
        ).then(e => {
          toast.success('Imagen Subida')
        }).catch(e => {
          toast.error('Error al guardar la Imagen')
        });
        setImage(data.public_id); // Save the public ID of the image
        update(true);
      })
      .catch((error) => {
        console.error('Error uploading the image:', error);
      });
  };




  return (
    <div>
      <Input type="file" title='Añadir Foto' onChange={handleImageUpload} />
    </div>
  );
};

export default ImageUploader;
