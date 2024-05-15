import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
// Card component

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8081/",
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          const transformData = (data) => {
            const transformedData = [];
            for (let i = 0; i < data.author.length; i++) {
              const book = {
                author: data.author[i],
                book_name: data.book_name[i],
                image: data.image[i],
                rating: data.rating[i],
                votes: data.votes[i],
              };
              transformedData.push(book);
            }
            return transformedData;
          };
          const data = response.data;
          const transformedBooks = transformData(data);
          setBooks(transformedBooks);
        } else {
          console.error("Failed to fetch books:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <Navbar />
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl mt-6 ml-5">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 gap-y-8">
          Top 50 Books
        </span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {books.map((book, index) => (
          <div key={index}>
            <Card {...book} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
