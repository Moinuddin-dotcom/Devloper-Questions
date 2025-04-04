"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image';
import profilePic from '../../../public/assets/profile-pic.png'
export default function DisplayPostCard() {
    interface CardData {
        _id: string;
        image: string;
        name: string;
        postedAt: string;
        content: string;
        likes: number;
        comments: { text: string; user: string }[]; // Add comments property
    }

    const [cardData, setCardData] = useState<CardData[]>([])
    console.log(cardData)
    useEffect(() => {
        const fetchPostedData = async () => {
            try {
                const { data: postedData } = await axios("http://localhost:3000/api/blog");

                // Ensure it's an array before setting state
                if (Array.isArray(postedData)) {
                    setCardData(postedData);
                } else {
                    console.error("API did not return an array:", postedData);
                    setCardData([]); // Set to an empty array to avoid errors
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
                setCardData([]); // Set an empty array on failure
            }
        };
        fetchPostedData();
    }, [])
    return (
        <>
            {cardData?.map(cardRes =>
                <div key={cardRes?._id} className="bg-white rounded-lg shadow-md p-4 mt-4 w-full">
                    {/* User Info */}
                    <div className="flex items-center space-x-3">
                        <Image
                            src={cardRes?.image || profilePic}
                            alt='Profile Photo'
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        <div>
                            <p className="font-semibold text-gray-800">{cardRes?.name}</p>
                            <p className="text-sm text-gray-500">{cardRes?.postedAt}</p>
                        </div>
                    </div>

                    {/* Post Content */}
                    <p className="mt-3 text-gray-700">
                        {cardRes?.content}
                    </p>

                    {/* Post Images */}
                    <div className="grid grid-cols-2 gap-2 mt-3">
                        {/* <img
                            src="https://source.unsplash.com/300x200/?mountain"
                            alt="Trip"
                            className="rounded-lg"
                        />
                        <img
                            src="https://source.unsplash.com/300x200/?travel"
                            alt="Trip"
                            className="rounded-lg"
                        /> */}
                    </div>

                    {/* Reaction Buttons */}
                    <div className="flex justify-between mt-4 text-gray-500 text-sm">
                        <button className="flex items-center space-x-1">
                            👍 <span className="text-blue-500 font-semibold">Liked</span> <span>({cardRes?.likes})</span>
                        </button>
                        <button className="flex items-center space-x-1">
                            💬 <span>Comment</span> <span>{cardRes?.comments.length}</span>
                        </button>
                        <button className="flex items-center space-x-1">
                            🔄 <span>Share</span> <span>2</span>
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
