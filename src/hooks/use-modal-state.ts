import { useState } from 'react';

function useModalState(showModal?: () => void, closeModal?: () => void, initialState = false) : [isShow: boolean, closeHandler:  () => void, showHandler:  () => void] {
  const [isShow, setIsShow] = useState<boolean>(initialState);

  const closeHandler = () => {
    closeModal && closeModal()
    setIsShow(false);
  }

  const showHandler = () => {
    showModal && showModal()
    setIsShow(true);
  }

  return [isShow, closeHandler, showHandler];
}

export default useModalState;
