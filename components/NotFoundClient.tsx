'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import errorLotti from '@/public/assets/Error-Animation.json'

// dynamically import lottie-react with SSR disabled inside client component
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

export default function NotFoundClient() {
    return (
        <div className='max-w-[35vw] mx-auto'>
            <Lottie animationData={errorLotti} />
            <div className='text-center'>
                <Link href={'/'} className='btn'>
                    Go Back To <span className='font-semibold text-blue-400 text-lg underline underline-offset-4'>Home Page</span>
                </Link>
            </div>
        </div>
    )
}
