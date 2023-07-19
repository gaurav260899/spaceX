import { useState, useEffect } from "react";
import { Loading } from "../components";

const Core = () => {
  const [cores, setCores] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coresPerPage] = useState(10);

  useEffect(() => {
    const fetchCores = async () => {
      try {
        const res = await fetch("https://api.spacexdata.com/v4/cores");
        const data = await res.json();
        setCores(data);
      } catch (error) {
        console.error("Error fetching core data:", error);
      }
    };

    fetchCores();
  }, []);

  // Get current cores for the current page
  const indexOfLastCore = currentPage * coresPerPage;
  const indexOfFirstCore = indexOfLastCore - coresPerPage;
  const currentCores = cores.slice(indexOfFirstCore, indexOfLastCore);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {!cores ? (
        <Loading />
      ) : (
        <section className="py-32">
          <h1 className="heading text-center mb-10">Cores</h1>

          <div className="max-w-6xl mx-auto grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5">
            {currentCores.map(
              ({
                id,
                status,
                serial,
                launches,
                last_update,
                asds_landings,
                rtls_landings,
                reuse_count,
              }) => (
                <article key={id} className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
                  <h2 className="text-xl font-bold mb-5 text-white">{serial}</h2>

                  <ul className="text-white">
                    <li className="mb-1">Reused {reuse_count} times</li>
                    <li className="mb-1">{launches.length} launches</li>
                    <li className="mb-1">{asds_landings} ASDS landings</li>
                    <li className="mb-1">{rtls_landings} RTLS landings</li>
                    <li className={status === "active" ? "text-emerald-500" : "text-rose-500 capitalize"}>
                      {status === "active" ? "Active" : status}
                    </li>
                  </ul>

                  <p className="mt-5 opacity-75 text-white">{last_update}</p>
                </article>
              )
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            {Array.from(Array(Math.ceil(cores.length / coresPerPage)).keys()).map((pageNumber) => (
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
};

export default Core;
