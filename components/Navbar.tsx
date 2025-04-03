'use client'
// import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
// import { Button } from "@/components/ui/button"





export default function Navbar() {
    const { data: session, status } = useSession()
    console.log(session)

    const navLinks = <>
        <li><a>Following</a></li>
        <li><a>Groups</a></li>
    </>
    return (
        <div className="navbar bg-black text-white shadow-sm">
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
                {/* <li><a>Item 1</a></li>
                    <li>
                        <details>
                            <summary>Parent</summary>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                                </ul>
                                </details>
                                </li>
                                <li><a>Item 3</a></li> */}

                <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto text-black" />
            </div>
            <div className="navbar-end">
                {status === "authenticated" ? <>
                    <div className="flex gap-1.5">
                        <button
                            onClick={() => signOut()}
                            className="btn btn-sm md:btn-md bg-red-400">Log out</button>
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
        </div>
    )
}
