import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FcSearch } from 'react-icons/fc';
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { addWord } from '../Redux/bookmarkReducer'
import axios from 'axios';
import copy from '../assets/copy.svg'
import tick from '../assets/tick.svg'


const Result = () => {
  const [search, setSearch] = useState(''); // setting the initla state of the input form
  const [apiData, setApiData] = useState([]); // an array that stores all data from the api
  const [error, setError] = useState(null); // checks for erros and displays it
  const [buttonClicked, setButtonClicked] = useState(false); // an optional button for the search input to make the fetchData call when clicked
  const [history, setHistory] = useState([]) //an array that stores search history
  const [copied, setCopied] = useState('')

  const dispatch = useDispatch()
    // Asynchronous function to handle adding word to bookmark
    const handleAddWord = async () => {
      // Wait for the API call to complete
      await fetchData();
      // Dispatch the addWord action
      dispatch(addWord(word));
      console.log(word)
    };
  
  

  const fetchData = async () => {
    try {
      const res = await axios.get('https://urban-dictionary7.p.rapidapi.com/v0/define', {
        params: { term: `${search}` },
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY, // api key from rapid api stored in .env file
          'X-RapidAPI-Host': 'urban-dictionary7.p.rapidapi.com',
        },
      });
        setApiData(res.data.list);
        //update search history
        const updatedHistory = [...history, search]
        setHistory(updatedHistory)
        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory))
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

  useEffect(()=> {
    //load search history from localstorage on component mount
    const storedHistory = localStorage.getItem('searchHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory))
    }
  },[])
  // Accessing individual pieces of data
  const word = apiData[0]?.word || '';

  const handleSubmit = (e) => {
    e.preventDefault()
    setButtonClicked(true)
  }

  //now to set a copy function that copies a history link when clicked
  const handleCopy = (text) => {
    setCopied(text)
    navigator.clipboard.writeText(text)
    setTimeout(()=> setCopied(false),3000)
  }

  return (
    <div className="mt-[30px] w-full flex flex-col items-center relative">
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

        {/* Search history display */}
        {
          history &&( <div className="my-5">
          <h3 className="font-semibold mb-2 italic text-[0.85rem]"> History:</h3>
          <ul className='overflow-y-auto max-h-[100px] scrollable'>
            {history.map((item, index) => (
              <div
                key={index}
                onClick={()=> setSearch(item)}
              >
                <div className='flex justify-between p-2 cursor-pointer my-2 border border-white rounded-xl'>
                  <img 
                    src={ copied === item ? tick : copy }
                    alt="copy_icon" 
                    className='w-[15px] h-[15px] object-contain'
                    onClick={()=> handleCopy(item)}
                  />
                  <p className='text-[0.9rem] text-gray-600 capitalize'>
                    {item}
                  </p>
                </div>
              </div>
            ))}
          </ul>
          </div>)
        }

        </div>

        { word && <div className='flex items-center gap-3'>
          <div>
            <MdOutlineBookmarkAdd 
              className='text-[1.5rem] mt-[30px] text-gray-500'
              onClick={()=> handleAddWord(word)}
            />
          </div>
          <span className='text-[1.5rem] uppercase font-semibold text-gray-600 mt-[30px]'>{word}</span>
        </div>}
        
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