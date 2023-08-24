import React  from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { ADD_DATA } from '../redux';
import { toast } from 'react-toastify';

interface DataAction {
  type: typeof ADD_DATA;
  payload: Record<string, string>[];
}


const FileUpload: React.FC = () => {
  

  const dispatch = useDispatch();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await axios.post('http://localhost:3000/api/files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if(response){
        const getDataResponse = await axios('http://localhost:3000/api/users');
        const updatedData = getDataResponse.data.data;

        const action: DataAction = {
          type: ADD_DATA,
          payload: updatedData
        };
        dispatch(action)
      }
      toast.success("File uploaded succesfully!");
    } catch (error) {
      console.log((error as Error).message);
      toast.error((error as Error).message);  
    }
  };

  return (
    <div>
      <h1 className="text-slate-700 text-4xl">CSV File Upload</h1>
      <form>
        <input type="file" accept=".csv" onChange={handleFileUpload} className="p-8 rounded-md text-xl" />
      </form>
    </div>
  );
};

export default FileUpload;
