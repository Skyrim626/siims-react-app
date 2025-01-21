import React from "react";
import Loader from "../../../../components/common/Loader";
import { Button, Input } from "@headlessui/react";

const SearchCoordinatorModalPresenter = ({
  loading,

  toggleModal,
  handleSearch,
  searchTerm,
  setSearchTerm,

  searchResults,
  handleSelectCoordinator,
}) => {
  return (
    <>
      <Loader loading={loading} />

      <div
        className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        onClick={toggleModal}
      >
        <div
          className="relative p-4 w-full max-w-3xl bg-white rounded-lg shadow dark:bg-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Search and Select Coordinator
            </h3>
            <Button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600"
              onClick={toggleModal}
            >
              <svg
                className="w-3 h-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </Button>
          </div>

          <form className="p-4" onSubmit={handleSearch}>
            <div className="mb-4">
              <label
                htmlFor="search"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Search by Coordinator ID, Email, or Name
              </label>

              <div className="flex gap-2 items-center">
                <Input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500"
                  placeholder="Enter search term"
                  required
                />

                <Button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
                >
                  Search
                </Button>
              </div>
            </div>
          </form>

          <div className="mt-4">
            {searchResults.length > 0 ? (
              <div className="overflow-y-auto max-h-64">
                <table className="min-w-full bg-white rounded-lg shadow-md dark:bg-gray-700">
                  <thead>
                    <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal dark:bg-gray-800 dark:text-gray-300">
                      <th className="py-2 px-4 text-left">Name</th>
                      <th className="py-2 px-4 text-left">Email</th>
                      <th className="py-2 px-4 text-left">ID</th>
                      <th className="py-2 px-4 text-center">Phone Number</th>
                      <th className="py-2 px-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm dark:text-gray-300">
                    {searchResults.map((coordinator, index) => (
                      <tr
                        key={coordinator.id}
                        className={`border-b hover:bg-gray-200 cursor-pointer dark:border-gray-600 dark:hover:bg-gray-600 ${
                          index % 2 === 0
                            ? "bg-gray-50 dark:bg-gray-700"
                            : "bg-white dark:bg-gray-800"
                        }`}
                      >
                        <td className="py-2 px-4">{coordinator.id}</td>
                        <td className="py-2 px-4">{coordinator.fullName}</td>
                        <td className="py-2 px-4">{coordinator.email}</td>
                        <td className="py-2 px-4">{coordinator.phoneNumber}</td>

                        <td className="py-2 px-4 text-center">
                          <button
                            onClick={() => handleSelectCoordinator(coordinator)}
                            className="text-white bg-blue-600 hover:bg-blue-700 font-medium py-1 px-3 rounded-lg"
                          >
                            Select
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-300 text-center">
                No coordinators found.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchCoordinatorModalPresenter;
