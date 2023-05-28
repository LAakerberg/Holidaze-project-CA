import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

/**
 * Component for searching and displaying search results.
 *
 * @param {Object[]} data - The data to be searched.
 * @returns {JSX.Element} The Search component.
 */
export const Search = ({ data }) => {
  const [query, setQuery] = useState('');
  const [hasInput, setHasInput] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const searchResultsRef = useRef(null);

  /**
   * Handles the input change event and updates the search results.
   *
   * @param {Object} event - The input change event.
   */
  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    const newData = value
      ? data.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        )
      : [];
    setFilteredData(newData);
    setHasInput(value !== '');
  };

  /**
   * Handles the document click event and resets the search state if necessary.
   *
   * @param {Object} event - The document click event.
   */
  const handleDocumentClick = (event) => {
    const isLink = event.target.tagName.toLowerCase() === 'a';
    const isOutsideResults =
      searchResultsRef.current &&
      !searchResultsRef.current.contains(event.target);

    if (isLink || isOutsideResults) {
      setQuery('');
      setFilteredData([]);
      setHasInput(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <>
      <input
        type="search"
        placeholder="Search for a venue..."
        value={query}
        onChange={handleInputChange}
        className="w-40 tablet:w-48 md:w-52 h-8 p-1 rounded-md outline outline-1"
      />
      <div
        className={`absolute pt-1 w-full ${hasInput ? 'bg-topaz/90' : ''}`}
        ref={searchResultsRef}
      >
        <ul className="backdrop-blur-xl p-1 text-black rounded-lg">
          {filteredData.map((item) => (
            <li
              key={item.id}
              className="block odd:bg-topaz/90 even:bg-fawn/20 hover:bg-gray-200 px-1"
            >
              <Link to={`/venues/details/${item.id}`} className="">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="backdrop-blur-xl p-1">
          {query.length > 0 && filteredData.length === 0 && (
            <p className="text-red-800">No results found.</p>
          )}
        </div>
      </div>
    </>
  );
};
