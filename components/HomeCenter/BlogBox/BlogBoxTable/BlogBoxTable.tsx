"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image';
import profilePic from '../../../../public/assets/profile-pic.png'
import BlogBoxFooter from '../BlogBoxFooter/BlogBoxFooter';

// interface BlogTableProps {
//     cardData: { _id: string; content: string; tags: string[]; name: string; postedAt: string; image?: string }[];
// }
export default function BlogBoxTable() {
    interface CardData {
        _id: string;
        image: string;
        name: string;
        postedAt: string;
        content: string;
        tags: string[];
        comments: { text: string; user: string }[];
    }

    const [cardData, setCardData] = useState<CardData[]>([]);
    console.log(cardData);

    useEffect(() => {
        const fetchPostedData = async () => {
            try {
                const { data: postedData } = await axios.get("http://localhost:3000/api/blog");

                if (Array.isArray(postedData)) {
                    setCardData(postedData);
                } else {
                    console.error("API did not return an array:", postedData);
                    setCardData([]);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
                setCardData([]);
            }
        };

        fetchPostedData();
    }, []);
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
                        {/* Display Rich Text Content */}
                        <div className="text-gray-700 mt-2 text-sm" dangerouslySetInnerHTML={{ __html: cardRes?.content }} />
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
                        <BlogBoxFooter
                            card={cardRes} />
                    </div>
                </div>
            )}
        </>
    )
}
