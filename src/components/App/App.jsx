import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import css from './App.module.css'
import { Searchbar } from '../Searchbar/Searchbar';
import { searchImages } from '../API/Api';
import { Loader } from '../Loader/Loader';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import {Button} from '../Button/Button';
import { Modal } from 'components/Modal/Modal';

export class App extends Component {
  state = {
    imageName: '',
    images: [],
    loading: false,
    error: null,
    page: 1,
    showModal: false,
    modalContent: {
      largeImageURL: '',
      tags: ''
    },
    total: null,
  }

  componentDidUpdate(_, prevState) {
    const { imageName, page } = this.state;
    if (prevState.imageName !== imageName || prevState.page !== page) {
      this.fetchImage(imageName, page);
    }  
  } 

  async fetchImage() {
    const { imageName, page } = this.state;
    
    this.setState({ loading: true });

    try {
      const data = await searchImages(imageName, page);
      if (data.totalHits === 0) {
          return toast.error("images not found");
      }
      this.setState(({ images }) => {
          return {
              images: [...images, ...data.hits],
              total: data.totalHits,
          }
      })
    } catch (error) {
        this.setState({ error });
    } finally {
        this.setState({ loading: false });
    }
  } 

  loadMore = () => {
      this.setState(({ page }) => {
          return { page: page + 1, loading: true }
      })
  }

  openModal = (modalContent) => {
      this.setState({
          showModal: true,
          modalContent
      })
  }

  closeModal = () => {
      this.setState({
          showModal: false,
          modalContent: {
              largeImageURL: '',
              tags: ''
          }
      })
  }

  handleFormSubmit = imageName => {
    this.setState({
      imageName,
      images: [],
      page: 1,
    });
  }

  
  render() {
    const { loading, images, error, showModal, modalContent, total } = this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {error && toast.error("try repeat your search query or enter new")}
        {images && <ImageGallery onClick={this.openModal} images={images} />}
        {loading && <Loader /> }
        {images.length > 0 && images.length < total && <Button loadMore={this.loadMore} />}
        {showModal && <Modal onClose={this.closeModal}>
            <img src={modalContent.largeImageURL} alt={modalContent.tags } />
        </Modal>}
        <ToastContainer position="top-center" hideProgressBar autoClose={2000} theme="colored"/>
      </div>
    );
  }
}