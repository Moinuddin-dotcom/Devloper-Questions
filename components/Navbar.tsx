'use client'
// import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
// import { Button } from "@/components/ui/button"
import profilePic from "../public/assets/profile-pic.png"





export default function Navbar() {
    const { data: session, status } = useSession()
    console.log(session)

    const navLinks = <>
        <li><Link href={'/qus-ans'}>Questions</Link></li>
    </>
    return (
        <div className="navbar bg-black text-white shadow-sm ">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-white text-black rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navLinks}
                    </ul>
                </div>
                <Link href={'/'} className="btn btn-ghost text-xl hidden lg:flex">DevQuestions</Link>
                <ul className="menu menu-horizontal px-1 hidden lg:flex">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-center hidden md:flex">
                <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto text-black" />
            </div>
            <div className="navbar-end">
                {status === "authenticated" ? <>
                    <div className="flex gap-1.5">


                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <Image src={session?.user?.image || profilePic} width={20} height={20} alt="Profile image" />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-white text-black rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <li>
                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li><a>Settings</a></li>
                                <li>
                                    <button
                                        onClick={() => signOut()}
                                        className="btn btn-sm md:btn-md bg-red-400">
                                        Log out
                                    </button>
                                </li>
                            </ul>
                        </div>
                        {/* </div> */}




                        <button className="btn btn-sm md:btn-md hover:bg-red-400"><span className="hidden md:flex">Add Questions</span> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg></button>
                    </div>
                </> : <>
                    <div className="flex gap-1.5">
                        <Link href={'/login'}>
                            {/* <InteractiveHoverButton>Log In</InteractiveHoverButton> */}
                            <button
                                className="btn btn-sm md:btn-md bg-red-400">Log In</button>
                        </Link>
                        <Link href={'/register'}>
                            {/* <InteractiveHoverButton>Register</InteractiveHoverButton> */}
                            <button
                                className="btn btn-sm md:btn-md bg-red-400">Register</button>
                        </Link>
                    </div>
                </>}
            </div>
        </div >
    )
}
