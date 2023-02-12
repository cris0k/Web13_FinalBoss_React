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
      <button onClick={handleClick} {...props} />
      {confirmationVisible && (
        <div>
          {confirmation}
          <button onClick={handleConfirmClick}>Ok</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      )}
    </>
  );
}

export default ConfirmationButton;
