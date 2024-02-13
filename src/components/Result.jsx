import { useState,useEffect } from 'react'
import { FcSearch } from "react-icons/fc";
import axios from 'axios'

const Result = () => {
    const [ search, setSearch ] = useState("")
    const [ error, setError ] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://urban-dictionary7.p.rapidapi.com/v0/define',{
                    params: {term: 'yeet'},
                    headers: {
                        'X-RapidAPI-Key': '0f6be86a06mshc96bafaac64025fp1fe08cjsn42fd3ef9c55d',
                        'X-RapidAPI-Host': 'urban-dictionary7.p.rapidapi.com'
                    }
                })
                setSearch(res.data.list[0].definition)
                console.log(search)
            } catch (error) {
                setError(error)
            }
        }
        fetchData()
    },[])

  return (
    <div className="mt-[30px] w-full flex flex-col items-center">
        <div className="relative">
            <input 
                type="text"
                placeholder="enter a word.."
                className="py-3 px-6 w-full min-w-[300px] text-[0.8rem] outline-none rounded-[90px]"
                onChange={(e)=> setSearch(e.target.value)}
            />
            <div className="absolute right-[10px] top-[10px]">
                <FcSearch className="text-[1.3rem]"/>
            </div>
        </div>
    </div>
  )
}

export default Result