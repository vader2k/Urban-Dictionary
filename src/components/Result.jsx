import { useState, useEffect } from 'react';
import { FcSearch } from 'react-icons/fc';
import axios from 'axios';

const Result = () => {
  const [search, setSearch] = useState('');
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axios.get('https://urban-dictionary7.p.rapidapi.com/v0/define', {
        params: { term: `${search}` },
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
          'X-RapidAPI-Host': 'urban-dictionary7.p.rapidapi.com',
        },
      });
      setApiData(res.data.list[0]);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (buttonClicked) {
      fetchData();
      setButtonClicked(false);
    }
  }, [buttonClicked]);

  // Accessing individual pieces of data
  const word = apiData?.word || '';
  const author = apiData?.author || '';
  const example = apiData?.example || '';
  const result = apiData?.definition || '';

  return (
    <div className="mt-[30px] w-full flex flex-col items-center">
      <div className="relative">
        <input
          type="text"
          placeholder="enter a word.."
          className="py-3 px-6 w-full min-w-[300px] text-[0.8rem] outline-none rounded-[90px] bg-gray-400 text-white"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="absolute right-[10px] top-[10px]">
          <FcSearch
            className="text-[1.3rem]"
            onClick={() => setButtonClicked(true)}
          />
        </div>
      </div>
      <div className='w-full my-[15px] flex justify-evenly items-end uppercase text-[1.5rem] font-semibold text-gray-600'>
        {word && (<span className='text-black'>{word}</span>)}
        {author && (<span className='text-[0.8rem]'>author: {author}</span>)}
      </div>
      <div className='italic text-[0.9rem]'>
        {example && (<span> example: {example}</span>)}
      </div>
      {error ? "oops something went wrong" :
        result && (
          <div className='bg-gray-400 text-white mt-[10px] p-3 leading-[1.5rem] rounded-[15px] w-full min-h-[180px]'>
            <p className='mt-[15px]'>{result}</p>
          </div>
        )}
    </div>
  );
};

export default Result;