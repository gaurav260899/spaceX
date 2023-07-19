import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loading } from "../components";

export default function Crew() {
  const [crew, setCrew] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(10);

  useEffect(() => {
    const fetchCrew = async () => {
      try {
        const res = await fetch("https://api.spacexdata.com/v4/crew");
        const data = await res.json();
        setCrew(data);
      } catch (error) {
        console.error("Error fetching crew data:", error);
      }
    };

    fetchCrew();
  }, []);

  // Get current cards for the current page
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = crew.slice(indexOfFirstCard, indexOfLastCard);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {!crew ? (
        <Loading />
      ) : (
        <section className="py-32">
          <h1 className="heading text-center mb-10">Crew</h1>

          <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5">
            {currentCards.map(({ id, name, image }) => (
              <Link key={id} to={`/crew/${id}`}>
                <article className="relative">
                  <img src={image} alt={name} loading="lazy" className="h-96 w-full object-cover" />
                  <h2 className="absolute bottom-5 left-5 font-bold text-white text-lg tracking-wide">
                    {name}
                  </h2>
                </article>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            {Array.from(Array(Math.ceil(crew.length / cardsPerPage)).keys()).map((pageNumber) => (
              <button
                key={pageNumber + 1}
                onClick={() => paginate(pageNumber + 1)}
                className={`mx-2 px-4 py-2 rounded-lg ${
                  pageNumber + 1 === currentPage ? "bg-gray-600 text-white" : "bg-gray-400 text-gray-900"
                }`}
              >
                {pageNumber + 1}
              </button>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
