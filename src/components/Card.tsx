import { useState } from 'react';

const Card = ({ src, title }: { src: string, title: string }) => {
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikes(isLiked ? likes - 1 : likes + 1);
    };

    return (
        <div className="card bg-white shadow-md rounded-lg overflow-hidden">
            <img className="w-full h-48 object-cover" src={src} alt="placeholder" />
            <div className="p-4">
                <h2 className="text-xl font-bold mb-2 text-black">{title}</h2>
                <p className="text-gray-700">Card Description</p>
                <div className="flex items-center justify-between mt-4">
                    <button
                        onClick={handleLike}
                        className="focus:outline-none hover:cursor-pointer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill={isLiked ? 'currentColor' : 'none'}
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            className={'text-red-500'}
                        >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </button>
                    <span className="text-gray-700">{likes} Likes</span>
                </div>
            </div>
        </div>
    );
};

export default Card;