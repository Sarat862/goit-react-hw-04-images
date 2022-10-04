import { createPortal } from 'react-dom';
import { Component } from 'react';
import css from './Modal.module.css';

const modalRoot = document.getElementById("modal-root");

export class Modal extends Component {
  
  componentDidMount() {
    document.addEventListener("keydown", this.closeModal);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.closeModal);
  }

  closeModal = (e) => {
    if (e.currentTarget === e.target || e.code === "Escape") {
      this.props.onClose()
    }
  }

  render() {
    return createPortal (
      <div className={css.overlay} onClick={this.closeModal}>
        <div className={css.modal}>
          {this.props.children}
        </div>
      </div>,
      modalRoot
     )
  }
}