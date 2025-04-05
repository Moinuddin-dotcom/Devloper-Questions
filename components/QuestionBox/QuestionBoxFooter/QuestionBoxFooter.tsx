

import { MessageSquare, MoreVertical, Bookmark, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import LikeSection from "./LikeSection/LikeSection";
import DisLikeSection from "./DisLikeSection/DisLikeSection";

interface QuestionBoxFooterProps {
    comments: number;

    cardData: { _id: string; content: string; tags: string[]; name: string; postedAt: string; likes: string[]; dislikes: string[] }[];
}

export default function QuestionBoxFooter({ comments, cardData }: QuestionBoxFooterProps) {

    return (
        <>
            <div className="flex items-center space-x-4">
                {/* Upvote Button */}
                <LikeSection cardData={cardData} />

                {/* Downvote Button */}
                <DisLikeSection cardData={cardData} />

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
