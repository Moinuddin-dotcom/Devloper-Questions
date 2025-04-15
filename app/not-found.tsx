
import Link from 'next/link'




export default function NotFoundPage404() {
    return (
        <div className='max-w-[35vw] mx-auto'>
            <h1 className='text-center'>This is a Error Page</h1>
            <div className='text-center'>
                <Link href={'/'} className='btn'>Go Back To <span className='font-semibold text-blue-400 text-lg underline underline-offset-4'>Home Page</span></Link>
            </div>
        </div>
    )
}


