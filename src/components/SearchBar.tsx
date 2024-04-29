import css from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useState, ChangeEvent, FormEvent } from "react";
interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(evt.target.value);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (searchValue.trim() === "") {
      toast.error("Please enter a search query.");
      return;
    }
    onSubmit(searchValue.trim());
  };

  return (
    <header className={css.header}>
      <form className={css.formSearch} onSubmit={handleSubmit}>
        <input
          className={css.inputSearch}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchValue}
          onChange={handleChange}
          name="search"
        />
        <button className={css.buttonSearch} type="submit">
          Search
        </button>
        <Toaster />
      </form>
    </header>
  );
};
export default SearchBar;
