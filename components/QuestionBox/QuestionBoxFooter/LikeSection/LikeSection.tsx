"use client";

import { Button } from "@/components/ui/button";
import { PiArrowFatUpBold, PiArrowFatUpFill } from "react-icons/pi";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


interface QuestionBoxFooterProps {
    cardData: { _id: string; content: string; tags: string[]; name: string; postedAt: string; likes: string[] }[];
}
export default function LikeSection({ cardData }: QuestionBoxFooterProps) {
    const session = useSession()
    const postId = cardData[0]._id
    const [likeCount, setLikeCount] = useState(cardData[0]?.likes?.length || 0);
    const [hashLikeCount, setHashLikeCount] = useState(false);


    // fetching questionLike data
    const fetchQusData = async () => {
        try {
            const { data } = await axios(`http://localhost:3000/api/single-qus/${postId}`);
            setLikeCount(data?.likes?.length || 0);
            setHashLikeCount(data?.likes?.includes(session?.data?.user?.email));
        } catch (error) {
            console.error("Error fetching questionLike data:", error);
        }
    }
    // Like/Dislike Functionality
    const updateLike = async () => {
        try {
            const userEmail = session?.data?.user?.email;
            if (!userEmail) return;

            const response = await axios.patch(`http://localhost:3000/api/single-qus/${postId}`, {
                user: userEmail,
            });

            console.log("Like updated:", response.data);
            // Refresh the likes count in UI 
            await fetchQusData()
        } catch (error) {
            console.error("Error updating like:", error);
        }
    };

    useEffect(() => {
        setHashLikeCount(cardData[0]?.likes?.includes(session?.data?.user?.email || "") || false);
    }, [cardData, session]);
    return (
        <>
            <Button
                onClick={updateLike}
                className={`flex items-center space-x-1 border 
                        ${hashLikeCount ? "bg-blue-400" : "bg-white hover:bg-white"} 
                    ${hashLikeCount ? "text-white" : "text-gray-900 hover:text-blue-500"}`}>
                {hashLikeCount ? <PiArrowFatUpFill className="text-white" /> : <PiArrowFatUpBold />}
                <span><span className="font-semibold">Upvote</span> <span>({likeCount})</span> </span>
            </Button>
        </>
    )
}
