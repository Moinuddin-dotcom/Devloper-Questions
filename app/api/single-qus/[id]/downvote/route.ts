import dbConnect, { collectionNameObj } from "@/lib/dbConnect"
import { ObjectId } from "mongodb"
import { NextResponse } from "next/server"

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    const p = await params
    const questionCollection = dbConnect(collectionNameObj.questionCollection)
    const query = { _id: new ObjectId(p.id) }
    const singleQus = await questionCollection.findOne(query)
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
    const alreadyDisLiked = post.dislikes?.includes(userEmail)

    let updateDisLikes;
    if (alreadyDisLiked) {
        updateDisLikes = post.dislikes.filter((email: string) => email !== userEmail)
    } else {
        updateDisLikes = [...(post.dislikes || []), userEmail]

    }
    const updateRes = await (await questionCollection).updateOne(
        { _id: postId },
        { $set: { dislikes: updateDisLikes } }
    )
    return NextResponse.json({
        message: alreadyDisLiked ? "dislikes removed" : "dislikes added",
        totalLikes: updateDisLikes.length,
        updateRes
    });
}