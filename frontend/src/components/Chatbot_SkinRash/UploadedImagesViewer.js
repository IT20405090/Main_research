import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/UploadForm.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UploadedImagesViewer() {
    const [images, setImages] = useState([]);


    //delete image function
    const deleteImage = (filename) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this image?');
      
        if (isConfirmed) {
          fetch(`http://localhost:5000/delete-image/${filename}`, { method: 'DELETE' })
            .then((response) => {
              if (response.status === 200) {
                // Image deleted successfully, update the image list
                setImages((prevImages) => prevImages.filter((image) => image !== filename));
      
                // Display a success toast
                toast.success('Image deleted successfully', {
                    position: 'top-center', // Set the position to 'top-center'
                    autoClose: 3000, // 3 seconds
                    hideProgressBar: true, // Hide the progress bar
                    closeOnClick: true, // Close the toast when clicked
                    pauseOnHover: true, // Pause the auto-close on hover
                    draggable: true, // Allow dragging the toast
                    bodyClassName: 'custom-toast-body', // Apply a custom CSS class to the toast body
                    
                });
              } else {
                console.error('Error deleting image');
                toast.error('Error deleting image', {
                  position: 'bottom-right',
                  autoClose: 3000,
                });
              }
            })
            .catch((error) => {
              console.error('Error deleting image:', error);
              toast.error('Error deleting image', {
                position: 'bottom-right',
                autoClose: 3000,
              });
            });
        }
      };
      

    // Function to create a download link for an image
    const createDownloadLink = (imageName) => {
        return `http://localhost:5000/download-image/${imageName}`;
    };

    useEffect(() => {
        fetch('http://localhost:5000/list-images')
            .then((response) => response.json())
            .then((data) => setImages(data.images))
            .catch((error) => console.error('Error fetching images:', error));
    }, []);

    return (
        <div className='bg3'>
           <center> <h1 className='Topic'>Uploaded Images</h1></center>

            <Link to="/upload"><button type="button" class="btn btn-primary" 
            style={{marginRight:'970px', backgroundColor:'#3895d3', color:'white', border:'white', width:'100px', height:'30px', fontSize:'15px'}} >
              <i class="far fa-arrow-alt-circle-left"></i>&nbsp;Go Back</button>
            </Link>

            <center>
            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Image Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {images.map((image, index) => (
                        <tr key={index}>
                            <td>
                                <img src={`http://localhost:5000/static/uploads/${image}`} 
                                alt={`Uploaded Image`}
                                style={{ maxWidth: '400px', maxHeight: '400px' }}
                                 />
                            </td>
                            <td style={{fontSize:'15px'}}>{image}</td>
                            <td>
                                <button type="button" style={{fontSize:'15px'}} class="btn btn-danger" onClick={() => deleteImage(image)}> <i class="fa-regular fa-trash-can"></i> Delete</button>
                                &nbsp; &nbsp; &nbsp;
                                <button type="button" class="btn btn-info" ><a href={createDownloadLink(image)} download={image} style={{color:'white',fontSize:'15px'}}>
                                <i class="fa-regular fa-circle-down"></i>  Download
                                </a>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </center>
        </div>
    );
}

export default UploadedImagesViewer;
