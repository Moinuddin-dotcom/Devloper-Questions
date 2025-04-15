// 'use client'
// // import Lottie from 'lottie-react'
// import Link from 'next/link'
// import errorLotti from '@/public/assets/Error-Animation.json'
// import dynamic from 'next/dynamic'


// // Dynamically import Lottie with SSR disabled
// const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

// export default function NotFoundPage404() {
//     return (
//         <div className='max-w-[35vw] mx-auto'>
//             <Lottie animationData={errorLotti}></Lottie>
//             <div className='text-center'>
//                 <Link href={'/'} className='btn'>Go Back To <span className='font-semibold text-blue-400 text-lg underline underline-offset-4'>Home Page</span></Link>
//             </div>
//         </div>
//     )
// }


import dynamic from 'next/dynamic'

const NotFoundClient = dynamic(() => import('@/components/NotFoundClient'), {
    ssr: false,
    loading: () => <p>Loading...</p>
})

export default function NotFoundPage() {
    return <NotFoundClient />
}
