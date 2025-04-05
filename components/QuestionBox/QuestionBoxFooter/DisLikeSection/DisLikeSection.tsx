"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { PiArrowFatDownFill, PiArrowFatDownLight } from "react-icons/pi";


interface QuestionBoxFooterProps {
    cardData: { _id: string; content: string; tags: string[]; name: string; postedAt: string; dislikes: string[] }[];
}
export default function DisLikeSection({ cardData }: QuestionBoxFooterProps) {
    const session = useSession()
    const postId = cardData[0]._id
    const [dislikeCount, setDislikeCount] = useState(cardData[0]?.dislikes?.length || 0);
    const [hasDisliked, setHasDisliked] = useState(false);


    // fetching questionLike data
    const fetchQusData = async () => {
        try {
            const { data } = await axios(`http://localhost:3000/api/single-qus/${postId}`);
            setDislikeCount(data?.dislikes?.length || 0);
            setHasDisliked(data?.dislikes?.includes(session?.data?.user?.email));
        } catch (error) {
            console.error("Error fetching questionLike data:", error);
        }
    }
    // Like/Dislike Functionality
    const updateDislike = async () => {
        try {
            const userEmail = session?.data?.user?.email;
            if (!userEmail) return;

            const response = await axios.patch(`http://localhost:3000/api/single-qus/${postId}/downvote`, {
                user: userEmail,
            });

            console.log("Like updated:", response.data);
            // Refresh the dislikes count in UI 
            await fetchQusData()
        } catch (error) {
            console.error("Error updating like:", error);
        }
    };

    useEffect(() => {
        setHasDisliked(cardData[0]?.dislikes?.includes(session?.data?.user?.email || "") || false);
    }, [cardData, session]);
    return (
        <>
            <Button
                onClick={updateDislike}
                className={`flex items-center space-x-1 border
                    ${hasDisliked ? "bg-red-500" : "bg-white hover:bg-white"}
                    ${hasDisliked ? "text-white" : "text-gray-900 hover:text-red-500"}`}
            >
                {hasDisliked ? <PiArrowFatDownFill className="text-white" /> : <PiArrowFatDownLight />}
                <span><span className="font-semibold">Downvote</span> <span>({dislikeCount})</span></span>
            </Button>
        </>
    )
}
