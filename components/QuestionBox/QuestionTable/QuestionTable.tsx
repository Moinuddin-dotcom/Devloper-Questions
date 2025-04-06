
import QuestionBoxFooter from "../QuestionBoxFooter/QuestionBoxFooter";

interface QuestionTableProps {
    // comments: number;
    cardData: { _id: string; content: string; tags: string[]; name: string; postedAt: string }[];
}

export default function QuestionTable({ cardData }: QuestionTableProps) {
    return (
        <div className="question_part p-4 ">
            {cardData?.map(item => (
                <div key={item._id} className="border border-gray-300 rounded-lg shadow-md p-4 mb-5 bg-white">
                    {/* Display Rich Text Content */}
                    <div className="text-gray-700 mt-2 text-sm" dangerouslySetInnerHTML={{ __html: item.content }} />

                    {/* Tags */}
                    <div className="flex flex-wrap mt-3 space-x-2">
                        {item.tags.map((tag, index) => (
                            <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-xs">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* User Info */}
                    <div className="flex items-center mt-3 text-xs text-gray-500">
                        <span className="text-red-500 font-medium">{item.name}</span> • <span>{new Date(item.postedAt).toLocaleString()}</span>
                    </div>
                    {/* Footer: Upvote(like), Downvote(dislike), Comment, Bookmark & Report */}
                    <div className="flex items-center justify-between w-full my-4">
                        <QuestionBoxFooter
                            card={item} />
                    </div>
                </div>
            ))}
        </div>
    )
}
