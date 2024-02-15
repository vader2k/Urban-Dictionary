import { useState, useEffect } from 'react';
import { FcSearch } from 'react-icons/fc';
import axios from 'axios';

const Result = () => {
  const [search, setSearch] = useState('');
  const [apiData, setApiData] = useState([]);
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
        setApiData(res.data.list);
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
  const word = apiData[0]?.word || '';

  const handleSubmit = (e) => {
    e.preventDefault()
    setButtonClicked(true)

  }


  return (
    <div className="mt-[30px] w-full flex flex-col items-center">
      <div className="relative">
        <form 
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="enter a word.."
            className="py-3 px-6 w-full min-w-[300px] text-[0.8rem] outline-none rounded-[90px] bg-gray-400 text-white"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type='submit' 
            className="absolute right-[10px] top-[10px]">
            <FcSearch
              className="text-[1.3rem]"
            />
          </button>
        </form>
      </div>
        <span className='text-[1.5rem] uppercase font-semibold text-gray-600 mt-[30px]'>{word}</span>
        <div className='flex overflow-x-auto min-w-[380px] w-full p-3 mt-[20px]'>
          {
            apiData.map((items, index) => (
              <div key={index}>
                <div className='flex flex-col gap-3 p-3 w-[300px] mx-5 text-center min-h-fit'>
                  <div className='text-[0.8rem]'>
                    author : {items.author}
                  </div>
                  <div className='italic text-[0.9rem]'>
                    example : {items.example}
                  </div>
                  { error ? <span className='text-red-500'>oops something went wrong, please refresh</span> : <div className='bg-gray-400 text-white mt-[10px] p-3 leading-[1.5rem] rounded-[15px] min-h-[180px]'>
                    {items.definition}
                  </div>}
                </div>
              </div>
            ))
          }
        </div>
    </div>
  );
};

export default Result;