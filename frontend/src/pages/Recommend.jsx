import { useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import Navbar from "../components/Navbar";

const Recommend = () => {
  const [userInput, setUserInput] = useState("");
  const [books, setBooks] = useState([]);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const requestData = JSON.stringify({ user_input: userInput });

      const response = await axios.post(
        "http://localhost:8081/recommend_books",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const mappedData = response.data.book_name.map((name, index) => ({
        book_name: name,
        author: response.data.author[index],
        image: response.data.image[index],
      }));

      setBooks(mappedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Input is Wrong");
    }
  };

  return (
    <div>
      <Navbar />

      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl mt-6 ml-5">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Recommend Books
        </span>
      </h1>

      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Mockups, Logos..."
            value={userInput}
            onChange={handleInputChange}
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-white-400 "
          >
            Search
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8">
        {books.map((book, index) => (
          <div key={index}>
            <Card {...book} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommend;
