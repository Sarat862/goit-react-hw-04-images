import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import css from './App.module.css'
import { searchImages } from '../API/Api';
import { Searchbar } from '../Searchbar/Searchbar';
import { Loader } from '../Loader/Loader';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Modal } from 'components/Modal/Modal';

export function App() {

  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    largeImageURL: '',
    tags: '',
  });
  const [total, setTotal] = useState(null);

  useEffect(() => {
    if (imageName === '') {
      return;
    }

    const fetchImage = async () => {
      setLoading(true);

      try {
        const data = await searchImages(imageName, page);
        if (data.totalHits === 0) {
          return toast.error("images not found");
        }

        setImages((prev) => {
          return [...prev, ...data.hits];
        });
        setTotal(data.totalHits);
      
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    console.log()
    fetchImage()
  }, [imageName, page])

  const loadMore = () => {
    setPage((prev) => {
      return prev + 1;
    });
    setLoading(true);
  }

  const openModal = ({ largeImageURL, tags }) => {
    setShowModal(true);
    setModalContent({ largeImageURL, tags });
  }
  
  const closeModal = () => {
    setShowModal(false);
    setModalContent({
      largeImageURL: '',
      tags: '',
    });
  }

  const handleFormSubmit = imageName => {
    setImageName(imageName);
    setImages([]);
    setPage(1);
  }

  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleFormSubmit} />
      {error && toast.error("try repeat your search query or enter new")}
      {images && <ImageGallery onClick={openModal} images={images} />}
      {loading && <Loader /> }
      {images.length > 0 && images.length < total && <Button loadMore={loadMore} />}
      {showModal && <Modal onClose={closeModal}>
          <img src={modalContent.largeImageURL} alt={modalContent.tags } />
      </Modal>}
      <ToastContainer position="top-center" hideProgressBar autoClose={2000} theme="colored"/>
    </div>
  );
}