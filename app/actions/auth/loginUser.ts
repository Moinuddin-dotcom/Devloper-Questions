"use server"

import dbConnect, { collectionNameObj } from "@/lib/dbConnect"
import bcrypt from "bcryptjs";

interface LoginData {
    email: string;
    password: string;
}

export const loginUser = async (data: LoginData) => {
    const { email, password } = data
    const userCollection = dbConnect(collectionNameObj.userCollection)
    const user = await userCollection.findOne({ email })
    if (!user) return null
    const isPassOk = await bcrypt.compare(password, user.password)
    if (!isPassOk) return null;
    return user;
}