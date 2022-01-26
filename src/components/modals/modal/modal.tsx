import { useEffect, useState, FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyles from './modal.module.css';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import { MODAL_TYPES } from '../../../utils/const';

type ModalProps = {
  isShow?: boolean;
  closeModal?: () => void;
  title?: string;
  modalType: string;
}

export const Modal: FC<ModalProps> = ({ isShow, closeModal, title, children, modalType }): JSX.Element => {
  const ESCAPE_KEY = 'Escape';

  const { state } = useLocation();
  const navigate = useNavigate();
  const isModalOpen = state?.isModalOpen;

  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [modal, setTypeModal] = useState<string>(modalType);

  const closeOnEscapeKey = (event: KeyboardEvent): void => {
    event.preventDefault();
    if (event.key &&  event.key === ESCAPE_KEY) {
      closeHandler();
    }
  }

  const closeHandler = () => {
    if (modal === MODAL_TYPES.modalIngredient || modal === MODAL_TYPES.modalOrderFeed) {
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
    if (modal === MODAL_TYPES.modalIngredient || modal === MODAL_TYPES.modalOrderFeed) {
      setIsShowModal(isModalOpen);
    } else if (modal === MODAL_TYPES.modalOrder) {
      setIsShowModal(isShow!);
    } else {
      setIsShowModal(false);
    }
  }, [modal, isShow, isModalOpen])


  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKey);

    return() => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    }
  }, [closeOnEscapeKey])

  return createPortal(
    (
      <>
        {isShowModal &&
          <ModalOverlay closeModal={closeHandler}>
            <div className={modalStyles.content} onClick={(event) => event.stopPropagation()}>
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
    document.getElementById('modals')!
  )
}
