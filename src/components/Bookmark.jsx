import { MdOutlineBookmarkRemove, MdClose } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { removeWord, resetBookmark } from '../Redux/bookmarkReducer';

const Bookmark = ({ setIsBookmarkOpen }) => {
  const dispatch = useDispatch();
  const bookmark = useSelector((state) => state.bookmark.saved);

  const handleRemoveWord = (word) => {
    dispatch(removeWord(word));
  };

  const handleResetBookmark = () => {
    dispatch(resetBookmark());
  };

  return (
    <div className="w-full h-[100%] flex flex-col gap-5 relative">
        <div className="absolute w-[500vw] bg-black opacity-[0.3] h-[100%] right-[220px] top-[-20px] z-[10]"></div>
        <div className="w-full flex justify-end z-[15]">
            <button className="text-[1.5rem]">
                <MdClose onClick={() => setIsBookmarkOpen(false)} />
            </button>
        </div>
        <div className="z-[15]">
            <h2 className="uppercase font-bold text-gray-500 text-[1.5rem] pb-5">Bookmarks</h2>
            <ul className="w-full">
            {bookmark.map((word) => (
                <li key={word}>
                    <div className="w-full flex justify-between items-center my-5">
                        <span className="uppercase">{word}{' '}</span>
                        <button onClick={() => handleRemoveWord(word)}><MdOutlineBookmarkRemove className="text-gray-600 hover:text-white"/></button>
                    </div>
                </li>
            ))}
            </ul>
        </div>
        <div className="flex justify-end my-5">
            <button 
                className="text-red-300 text-[0.9rem] uppercase"
                onClick={() => handleResetBookmark()}
            >
                Reset
            </button>
        </div>
    </div>
  );
};

export default Bookmark;