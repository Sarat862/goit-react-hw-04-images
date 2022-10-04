import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import css from './Modal.module.css';

const modalRoot = document.getElementById("modal-root");

export function Modal({onClose, children}) {

  useEffect(() => {
    const closeModal = (e) => {
    if (e.code === "Escape") {
      onClose();
    }
  }
    document.addEventListener("keydown", closeModal);
    return function () {
      document.removeEventListener("keydown", closeModal);
    }
  }, [onClose])

  const closeModal = (e) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  }

  return createPortal (
    <div className={css.overlay} onClick={closeModal}>
      <div className={css.modal}>
        {children}
      </div>
    </div>,
    modalRoot
    )
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
}