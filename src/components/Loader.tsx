import React from "react";
import { Audio } from "react-loader-spinner";
const Loader: React.FC = () => {
  return (
    <div>
      <Audio
        height="80"
        width="80"
        color="green"
        ariaLabel="loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
