"use client"
import { registerUser } from '@/app/actions/auth/registerUser';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function RegisterInputs() {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>();

    interface RegisterFormData {
        name: string;
        email: string;
        password: string;
    }

    const onSubmit = async (data: RegisterFormData) => {
        console.log(data)
        try {
            const res = await registerUser(data);
            console.log("User Registered:", res);
            if (res && 'insertedId' in res && res.insertedId) {
                toast.success("User registered successfully", {
                    duration: 2000,
                    position: "top-right",
                });
                router.push('/login');

            } else if (res && 'status' in res && res.status === 400) {
                toast.error(res.message, {
                    duration: 2000,
                    position: "top-right",
                });

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
                <h2 className="text-xl text-center font-bold mb-4">Register</h2>

                <label className="block mb-2">Name:</label>
                <input
                    {...register("name", { required: "Name is required" })}
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Enter your name"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

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
                    Register
                </button>
            </form>
        </div>
    )
}
