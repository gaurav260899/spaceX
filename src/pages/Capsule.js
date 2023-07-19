import { useState, useEffect } from "react";
import { Loading } from "../components";
import { AiOutlineSearch } from "react-icons/ai";

export default function Capsule() {
  const [capsules, setCapsules] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchCapsules();
  }, []);

  const fetchCapsules = async () => {
    try {
      const response = await fetch("https://api.spacexdata.com/v4/capsules");
      const data = await response.json();
      setCapsules(data);
    } catch (error) {
      console.error("Error fetching capsule data:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
  };

  const handlePopupClose = () => {
    setSelectedItem(null);
  };

  const filteredCapsules = capsules.filter((capsule) => {
    const searchQueryLower = searchQuery.toLowerCase();
    const typeLower = (capsule.type || "").toLowerCase();
    const statusLower = (capsule.status || "").toLowerCase();
    const originalLaunchLower = (capsule.original_launch || "").toLowerCase();

    return (
      typeLower.includes(searchQueryLower) ||
      statusLower.includes(searchQueryLower) ||
      originalLaunchLower.includes(searchQueryLower)
    );
  });

  const indexOfLastCard = currentPage * 10;
  const indexOfFirstCard = indexOfLastCard - 10;
  const currentCards = filteredCapsules.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const pageNumbers = Math.ceil(filteredCapsules.length / 10);

    return (
      <div className="flex justify-center mt-5">
        {Array.from({ length: pageNumbers }, (_, index) => (
          <button
            key={index + 1}
            className={`px-3 py-1 mx-1 rounded-md ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  };

  return (
    <section className="py-32">
      <h1 className="heading text-center mb-10">Capsules</h1>

      <div className="flex flex-col items-center md:flex-row md:justify-center mb-5">
        <input
          type="text"
          placeholder="Search capsules..."
          className="px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 md:mb-0 md:mr-3"
          value={searchQuery}
          onChange={handleSearch}
        />
        <button className="px-4 py-3 bg-blue-500 text-white rounded-r-md">
          <AiOutlineSearch />
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5">
        {capsules.length === 0 ? (
          <Loading />
        ) : (
          currentCards.map((capsule) => {
            const {
              id,
              type,
              status,
              serial,
              launches,
              last_update,
              land_landings,
              water_landings,
              reuse_count,
            } = capsule;

            return (
              <article
                key={id}
                className="relative bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => handleCardClick(capsule)}
              >
                <h2 className="text-xl font-bold mb-5 text-white">
                  {type},{" "}
                  <span className="text-base opacity-75 font-light">
                    {serial}
                  </span>
                </h2>
                <ul className="text-white">
                  <li className="mb-1">{launches.length} launches</li>
                  <li className="mb-1">{land_landings} land landings</li>
                  <li className="mb-1">{water_landings} water landings</li>
                  <li className="mb-1">Reused {reuse_count} times</li>
                  <li className={status === "active" ? "text-emerald-600" : "text-rose-600"}>
                    {status === "active" ? "Active" : "Retired"}
                  </li>
                </ul>
                <p className="mt-5 opacity-75 text-white">{last_update}</p>
              </article>
            );
          })
        )}
      </div>

      {selectedItem && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-5">{selectedItem.type}</h2>
            <ul>
              <li>ID: {selectedItem.id}</li>
              <li>Status: {selectedItem.status}</li>
              <li>Serial: {selectedItem.serial}</li>
              <li>Launches: {selectedItem.launches.length}</li>
              <li>Land Landings: {selectedItem.land_landings}</li>
              <li>Water Landings: {selectedItem.water_landings}</li>
              <li>Reuse Count: {selectedItem.reuse_count}</li>
              <li>Last Update: {selectedItem.last_update}</li>
            </ul>
            <button
              className="mt-5 px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={handlePopupClose}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {renderPagination()}
    </section>
  );
}
