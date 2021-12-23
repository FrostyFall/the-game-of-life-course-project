const Modal = ({ modalInfo, closeModal }) => {
  const { isShown, message } = modalInfo;

  return (
    <div className={isShown ? "modal show" : "modal"} onClick={closeModal}>
      {message}
    </div>
  );
};

export default Modal;
