import dbConnect, { collectionNameObj } from "@/lib/dbConnect"
import { ObjectId } from "mongodb"
import { NextResponse } from "next/server"


export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    const p = await params
    const questionCollection = dbConnect(collectionNameObj.questionCollection)
    const query = { _id: new ObjectId(p.id) }


    //validating is the owner of the booking or not
    // const session = await getServerSession(authOptions)
    // const email = session?.user?.email
    const singleQus = await questionCollection.findOne(query)
    // const isOwnerOk = email === singleBooking?.email
    // if (isOwnerOk) {
    //     return NextResponse.json(singleBooking)
    // } else {
    //     return NextResponse.json({ message: "Forbidden GET access" }, { status: 403 })
    // }
    return NextResponse.json(singleQus)
}

export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
    const p = await params
    const questionCollection = dbConnect(collectionNameObj.questionCollection)
    const query = { _id: new ObjectId(p.id) }
    const body = await req.json()
    const filter = {
        $set: { ...body }
    }
    const option = {
        upsert: true
    }
    const updateRes = await questionCollection.updateOne(query, filter, option)
    return NextResponse.json(updateRes)
}

// export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
//     try {
//         const id = await params;
//         const questionCollection = dbConnect(collectionNameObj.questionCollection);
//         const { user } = await req.json(); // Get user email from request

//         const question = await questionCollection.findOne({ _id: new ObjectId(id) });

//         if (!question) {
//             return NextResponse.json({ error: "Question not found" }, { status: 404 });
//         }

//         // Prevent duplicate upvotes from the same user
//         if (question.likedBy?.includes(user)) {
//             return NextResponse.json({ message: "Already upvoted", likes: question.likes });
//         }

//         // Increment likes and store the user who liked it
//         const updateRes = await questionCollection.updateOne(
//             { _id: new ObjectId(id) },
//             {
//                 $inc: { likes: 1 },
//                 $push: { likedBy: user } // Store user in likedBy array to prevent multiple votes
//             }
//         );

//         const updatedQuestion = await questionCollection.findOne(updateRes);

//         if (!updatedQuestion) {
//             return NextResponse.json({ error: "Failed to retrieve updated question" }, { status: 500 });
//         }
//         return NextResponse.json({ likes: updatedQuestion.likes });
//     } catch (error) {
//         console.error("Error updating likes:", error);
//         return NextResponse.json({ error: "Failed to update likes" }, { status: 500 });
//     }
// };