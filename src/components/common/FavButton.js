import { useState } from "react";

import "../../style/favButton.css";

const FavButton = () => {
  const [isLike, setIsLike] = useState(false);

  const handleLikeButton = () => {
    setIsLike(true);
  };
  const handleForgetButton = () => {
    setIsLike(false);
  };

  return (
    <div>
      {isLike ? (
        <button className="nofav-button" onClick={handleForgetButton}>
          Forget Favourite
        </button>
      ) : (
        <button className="fav-button" onClick={handleLikeButton}>
          Add Favourite
        </button>
      )}
    </div>
  );
};

export default FavButton;
