import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { toast } from "react-toastify"
import axios from "axios";
import { backendApi } from "../constant/backeApi";
import { useNavigate } from "react-router-dom";


const Register = () => {
    const user = JSON.parse(localStorage.getItem("user"))

    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    })
    const onchangeHandler = (e) => {
        e.preventDefault()
        let name = e.target.name
        let value = e.target.value
        setUserData({ ...userData, [name]: value })
    }

    const axiosConfig = {
        withCredentials: true
    }
    const registerHandler = async (e) => {
        e.preventDefault()
        try {

            const { data } = await axios.post(`${backendApi}/api/v1/user/register`,
                userData,
                axiosConfig
            )
            if (data.success) {
                toast.success(data?.message)
                localStorage.setItem("user", JSON.stringify(data?.user))
                navigate('/')
            }

        } catch (error) {
            toast.error(error?.response?.data?.message)

        }


    }

    useEffect(() => {
        if (user) {
            navigate("/")
        }

    }, [user, navigate])
    return (
        <Layout>
            <section className="py-16">
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Create your new account
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form action="#" method="POST" className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        onChange={onchangeHandler}
                                        value={userData.email}
                                        required
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                    <div className="text-sm">
                                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        onChange={onchangeHandler}
                                        value={userData.password}
                                        required
                                        autoComplete="current-password"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    onClick={registerHandler}
                                    className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Register
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            have a account?{' '}
                            <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                login
                            </a>
                        </p>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Register


