// import { authOptions } from "@/lib/authOptions"
import dbConnect, { collectionNameObj } from "@/lib/dbConnect"
// import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

// Getting all blogCollection data
export const GET = async () => {
    // const session = await getServerSession(authOptions)
    // if (session) {
    // const email = session?.user?.email // Uncomment this line if you need the email for filtering
    const blogCollection = await dbConnect(collectionNameObj.blogCollection)
    const result = await blogCollection.find({}).toArray()
    return NextResponse.json(result)
    // }

    // return NextResponse.json({})
}

// Posting to blogCollection
export const POST = async (req) => {
    const body = await req.json()
    const blogCollection = await dbConnect(collectionNameObj.blogCollection)
    const result = await blogCollection.insertOne(body)
    return NextResponse.json(result)
}
