"use client"

import { useContext } from "react"
import { AppContext } from "../../app/context/AppContext"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { logOut } from "src/services"

type Props = {}

export default function Footer({ }: Props) {
    const weblink = process.env.NODE_ENV === 'production' ? 'https://ymg.vercel.app' : 'http://localhost:3000'
    const { isLoggedIn, setIsLoggedIn } = useContext(AppContext)
    const router = useRouter()

    const logout = async () => {
        await logOut()
        localStorage.removeItem('user')
        setIsLoggedIn(false)
        toast.success('See you later!')
        router.push('/')
    }

    return (
        <div className="footer__container">
            <nav className="footer__nav">
                <a href={`${weblink}/policy`} className="footer__link">Policy</a>
                <a href={`${weblink}/contact`} className="footer__link">Contact</a>
                {isLoggedIn ? <p className="footer__link" onClick={logout}>Logout</p>
                    : <a href={`${weblink}/login`} className="footer__link">Login</a>}
            </nav>
        </div>
    )
}