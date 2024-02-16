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
    <div className="w-full h-[100%] flex flex-col gap-5 relative pl-5 sm:pl-0 border-l border-black ">
        <div className="w-full flex justify-end z-[15]">
            <button className="text-[1.5rem] text-white">
                <MdClose onClick={() => setIsBookmarkOpen(false)} />
            </button>
        </div>
        <div className="z-[15]">
            <h2 className="uppercase font-bold text-purple-400 text-[1.5rem] pb-5">Bookmarks</h2>
            <h3 className="pb-3 text-[0.85rem] capitalize text-gray-500">
                You have {bookmark.length} item in your bookmarks 😄
            </h3>
            <ul className="w-full">
            {bookmark.map((word) => (
                <li key={word}>
                    <div className="w-full flex justify-between items-center my-5">
                        <span className="uppercase text-white">{word}{' '}</span>
                        <button onClick={() => handleRemoveWord(word)}><MdOutlineBookmarkRemove className="text-gray-600 hover:text-white"/></button>
                    </div>
                </li>
            ))}
            </ul>
        </div>
        <div className="flex justify-end my-5">
            <button 
                className="text-red-500 text-[0.9rem] uppercase"
                onClick={() => handleResetBookmark()}
            >
                {bookmark.length === 0 ? "" : 'Reset'}
            </button>
        </div>
    </div>
  );
};

export default Bookmark;