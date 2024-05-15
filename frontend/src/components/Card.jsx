import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ image, book_name, author, votes, rating }) => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="max-w-sm rounded overflow-hidden shadow-lg relative group transition-opacity duration-300 ease-in-out">
        <img className="w-full h-64 object-cover" src={image} alt={`${book_name} cover`} />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-50"></div>
        <div className="px-6 py-4 relative z-10 group-hover:bg-gray-300 transition-all duration-500 ease-in-out">
          <div className="font-bold text-xl mb-2 text-white">{book_name}</div>
          <p className="text-white text-base">{author}</p>
          <p className="text-white text-base">Votes - {votes}</p>
          <p className="text-white text-base">Rating - {rating}</p>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  image: PropTypes.string.isRequired,
  book_name: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
};

export default Card;
