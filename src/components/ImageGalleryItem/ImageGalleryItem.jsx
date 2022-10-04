import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export function ImageGalleryItem({images, onClick}) {
  return (
    images.map(({ id, webformatURL, tags, largeImageURL }) =>
      <li key={id} className={css.imageGalleryItem} onClick={()=>onClick({largeImageURL, tags})}> 
        <img className={css.imageGalleryItem__image} src={webformatURL} alt={tags} />
      </li>)
  )
}

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(PropTypes.exact).isRequired,
  onClick: PropTypes.func.isRequired,
}