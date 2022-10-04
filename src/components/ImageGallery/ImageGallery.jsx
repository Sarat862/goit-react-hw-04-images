import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem'

export function ImageGallery({images, onClick}) {
  return (
      <ul className={css.imageGallery}>
        <ImageGalleryItem onClick={onClick} images={images} />
    </ul>
  )
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.exact).isRequired,
  onClick: PropTypes.func.isRequired,
}