import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "./components/SearchBar.jsx";
import ImageGallery from "./components/ImageGallery.jsx";
import LoadMoreBtn from "./components/LoadMoreBtn.jsx";
import ImageModal from "./components/ImageModal.jsx";
import Loader from "./components/Loader.jsx";
import React from "react";
import ErrorMessage from "./components/ErrorMessage.jsx";
import axios from "axios";
function App() {
  const [images, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [loadMore, setLoadMore] = useState(1);
  const [topic, setTopic] = useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showBtn, setShowBtn] = useState(false);
  function openModal(imageUrl) {
    setSelectedImage(imageUrl);
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = "#f00";
  }

  function closeModal() {
    setSelectedImage(null);
    setIsOpen(false);
  }
  useEffect(() => {
    if (!topic) {
      return;
    }
    const fetchData = async () => {
      try {
        setLoading(true);
        const { results, total_pages } = await fetchArticles(topic, loadMore);
        if (results.length == 0) {
          toast.error("This didn't work.");
          return;
        }
        setPhotos((prevPhotos) => [...prevPhotos, ...results]);
        setHasError(false);
        setShowBtn(total_pages !== loadMore);
      } catch (error) {
        setHasError(true);
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [topic, loadMore]);

  const handleSubmit = (searchValue) => {
    setTopic(searchValue);
    setPhotos([]);
    setLoadMore(1);
    setHasError(false);
  };
  const fetchArticles = async (topic, page = 1) => {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?client_id=nj4XtoHtERFLRDKvM__gsRKs3HRprXuq4l3RQxg_Pa4&page=${page}&query=${topic}`
    );
    return response.data;
  };
  const handleLoadMore = () => {
    setLoadMore((prevPage) => prevPage + 1);
  };
  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {loading && <Loader />}
      <ImageModal
        modalIsOpen={modalIsOpen}
        afterOpenModal={afterOpenModal}
        closeModal={closeModal}
        selectedImage={selectedImage}
      />
      {hasError ? <ErrorMessage /> : null}
      {<Toaster />}
      {showBtn && images.length > 0 && (
        <LoadMoreBtn handleLoadMore={handleLoadMore} />
      )}
    </>
  );
}

export default App;
