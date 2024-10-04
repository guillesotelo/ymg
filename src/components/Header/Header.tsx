import React, { useContext, useEffect, useState } from 'react'
import { useRouter, usePathname } from "next/navigation";
import { AppContext } from '../../app/context/AppContext'
import Hamburger from 'hamburger-react'
import Dropdown from '../Dropdown/Dropdown'
import { loginUser, logOut } from 'src/services';
import toast from 'react-hot-toast';

export default function Header() {
    const [page, setPage] = useState('')
    const [menuOpen, setMenuOpen] = useState(false)
    const [showCategories, setShowCategories] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
    const { isMobile, isLoggedIn, setIsLoggedIn, darkMode, setDarkMode, lang, setLang } = useContext(AppContext)
    const [logoAnimation, setLogoAnimation] = useState('YMG')

    useEffect(() => {
        let intervalId: any = null
        const YMG = ' YMG'.split('')
        const the_shortest = 'The Shortest Tech Newsletter.'.split('')
        let i = 1
        let j = YMG.length - 1
        let k = 1
        let l = the_shortest.length - 1

        const animateLogo = () => {
            if (j === 11) return setInterval(() => reverse(), 60)
            if (j === 0 && i < 12) {
                setLogoAnimation(YMG.slice(0, i).join('') + '.')
                i++
            }
            // else if (l === 28) return setInterval(() => reverseShortest(), 50)
            // else if (k === 1 && i === 11) return setInterval(() => animateShortest(), 50)
        }

        const reverse = () => {
            if (j > 0) {
                setLogoAnimation(YMG.slice(0, j).join('') + '.')
                j--
            }
        }

        const reverseShortest = () => {
            if (l > 0) {
                setLogoAnimation(the_shortest.slice(0, l).join('') + '.')
                l--
            }
        }

        const animateShortest = () => {
            if (k < 29) {
                setLogoAnimation(the_shortest.slice(0, k).join('') + '.')
                k++
            }
        }

        setTimeout(() => {
            intervalId = setInterval(() => animateLogo(), 160)
        }, 1000)

        return () => clearInterval(intervalId)
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
                <img
                    src={darkMode ? '/assets/icons/day.svg' : '/assets/icons/night.svg'}
                    onClick={() => {
                        localStorage.setItem('preferredMode', JSON.stringify(!darkMode))
                        setDarkMode(!darkMode)
                        setMenuOpen(false)
                    }}
                    alt="Switch Mode"
                    className='header__darkmode'
                    draggable={false}
                />
            </div>
            <p
                className="header__title"
                onClick={() => {
                    router.push('/')
                    setMenuOpen(false)
                }}
                style={{ width: 'fit-content' }}>{logoAnimation}</p>
            <div className="header__menu">
                <Hamburger size={25} toggled={menuOpen} toggle={setMenuOpen} color='#dcdcdc' easing="ease-in" rounded label="Show menu" />
            </div>
            <div className={`header__menu-sidebar${menuOpen ? '--toggled' : ''}`}>
                <div className="header__menu-sidebar-container">
                    <div
                        className="header__menu-sidebar-item"
                        onClick={() => setShowCategories(!showCategories)}>
                        <img src='/assets/icons/categories.svg' draggable={false} alt="Categories" className="header__menu-sidebar-item-svg" />
                        <p className="header__menu-sidebar-item-text">{lang === 'es' ? 'Categorías' : 'Categories'}</p>
                    </div>

                    {showCategories ?

                        <>{([]).slice(0, 8).map((cat, i) =>
                            <p key={i} className="header__menu-sidebar-item-category" onClick={() => {
                                setMenuOpen(false)
                                goTo(`/search?q=${cat}`)
                            }}>{cat}</p>)}
                            <p className="header__menu-sidebar-item-category" onClick={() => {
                                goTo(`/categories`)
                                setMenuOpen(false)
                            }}>{lang === 'es' ? 'Ver todas' : 'See all'}</p>
                        </>
                        : <>
                            <div
                                className="header__menu-sidebar-item"
                                onClick={() => {
                                    goTo('/subscribe')
                                    setMenuOpen(false)
                                }}>
                                <img src='/assets/icons/subscribe.svg' draggable={false} alt="Subscribe" className="header__menu-sidebar-item-svg" />
                                <p className="header__menu-sidebar-item-text">{lang === 'es' ? 'Suscribirme' : 'Subscribe'}</p>
                            </div>
                            <div
                                className="header__menu-sidebar-item"
                                onClick={() => {
                                    goTo('/advertise')
                                    setMenuOpen(false)
                                }}>
                                <img src='/assets/icons/advertise.svg' draggable={false} alt="Advertise" className="header__menu-sidebar-item-svg" />
                                <p className="header__menu-sidebar-item-text">{lang === 'es' ? 'Publicitar' : 'Advertise'}</p>
                            </div>
                            <div
                                className="header__menu-sidebar-item"
                                onClick={() => {
                                    goTo('/archive')
                                    setMenuOpen(false)
                                }}>
                                <img src='/assets/icons/newsletter.svg' draggable={false} alt="Newsletters" className="header__menu-sidebar-item-svg" />
                                <p className="header__menu-sidebar-item-text">{lang === 'es' ? 'Ediciones' : 'Newsletters'}</p>
                            </div>
                        </>}
                    <div className="header__menu-sidebar-separator"></div>
                    <Dropdown
                        label=''
                        options={['🇺🇸 English', '🇪🇸 Español']}
                        selected={lang === 'en' ? '🇺🇸 English' : '🇪🇸 Español'}
                        setSelected={val => {
                            setLang(val === '🇺🇸 English' ? 'en' : 'es')
                            setMenuOpen(false)
                        }}
                        value={lang === 'en' ? '🇺🇸 English' : '🇪🇸 Español'}
                        bgColor='#114b5f'
                        color='#dcdcdc'
                        style={{ width: '70%' }}
                    />
                    {isLoggedIn ?
                        <>
                            <div
                                className="header__menu-sidebar-item"
                                onClick={() => {
                                    goTo('/editor')
                                    setMenuOpen(false)
                                }}
                                style={{ marginTop: '1rem' }}>
                                <img src='/assets/icons/edit.svg' draggable={false} alt="Editor" className="header__menu-sidebar-item-svg" />
                                <p className="header__menu-sidebar-item-text">Editor</p>
                            </div>
                            <div
                                className="header__menu-sidebar-item"
                                onClick={() => {
                                    goTo('/email-list')
                                    setMenuOpen(false)
                                }}>
                                <img src='/assets/icons/emails.svg' draggable={false} alt="Email List" className="header__menu-sidebar-item-svg" />
                                <p className="header__menu-sidebar-item-text">Email List</p>
                            </div>
                            <div
                                className="header__menu-sidebar-item"
                                onClick={() => {
                                    goTo('/ads-posts')
                                    setMenuOpen(false)
                                }}>
                                <img src='/assets/icons/ads.svg' draggable={false} alt="Ads & Posts" className="header__menu-sidebar-item-svg" />
                                <p className="header__menu-sidebar-item-text">Ads & Posts</p>
                            </div>
                            <div className="header__menu-sidebar-item" onClick={logout}>
                                <img src='/assets/icons/logout.svg' draggable={false} alt="Logout" className="header__menu-sidebar-item-svg" />
                                <p className="header__menu-sidebar-item-text">Logout</p>
                            </div>
                        </>
                        : <div className="header__menu-sidebar-item" onClick={() => goTo('/login')}>
                            <img src='/assets/icons/login.svg' draggable={false} alt="Login" className="header__menu-sidebar-item-svg" />
                            <p className="header__menu-sidebar-item-text">Login</p>
                        </div>}
                </div>
            </div>
        </div>
    }

    return isMobile ? renderMobile() :
        <div className="header__container">
            <div className="header__main">
                <p className="header__title" onClick={() => router.push('/')}>{logoAnimation}</p>
                <div className="header__nav">
                    <div
                        className="header__button-dropdown header-hover-underline"
                    >{lang === 'es' ? 'Categorías' : 'Categories'}
                        <div className='header__button-dropdown-box'>
                            
                            <p className='header__button-dropdown-item' onClick={() => router.push(`/categories`)}>{lang === 'es' ? '+ Más' : '+ More'}</p>
                        </div>
                    </div>
                    <button
                        className="header__button header-hover-underline"
                        onClick={() => router.push('/subscribe')}
                        style={{
                            borderBottom: page === '/subscribe' ? '2px solid #DCDCDC' : ''
                        }}
                    >{lang === 'es' ? 'Suscribirme' : 'Subscribe'}</button>
                    <button
                        className="header__button header-hover-underline"
                        onClick={() => router.push('/advertise')}
                        style={{
                            borderBottom: page === '/advertise' ? '2px solid #DCDCDC' : ''
                        }}
                    >{lang === 'es' ? 'Publicitar' : 'Advertise'}</button>
                    <button
                        className="header__button header-hover-underline"
                        onClick={() => router.push('/archive')}
                        style={{
                            borderBottom: page === '/archive' ? '2px solid #DCDCDC' : ''
                        }}
                    >{lang === 'es' ? 'Ediciones' : 'Newsletters'}</button>
                    {isLoggedIn ?
                        <div
                            className="header__button-dropdown header-hover-underline"
                        >Administrator
                            <div className='header__button-dropdown-box'>
                                <button
                                    className="header__button header-hover-underline"
                                    onClick={() => router.push('/editor')}
                                    style={{
                                        borderBottom: page === '/editor' ? '2px solid #DCDCDC' : ''
                                    }}
                                >Editor</button>
                                <button
                                    className="header__button header-hover-underline"
                                    onClick={() => router.push('/email-list')}
                                    style={{
                                        borderBottom: page === '/email-list' ? '2px solid #DCDCDC' : ''
                                    }}
                                >Email List</button>
                                <button
                                    className="header__button header-hover-underline"
                                    onClick={() => router.push('/ads-posts')}
                                    style={{
                                        borderBottom: page === '/ads-posts' ? '2px solid #DCDCDC' : ''
                                    }}
                                >Ads & Posts</button>
                            </div>
                        </div>
                        : ''}
                </div>
            </div>
            <div className="header__controls">
                <Dropdown
                    label=''
                    options={['🇺🇸 EN', '🇪🇸 ES']}
                    selected={lang === 'en' ? '🇺🇸 EN' : '🇪🇸 ES'}
                    setSelected={val => setLang(val === '🇺🇸 EN' ? 'en' : 'es')}
                    value={lang === 'en' ? '🇺🇸 EN' : '🇪🇸 ES'}
                    bgColor='#114b5f'
                    color='#dcdcdc'
                />
                <img
                    src={darkMode ? '/assets/icons/day.svg' : '/assets/icons/night.svg'}
                    onClick={() => {
                        localStorage.setItem('preferredMode', JSON.stringify(!darkMode))
                        setDarkMode(!darkMode)
                    }}
                    alt="Switch Mode"
                    className='header__darkmode'
                    draggable={false}
                />
            </div>
        </div>
}