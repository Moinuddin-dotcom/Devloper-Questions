import dbConnect, { collectionNameObj } from "@/lib/dbConnect"
import { NextResponse } from "next/server"


export const POST = async (req) => {

    const body = await req.json()
    const postCollection = dbConnect(collectionNameObj.postCollection)
    const result = await postCollection.insertOne(body)
    return NextResponse.json(result)
}