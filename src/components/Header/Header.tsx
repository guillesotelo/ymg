import React, { useContext, useEffect, useState } from 'react'
import { useRouter, usePathname } from "next/navigation";
import { AppContext } from '../../app/context/AppContext'
import Hamburger from 'hamburger-react'
import Dropdown from '../Dropdown/Dropdown'
import { loginUser, logOut } from 'src/services';
import toast from 'react-hot-toast';
import Button from '../Button/Button';
import { APP_COLORS } from 'src/constants';

export default function Header() {
    const [page, setPage] = useState('/')
    const [menuOpen, setMenuOpen] = useState(false)
    const [scroll, setScroll] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
    const { isMobile, isLoggedIn, setIsLoggedIn, darkMode, setDarkMode, lang, setLang } = useContext(AppContext)
    const [logoName, setLogoName] = useState('Culinaire Studio')

    useEffect(() => {
        const headerScroll = () => {
            const html = document.querySelector('html')
            setScroll(html && html.scrollTop > 70 || false)
        }
        document.addEventListener('scroll', headerScroll)
        return () => document.removeEventListener('scroll', headerScroll)
    }, [])

    useEffect(() => {
        setPage(pathname)
    }, [pathname])

    useEffect(() => {
        const body = document.querySelector('body')
        const app = document.querySelector('.app__container') as HTMLDivElement
        if (body && app) {
            if (menuOpen) {
                body.style.overflow = 'hidden';
                app.style.overflow = 'hidden';
            }
            else {
                body.style.overflow = 'auto'
                app.style.overflow = 'auto';
            }
        }
    }, [menuOpen])

    const goTo = (page: string) => {
        setTimeout(() => setMenuOpen(false), 100)
        router.push(page)
    }

    const logout = async () => {
        await logOut()
        localStorage.removeItem('user')
        setIsLoggedIn(false)
        toast.success('See you later!')
        router.push('/')
        setTimeout(() => setMenuOpen(false), 100)
    }

    const renderMobile = () => {
        return <div className="header__container">
            <div className="header__controls" style={{ width: 'fit-content' }}>

            </div>
            <img
                src='/assets/images/logo.png'
                className="header__logo"
                onClick={() => {
                    router.push('/')
                    setMenuOpen(false)
                }}
            />
            <div className="header__menu">
                <Hamburger size={25} toggled={menuOpen} toggle={setMenuOpen} color='#dcdcdc' easing="ease-in" rounded label="Show menu" />
            </div>
            <div className={`header__menu-sidebar${menuOpen ? '--toggled' : ''}`}>
                <div className="header__menu-sidebar-container">
                    <div
                        className="header__menu-sidebar-item"
                        onClick={() => {
                            goTo('/services')
                            setMenuOpen(false)
                        }}
                        style={{ marginTop: '1rem' }}>
                        <img src='/assets/icons/edit.svg' draggable={false} alt="Editor" className="header__menu-sidebar-item-svg" />
                        <p className="header__menu-sidebar-item-text">Services</p>
                    </div>

                    <div className="header__menu-sidebar-separator"></div>
                    {isLoggedIn ?
                        <>
                            <div className="header__menu-sidebar-item" onClick={logout}>
                                <img src='/assets/icons/logout.svg' draggable={false} alt="Logout" className="header__menu-sidebar-item-svg" />
                                <p className="header__menu-sidebar-item-text">Logout</p>
                            </div>
                        </>
                        : <div className="header__menu-sidebar-item" onClick={() => goTo('/login')}>
                            <img src='/assets/icons/login.svg' draggable={false} alt="Login" className="header__menu-sidebar-item-svg" />
                            <p className="header__menu-sidebar-item-text">Login</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    }

    return isMobile ? renderMobile() :
        <div
            className="header__container"
            style={{
                color: scroll ? '#fff' : '#283F3B',
                background: scroll ? '#00000090' : '',
                height: scroll ? '10vh' : ''
            }}>
            <img
                src='/assets/images/logo.png'
                className="header__logo" onClick={() => router.push('/')}
                style={{
                    filter: scroll ? 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(125deg) brightness(100%) contrast(107%' : '',
                    height: scroll ? '6vh' : ''
                }}
            />
            <div className="header__main">
                <div className="header__nav">
                    <button
                        className={`header__button header-hover-underline${scroll ? '-scroll' : ''}`}
                        onClick={() => router.push('/')}
                        style={{
                            borderBottom: page === '/' ? scroll ? '2px solid #fff' : '2px solid #283F3B' : '2px solid transparent'
                        }}
                    >HOME</button>
                    <button
                        className={`header__button header-hover-underline${scroll ? '-scroll' : ''}`}
                        onClick={() => router.push('/about')}
                        style={{
                            borderBottom: page === '/about' ? scroll ? '2px solid #fff' : '2px solid #283F3B' : '2px solid transparent'
                        }}
                    >ABOUT</button>
                    <button
                        className={`header__button header-hover-underline${scroll ? '-scroll' : ''}`}
                        onClick={() => router.push('/recipes')}
                        style={{
                            borderBottom: page === '/recipes' ? scroll ? '2px solid #fff' : '2px solid #283F3B' : '2px solid transparent'
                        }}
                    >RECIPES</button>
                    <div className={`header__button-dropdown header-hover-underline${scroll ? '-scroll' : ''}`}>SERVICES
                        <div className={`header__button-dropdown-box${scroll ? '-scroll' : ''}`}>
                            <p className={`header__button-dropdown-item${scroll ? '-scroll' : ''}`} onClick={() => router.push(`/services/consultancy`)}>CONSULTANCY</p>
                            <p className={`header__button-dropdown-item${scroll ? '-scroll' : ''}`} onClick={() => router.push(`/services/events`)}>EVENTS</p>
                            <p className={`header__button-dropdown-item${scroll ? '-scroll' : ''}`} onClick={() => router.push(`/services/gastronomy`)}>GASTRONOMY</p>
                        </div>
                    </div>
                    <button
                        className={`header__button header-hover-underline${scroll ? '-scroll' : ''}`}
                        onClick={() => router.push('/blog')}
                        style={{
                            borderBottom: page === '/blog' ? scroll ? '2px solid #fff' : '2px solid #283F3B' : '2px solid transparent'
                        }}
                    >BLOG</button>
                    <button
                        className={`header__button header-hover-underline${scroll ? '-scroll' : ''}`}
                        onClick={() => router.push('/contact')}
                        style={{
                            borderBottom: page === '/contact' ? scroll ? '2px solid #fff' : '2px solid #283F3B' : '2px solid transparent'
                        }}
                    >CONTACT</button>
                    {isLoggedIn ?
                        <div
                            className="header__button-dropdown header-hover-underline"
                        >Administrator
                            <div className='header__button-dropdown-box'>
                                <button
                                    className={`header__button header-hover-underline${scroll ? '-scroll' : ''}`}
                                    onClick={() => router.push('/editor')}
                                    style={{
                                        borderBottom: page === '/editor' ? scroll ? '2px solid #fff' : '2px solid #283F3B' : '2px solid transparent'
                                    }}
                                >Editor</button>
                            </div>
                        </div>
                        : ''}
                </div>
                <div className="header__controls">
                    {/* <Dropdown
                    label=''
                    options={['🇺🇸 EN', '🇪🇸 ES']}
                    selected={lang === 'en' ? '🇺🇸 EN' : '🇪🇸 ES'}
                    setSelected={val => setLang(val === '🇺🇸 EN' ? 'en' : 'es')}
                    value={lang === 'en' ? '🇺🇸 EN' : '🇪🇸 ES'}
                    bgColor='transparent'
                    color={scroll ? 'white' : '#fff'}
                /> */}
                    <Button
                        label="WORK WITH US"
                        handleClick={() => router.push('/')}
                        bgColor={APP_COLORS.TK_ORANGE}
                        textColor='#fff'
                    />
                </div>
            </div>
        </div>
}