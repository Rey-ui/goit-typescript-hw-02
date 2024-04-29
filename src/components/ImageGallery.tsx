import ImageCard from "./ImageCard.jsx";
import css from "./ImageGallery.module.css";
import React from "react";
interface Image {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
}

interface ImageGalleryProps {
  images: Image[];
  openModal: (imageUrl: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, openModal }) => {
  return (
    <ul className={css.cardContainer}>
      {images.map((photo) => (
        <li className={css.cardItem} key={photo.id}>
          <ImageCard photo={photo} openModal={openModal} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
