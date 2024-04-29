import React from "react";
import Modal from "react-modal";
import css from "./App.module.css";
Modal.setAppElement("#root");
const customStyles: Modal.Styles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    background: "none",
    overflow: "hidden",
    padding: "none",
  },
};

interface ImageModalProps {
  modalIsOpen: boolean;
  afterOpenModal: () => void;
  closeModal: () => void;
  selectedImage: string | null;
}

const ImageModal: React.FC<ImageModalProps> = ({
  modalIsOpen,
  selectedImage,
  afterOpenModal,
  closeModal,
}) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {selectedImage && (
        <img className={css.modalImg} src={selectedImage} alt="Selected" />
      )}
    </Modal>
  );
};

export default ImageModal;
