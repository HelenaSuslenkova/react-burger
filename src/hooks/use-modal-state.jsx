import { useState } from 'react';
function useModalState(showModal, closeModal, initialState = false) {

  const [isShow, setIsShow] = useState(initialState);

  const closeHandler = () => {
    closeModal && closeModal()
    setIsShow(false);
  }
  const showHandler = () => {
    showModal && showModal()
    setIsShow(true);
  }

  return [isShow, closeHandler, showHandler ];
}

export default useModalState;
