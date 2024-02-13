import logo from '../assets/favicon.png'

const Hero = () => {

  return (
    <div className='w-full flex justify-center items-center flex-col'>
        <nav className='flex justify-between items-center w-full mb-10 pt-3'>
            <img 
                src={logo} alt='summary_logo'
                className='w-[50px] object-contain'
            />

            <button 
                type='button' 
                onClick={()=> window.open('https://github.com/vader2k?tab=overview')}
                className='bg-black text-white py-1 px-5 rounded-[50px] border-none'>
                Github
            </button>
        </nav>

        <h1 className='font-extrabold text-[3rem]'>
            URBAN DICTIONARY
        </h1>     
        <p className='text-[0.85rem] py-3'>Urban Dictionary is an online crowdsourced dictionary that focuses on slang, colloquialisms, and informal language. It provides definitions for words and phrases that may not be found in traditional dictionaries, often reflecting contemporary language use, internet culture, and subcultures.</p>   
    </div>
  )
}

export default Hero