import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux/es/exports';
import { AppState } from './redux/types';
import axios from 'axios';
// import { ADD_DATA } from './redux';
import FileUpload from './components/FileUpload';
import SearchBar from './components/SearchBar';
import Card from './components/Card';


const App: React.FC = () => {
  // const dispatch = useDispatch();
  const data = useSelector((state: AppState) => state.data);
  const [filteredData, setFilteredData] = useState(data);
  
  console.log(filteredData);

  // const fetchAllData = async () => {
  //   try {
  //     const response = await axios('http://localhost:3000/api/users');
  //     const allData = response.data.data;
  //     dispatch({
  //       type: ADD_DATA,
  //       payload: allData
  //     })
  //   } catch (error) {
  //     console.error('Error fetching data:', error)
  //   }
  // }
  
  const handleSearch = async (searchTerm: string) => {
    try {
      const response = await axios(`http://localhost:3000/api/users?q=${searchTerm}`);
      const filteredResults = response.data.data;
      setFilteredData(filteredResults);
    } catch (error) {
      console.error('Error searching data:', error)
    }
  }  

  useEffect(() => {
    handleSearch('')
  }, [data])

  return (
    <>
      <div className='flex justify-between bg-slate-100 items-center w-full p-2 text-xs md:text-l md:p-8'>
        <FileUpload />
        <SearchBar onSearch={handleSearch} />
      </div>
       {/* Renderizar los resultados */}
       <div className='results-container flex flex-wrap justify-center mt-8'>
        {filteredData.map((result) => (
          <Card 
            name={result.name}
            city={result.city}
            country={result.country}
            favorite_sport={result.favorite_sport} />
        ))}
      </div>
    </>
  );
};

export default App;
