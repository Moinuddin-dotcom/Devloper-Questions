"use client";

import { MessageSquare, MoreVertical, Bookmark, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { PiArrowFatDownLight, PiArrowFatUpBold } from "react-icons/pi";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

interface QuestionBoxFooterProps {
    // likes: number;
    // setLikes: (likes: number) => void;
    comments: number;

    cardData: { _id: string; content: string; tags: string[]; name: string; postedAt: string; likes: number }[];
}

export default function QuestionBoxFooter({ comments, cardData }: QuestionBoxFooterProps) {
    const session = useSession()
    // const [likes, setLikes] = useState(cardData[0]?.likes || 0); // Load initial likes from API
    // const [isUpdating, setIsUpdating] = useState(false);
    const likes = {
        user: session?.data?.user?.email,
        questionId: cardData._id
    }
    // useEffect(() => {

    const updateLike = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/api/single-qus/${cardData[0]._id}`, { likes })
            console.log(response.data)
        } catch (error) {
            console.error("Error updating likes:", error)
        }
    }
    //     updateLike()
    // }, [])
    // const handleUpvote = async () => {
    //     if (isUpdating) return; // Prevent spam clicking
    //     setIsUpdating(true);

    //     try {
    //         const response = await axios.patch(`http://localhost:3000/api/single-qus/${cardData[0]._id}`, {
    //             user: session?.data?.user?.email,
    //         });

    //         if (response.status === 200) {
    //             setLikes(response.data.likes); // Update UI with new count from backend
    //         }
    //     } catch (error) {
    //         console.error("Error updating likes:", error);
    //     } finally {
    //         setIsUpdating(false);
    //     }
    // }
    return (
        <>
            <div className="flex items-center space-x-4">
                {/* Upvote Button */}
                <Button
                    className="flex items-center space-x-1 bg-white hover:bg-white text-gray-900 border hover:text-blue-500"
                    onClick={updateLike}
                // disabled={isUpdating}
                >
                    <PiArrowFatUpBold />
                    {/* <span>{likes >= 1000 ? (likes / 1000).toFixed(1) + "K" : likes}</span> */}
                </Button>

                {/* Downvote Button */}
                <Button
                    className="text-gray-300 hover:text-red-500">
                    <PiArrowFatDownLight />
                </Button>

                {/* Comments */}
                <div className="flex items-center space-x-1 text-gray-900">
                    <MessageSquare className="w-5 h-5" />
                    <span>{comments}</span>
                </div>
            </div>

            <div>
                {/* Three-dot Dropdown Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="bg-white border text-gray-900 hover:text-gray-100">
                            <MoreVertical className="w-5 h-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white text-black p-2 rounded-lg shadow-md">
                        <DropdownMenuItem className="flex items-center space-x-2 hover:bg-gray-100 p-2 cursor-pointer">
                            <Bookmark className="w-4 h-4" />
                            <span>Bookmark</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center space-x-2 hover:bg-gray-100 p-2 cursor-pointer text-red-500">
                            <Flag className="w-4 h-4" />
                            <span>Report</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    )
}
