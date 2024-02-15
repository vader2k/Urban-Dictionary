import Hero from "./components/Hero"
import Result from "./components/Result"
import { FaBookBookmark } from "react-icons/fa6";
import Bookmark from "./components/Bookmark";
import { useState } from "react";

const App = () => {
  const [ isbookmarkopen , setIsBookmarkOpen ] = useState(false)
  return (
    <div className="bg-slate-300 min-h-[100vh]">
      <div className="max-w-[1440px] m-auto p-3 relative">
        <Hero />
        <div className="my-5 items-center w-full ">
          <FaBookBookmark 
            className="w-full text-center text-[1.5rem] text-purple-400"
            onClick={()=> setIsBookmarkOpen(true)}
          />
        </div>
        <Result />
        {
          isbookmarkopen && (
            <div className="absolute top-0 right-0 h-[100%] p-3 bg-slate-400 w-[60%]">
              <Bookmark setIsBookmarkOpen={setIsBookmarkOpen}/>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default App