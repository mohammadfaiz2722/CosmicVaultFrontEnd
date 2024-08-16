import React, { useState, useEffect, useCallback } from 'react';
import CosmicNotification from './CosmicNotification';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const GallerySection = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/");
    }
  }, [navigate]);

  const fetchAndLoadImages = useCallback(async () => {
    try {
      const userId = localStorage.getItem('id');
      const token = localStorage.getItem('token');
      const response = await fetch(`https://cosmicvaultbackendbismillah.onrender.com/api/photos/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch images');
      const data = await response.json();
  
      const imagePromises = data.map(async (image) => {
        const fullUrl = `https://cosmicvaultbackendbismillah.onrender.com${image.photoUrl.startsWith('/') ? '' : '/'}${image.photoUrl}`;
        try {
          const cachedImage = localStorage.getItem(fullUrl);
          if (cachedImage) {
            return { ...image, photoUrl: cachedImage };
          }
          const imageResponse = await fetch(fullUrl, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (!imageResponse.ok) throw new Error('Failed to fetch image');
          const blob = await imageResponse.blob();
          const objectUrl = URL.createObjectURL(blob);
          localStorage.setItem(fullUrl, objectUrl); // Cache in localStorage
          return { ...image, photoUrl: objectUrl };
        } catch (error) {
          console.error(`Error loading image: ${fullUrl}`, error);
          return { ...image, photoUrl: '/path/to/fallback/image.jpg' };
        }
      });
      const loadedImages = await Promise.all(imagePromises);
      setImages(loadedImages);
    } catch (error) {
      console.error('Fetch error:', error);
      setError('An error occurred while fetching images. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);
  

  useEffect(() => {
    fetchAndLoadImages();
    return () => {
      images.forEach(image => {
        if (image.photoUrl.startsWith('blob:')) {
          URL.revokeObjectURL(image.photoUrl);
        }
      });
    };
  }, [fetchAndLoadImages]);

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const handleDelete = async (imageId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this photo?');

    if (!isConfirmed) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/photos/delete/${imageId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (response.ok) {
        setImages(images.filter((image) => image._id !== imageId));
        setNotification({ type: 'success', message: 'Photo deleted successfully' });
        if (selectedImage && selectedImage._id === imageId) {
          closeImageModal();
        }
      } else {
        console.error('Error deleting image:', data.error);
        setNotification({ type: 'error', message: 'Failed to delete image: ' + data.error });
      }
    } catch (error) {
      console.error('Delete error:', error);
      setNotification({ type: 'error', message: 'An error occurred while deleting the image' });
    }
  };

  const handleSave = (imageUrl) => {
    downloadImage(imageUrl);
  };

  const downloadImage = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cosmic_image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return <div className="text-white text-center">Loading your cosmic images...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="min-h-screen p-8 relative" style={{ backgroundColor: '#050510' }}>
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-6xl font-bold text-center mb-16 text-[#A542E2] font-['Orbitron'] relative z-10 tracking-wider"
      >
        Your Cosmic Collection
      </motion.h1>

      {images.length === 0 ? (
        <div className="text-white text-center">No images found. Start uploading to build your cosmic collection!</div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 relative z-10"
        >
          {images.map((image) => (
            <motion.div
              key={image._id}
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden rounded-2xl cursor-pointer shadow-lg bg-gray-800"
              onClick={() => openImageModal(image)}
            >
              <img
                src={image.photoUrl}
                alt={image.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold font-['Orbitron'] mb-3">{image.title}</h3>
                  <div className="flex justify-between">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(image._id);
                      }}
                    >
                      Delete
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSave(image.photoUrl);
                      }}
                    >
                      Save
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50"
          onClick={closeImageModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.photoUrl}
              alt={selectedImage.title}
              className="max-w-full max-h-[80vh] rounded-xl"
            />
            <div className="absolute top-2 right-2">
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                className="text-white text-4xl font-bold"
                onClick={closeImageModal}
              >
                &times;
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {notification && (
        <CosmicNotification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default GallerySection;

