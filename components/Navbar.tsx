'use client'
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import Link from "next/link";





export default function Navbar() {

    const navLinks = <>
        <li><a>Following</a></li>
        <li><a>Groups</a></li>
    </>
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navLinks}
                    </ul>
                </div>
                <Link href={'/'} className="btn btn-ghost text-xl hidden lg:flex">DevQuestions</Link>
                <ul className="menu menu-horizontal px-1">
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

                <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
            </div>
            <div className="navbar-end">

                <InteractiveHoverButton
                    onClick={() => console.log("Button Clicked!")}>Register</InteractiveHoverButton>
                <InteractiveHoverButton
                    onClick={() => console.log("Button Clicked!")}>Add Questions</InteractiveHoverButton>
            </div>
        </div>
    )
}
