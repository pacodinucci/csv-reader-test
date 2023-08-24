import { useState } from 'react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}


const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');


  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div>
        <h1 className="text-slate-700 text-4xl">Search CSV Data</h1>
        <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='border-2 rounded-md my-8 py-1'
        />
        <button onClick={handleSearch} className='border border-black rounded-sm px-2 py-1 m-1 bg-zinc-200'>Search</button>
    </div>
  );
}

export default SearchBar;
