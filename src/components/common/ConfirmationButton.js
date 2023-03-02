import { useState } from 'react';

function ConfirmationButton({ confirmation, onConfirm, ...props }) {
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const showConfirmation = () => setConfirmationVisible(true);
  const hideConfirmation = () => setConfirmationVisible(false);

  const handleClick = showConfirmation;
  const handleConfirmClick = () => {
    hideConfirmation();
    onConfirm();
  };
  const handleCancelClick = hideConfirmation;

  return (
    <>
      <button className='button-cancel' onClick={handleClick} {...props} />
      {confirmationVisible && (
        <dialog className='confirmation'>
          <div className='confirmation-message'>
          {confirmation}
          </div>
          <div>
          <button className='button-sign' onClick={handleConfirmClick}>Ok</button>
          </div>
          <div>
          <button className='button-cancel' onClick={handleCancelClick}>Cancel</button>
          </div>
        </dialog>
      )}
    </>
  );
}

export default ConfirmationButton;
