"use client"

import { useContext } from "react"
import { AppContext } from "../../app/context/AppContext"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { logOut } from "src/services"
import Button from "../Button/Button"
import { APP_COLORS } from "src/constants"
import { goToUrl } from "src/helpers"

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
            <div className="footer__col">
                <img
                    src='/assets/images/logo.png'
                    className="footer__logo"
                    onClick={() => router.push('/')}
                    draggable={false} />
            </div>
            <div className="footer__col">
                <p className="footer__col-title">Quick Links</p>
                <nav className="footer__nav">
                    <a href={`${weblink}/blog`} className="footer__link">Blog</a>
                    <a href={`${weblink}/policy`} className="footer__link">Policy</a>
                    {isLoggedIn ? <p className="footer__link" onClick={logout}>Logout</p>
                        : <a href={`${weblink}/login`} className="footer__link">Login</a>}
                </nav>
            </div>
            <div className="footer__col">
                <p className="footer__col-title">Quick Links</p>
                <nav className="footer__nav">
                    <a href={`${weblink}/food-styling`} className="footer__link">Food + Prop Styling</a>
                    <a href={`${weblink}/recipe-development`} className="footer__link">Recipe Development</a>
                    <a href={`${weblink}/consulting`} className="footer__link">Restaurant Consulting</a>
                </nav>
            </div>
            <div className="footer__col">
                <div className="footer__row">
                    <img src="/assets/icons/instagram.svg" alt="Instagram Profile" className="footer__img" onClick={() => goToUrl('https://instagram.com/culinaire.studio')} />
                    <img src="/assets/icons/facebook.svg" alt="Facebook Profile" className="footer__img" onClick={() => goToUrl('https://facebook.com/culinaire.studio')}/>
                </div>
                <Button
                    label='CONTACT US'
                    handleClick={() => router.push('/contact')}
                    bgColor={APP_COLORS.TK_ORANGE}
                    textColor='#fff'
                    style={{
                        width: 'fit-content',
                        margin: '.5rem auto 0 auto'
                    }}
                />
            </div>
        </div>
    )
}