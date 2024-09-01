import { NavLink, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { backendApi } from "../constant/backeApi"
import axios from "axios"

const Navbar = () => {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"))
    const navLinks = [
        {
            name: "Home",
            link: '/'
        },
    ]

    const axiosConfig = {
        withCredentials: true
    }
    const logoutHandler = async (e) => {
        e.preventDefault()
        try {

            const { data } = await axios.get(`${backendApi}/api/v1/user/logout`,
                axiosConfig
            )
            if (data.success) {
                localStorage.clear()
                navigate('/')
                toast.success(data?.message)
            }

        } catch (error) {
            toast.error(error?.response?.data?.message)

        }


    }

    return (
        <section className="z-20 fixed w-full bg-gray-800 text-white">
            <div className="h-16 lg:px-10 px-5 flex justify-between items-center">
                <div>
                    <NavLink className='text-3xl font-bold text-orange-600' to='/'>LearnCode</NavLink>
                </div>
                <div>
                    <ul className="flex gap-5 justify-between items-center">
                        {navLinks?.map((data, index) =>
                            <li key={index}>
                                <NavLink to={data?.link}> {data?.name}</NavLink>
                            </li>
                        )}
                        {user ? <button type="submit" className="bg-black hover:bg-gray-600 text-white py-2 px-4 rounded-md" onClick={logoutHandler}>Logout</button>
                            :
                            <>
                                <li >
                                    <NavLink to='/login'>Login</NavLink>
                                </li>
                                <li >
                                    <NavLink to='/register'>Register</NavLink>
                                </li>
                            </>
                        }

                    </ul>
                </div>
            </div>
        </section >
    )
}

export default Navbar