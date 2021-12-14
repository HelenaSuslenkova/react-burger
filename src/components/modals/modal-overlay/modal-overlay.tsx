import { FC } from 'react';
import modalOverlayStyles from './modal-overlay.module.css';

type ModalOverlayProps = {
  closeModal: () => void;
}

export const ModalOverlay: FC<ModalOverlayProps> = ({ children, closeModal }): JSX.Element => (
    <div className={modalOverlayStyles.container} onClick={closeModal}>
      {children}
    </div>
);
