import PropTypes from 'prop-types';
import modalOverlayStyles from './modal-overlay.module.css';

const ModalOverlay = ({ children, closeModal }) => (
    <div className={modalOverlayStyles.container} onClick={closeModal}>
      {children}
    </div>
);

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  closeModal: PropTypes.func,
}

export default ModalOverlay
