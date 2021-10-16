import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';

function Modal({ isShow, closeModal, title, children}) {

  const ESCAPE_KEY = 27

  const closeOnEscapeKey = (e) => {
    e.preventDefault();
    if((e.charCode || e.keyCode) === ESCAPE_KEY) {
      closeModal();
    }
  }

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKey);

    return()=> {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    }
  }, [])

  return createPortal(
    (
      <>
        {isShow &&
          <ModalOverlay closeModal={closeModal}>
            <div className={modalStyles.content} onClick={(e) => e.stopPropagation()}>
              <div className={modalStyles.header}>
                <p className="text text_type_main-large">{title}</p>
                <div className={modalStyles.icon__close}><CloseIcon onClick={closeModal} type="primary" /></div>
              </div>
              <div className={modalStyles.body}>
                {children}
              </div>
            </div>
          </ModalOverlay>
        }
      </>
    ),
    document.getElementById('modals')
  )
}

Modal.propTypes = {
  isShow: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.element,
}

export default Modal;
