import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';


function IngredientModal({ closeModal, title, children }) {

  const ESCAPE_KEY = 27;

  const {state} = useLocation();
  const navigate = useNavigate();
  const isModalOpen = state?.isModalOpen;

  const [isShowModal, setIsShowModal] = useState(false);

  const closeOnEscapeKey = (e) => {
    e.preventDefault();
    if((e.charCode || e.keyCode) === ESCAPE_KEY) {
      closeHandler();
    }
  }

  const closeHandler = () => {
    if(closeModal) {
      closeModal()
    } else {
      setIsShowModal(false);
      navigate(state.path);
    }
  }

  useEffect(() => {
    setIsShowModal(isModalOpen)
  }, [])


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

IngredientModal.propTypes = {
  closeModal: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.element,
}

export default IngredientModal;
