// import { PATCH } from './route';
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

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
    const p = await params
    const questionCollection = dbConnect(collectionNameObj.questionCollection)
    const postId = new ObjectId(p.id)
    const body = await req.json()
    const userEmail = body.user;
    if (!userEmail) {
        return NextResponse.json({ message: "No user email provided" }, { status: 400 })
    }

    const post = await (await questionCollection).findOne({ _id: postId })
    if (!post) {
        return NextResponse.json({ message: "Post not found" }, { status: 404 })
    }
    const alreadyLiked = post.likes?.includes(userEmail)

    let updateLikes;
    if (alreadyLiked) {
        updateLikes = post.likes.filter((email: string) => email !== userEmail)
    } else {
        updateLikes = [...(post.likes || []), userEmail]

    }
    const updateRes = await (await questionCollection).updateOne(
        { _id: postId },
        { $set: { likes: updateLikes } }
    )
    return NextResponse.json({
        message: alreadyLiked ? "Like removed" : "Like added",
        totalLikes: updateLikes.length,
        updateRes
    });
}
