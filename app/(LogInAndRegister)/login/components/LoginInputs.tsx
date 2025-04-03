
"use client"
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function LoginInputs() {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<LoginFormData>();

    interface LoginFormData {
        // name: string;
        email: string;
        password: string;
    }

    const onSubmit = async (data: LoginFormData) => {
        console.log(data)
        try {
            const res = await signIn("credentials", { email: data.email, password: data.password, redirect: false })
            if (res && res.ok) {
                router.push('/')
                reset()
                toast.success('Login success')
            } else {
                toast.error('Authentication failed')
            }
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };
    return (
        <div className="flex items-center justify-center ">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="text-white p-6 rounded-lg shadow-lg w-96"
            >
                <h2 className="text-xl text-center font-bold mb-4">Log in</h2>


                <label className="block mb-2">Email:</label>
                <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                <label className="block mb-2">Password:</label>
                <input
                    type="password"
                    {...register("password", { required: "Password is required" })}
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Enter your password"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                <button
                    type="submit"
                    className="cursor-pointer text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full "
                >
                    {/* w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 */}
                    Log In
                </button>
            </form>
        </div>
    )
}
