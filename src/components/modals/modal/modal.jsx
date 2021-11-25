import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { MODAL_TYPES } from '../../../utils/const';

function ModalIngredient({ isShow, closeModal, title, children, modalType }) {
  const ESCAPE_KEY = 27;

  const {state} = useLocation();
  const navigate = useNavigate();
  const isModalOpen = state?.isModalOpen;

  const [isShowModal, setIsShowModal] = useState(false);
  const [modal, setTypeModal] = useState(modalType);

  const closeOnEscapeKey = (e) => {
    e.preventDefault();
    if((e.charCode || e.keyCode) === ESCAPE_KEY) {
      closeHandler();
    }
  }

  const closeHandler = () => {
    if (modal === MODAL_TYPES.modalIngredient) {
      resetModalState();
      navigate(state?.path);
    } else if (modal === MODAL_TYPES.modalOrder) {
      resetModalState();
      closeModal && closeModal();
    } else {
      resetModalState();
    }
  }
  const resetModalState = () => {
    setIsShowModal(false);
    setTypeModal('');
  }

  useEffect(() => {
    if (modal === MODAL_TYPES.modalIngredient) {
      setIsShowModal(isModalOpen);
    } else if (modal === MODAL_TYPES.modalOrder) {
      setIsShowModal(isShow);
    } else {
      setIsShowModal(false);
    }
  }, [modal, isShow, isModalOpen])


  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKey);

    return()=> {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    }
  }, [])

  return createPortal(
    (
      <>
        {isShowModal &&
          <ModalOverlay closeModal={closeHandler}>
            <div className={modalStyles.content} onClick={(e) => e.stopPropagation()}>
              <div className={modalStyles.header}>
                <p className="text text_type_main-large">{title}</p>
                <div className={modalStyles.icon__close}><CloseIcon onClick={closeHandler} type="primary" /></div>
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

ModalIngredient.propTypes = {
  isShow: PropTypes.bool,
  closeModal: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.element,
  modalType: PropTypes.string,
}

export default ModalIngredient;
