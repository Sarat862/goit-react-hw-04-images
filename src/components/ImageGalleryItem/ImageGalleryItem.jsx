import css from './ImageGalleryItem.module.css';

export function ImageGalleryItem({images, onClick}) {
  return (
    images.map(({ id, webformatURL, tags, largeImageURL }) =>
      <li key={id} className={css.imageGalleryItem} onClick={()=>onClick({largeImageURL, tags})}> 
        <img className={css.imageGalleryItem__image} src={webformatURL} alt={tags} />
      </li>)
  )
}