import { useState } from 'react';

export const Search = ({ data }) => {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    const newData = value
      ? data.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        )
      : [];
    setFilteredData(newData);
  };

  return (
    <>
      <input
        type="search"
        placeholder="Search for a venues..."
        value={query}
        onChange={handleInputChange}
        className="w-60 h-8 p-1 rounded-md outline outline-1"
      />
      <div className="absolute pt-1">
        <ul className="backdrop-blur-xl bg-topaz/70 text-black w-80 rounded-lg">
          {filteredData.map((item) => (
            <li key={item.id} className="block">
              {item.name}
            </li>
          ))}
        </ul>
        <div>
          {' '}
          {query.length > 0 && filteredData.length === 0 && (
            <p className="text-red-500">No results found.</p>
          )}
        </div>
      </div>
    </>
  );
};
