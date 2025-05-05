"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "src/components/Button/Button";
import InputField from "src/components/InputField/InputField";
import Modal from "src/components/Modal/Modal";
import { sendContactEmail } from "src/services";
import { APP_COLORS, contactEmailTemplate } from "src/constants"

const galery = [
    '/assets/images/galery1.jpg',
    '/assets/images/galery2.jpg',
    '/assets/images/galery3.jpg',
    '/assets/images/galery4.jpg',
    'https://www.culinaryartseurope.com/wp-content/uploads/2021/11/254081172_214211454174565_5100061459972446167_n.jpg',
    'https://jcps.co.za/wp-content/uploads/2021/04/JCPS-culinary-arts-full-time-1.png',
    'https://i.pinimg.com/236x/6f/01/07/6f0107932f22af53448850bccc841af3.jpg',
    'https://www.escoffier.edu/wp-content/uploads/2019/10/Fancy-plated-meat-dish-with-vegetables-on-a-white-plate-768.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5JSSCfG-RUn6xRpAX1E8-h86EDWwyjkwlYZTdx0U12t6C4Fyk_zLATf_l-4zwgu9qafo&usqp=CAU',
    'https://cdnimg.webstaurantstore.com/uploads/blog/2017/3/free_form_plating_10.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcFcHvixcQJaeHoYPqx-o61HBLH5TSjuO6pdC4jKRNmaonhpONhLT1sRGOVx0KLthsMqw&usqp=CAU',
    'https://i.pinimg.com/736x/3f/b5/ee/3fb5eece931c10c514140d29e941dfde.jpg',
    'https://i.pinimg.com/originals/df/ef/03/dfef03e8f876497f5da32ad7bbf9c492.jpg',
    'https://assets.cntraveller.in/photos/66682da9f2c9eddc5e47e140/16:9/w_1920,h_1080,c_limit/indian%20accent%20naar.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb8lRSUw1Xec8wiyQCcoGa5ZrqemnqaTASW2TjQcSonDI180AAiQ83VjANa08wO85lRX0&usqp=CAU',
    'https://i.pinimg.com/564x/3e/e2/d5/3ee2d53d62224a10520692da43694e1c.jpg',
    'https://i.pinimg.com/originals/53/06/d2/5306d21fd1b26b2502f10342d0565d8d.jpg',
]

const Home = () => {
    const [data, setData] = useState({ name: '', email: '', message: '' })
    const [contactModal, setContactModal] = useState(false)
    const [sentMessage, setSentMessage] = useState(false)
    const [loading, setLoading] = useState(false)
    const [hoverImages, setHoverImages] = useState(-1)
    const router = useRouter()

    useEffect(() => {
        const parallaxScroll = () => {
            const parallaxImages = document.querySelectorAll('.home__parallax-image') as any
            parallaxImages.forEach((image: any, index: number) => {
                const speed = parseFloat(image.dataset.speed) || 0.4
                const offset = window.scrollY - image.parentElement.offsetTop - (index * index * 1000)
                image.style.transform = `translateY(${offset * speed}px)`
            })
        }

        window.addEventListener('scroll', parallaxScroll)
        return () => window.removeEventListener('scroll', parallaxScroll)
    }, [])

    const updateData = (key: string, e: any) => {
        const { value } = e.target
        setData(prevData => ({ ...prevData, [key]: value }))
    }

    const sendMessage = async () => {
        try {
            if (checkContactData()) return
            setLoading(true)
            const emailData = {
                from: 'Culinaire Studio',
                subject: 'Tienes un nuevo mensaje',
                to: 'yanetmarielgallina@gmail.com',
                html: contactEmailTemplate(data)
            }
            const sent = await sendContactEmail(emailData)
            if (sent) setSentMessage(true)
            else toast.error('An error occurred. Please try again.')
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }

    const checkContactData = () => {
        const errors: string[] = []
        if (!data.message) errors.push('Please add a message')
        if (!data.email) errors.push('Please add your email')
        if (data.email && (!data.email.includes('.') || !data.email.includes('@'))) errors.push('Invalid email')
        if (errors.length) {
            errors.map(e => toast.error(e))
            return true
        }
    }

    const closeModal = () => {
        setContactModal(false)
        setData({ name: '', email: '', message: '' })
        setSentMessage(false)
    }

    const renderContactModal = () => {
        return (
            <Modal
                title={sentMessage ? 'Thank you! ✨' : 'Get in touch with us'}
                onClose={closeModal}>
                {!sentMessage ?
                    <div className="home__contact-modal">
                        < InputField
                            label="Your name"
                            name="name"
                            value={data.name}
                            updateData={updateData}
                        />
                        <InputField
                            label="Your email"
                            name="email"
                            value={data.email}
                            updateData={updateData}
                        />
                        <InputField
                            label="Your message"
                            name="message"
                            value={data.message}
                            updateData={updateData}
                            type="textarea"
                            rows={5}
                        />
                        <Button
                            label='SEND'
                            handleClick={sendMessage}
                            bgColor="#053C5E"
                            textColor="white"
                            style={{
                                marginTop: '1rem'
                            }}
                            disabled={loading}
                        />
                    </div>
                    :
                    <p>Your message has been sent and we are going to answer you as soon as we can. Stay tunned!</p>
                }
            </Modal >
        )
    }

    return (
        <div className="home__container">
            {contactModal && renderContactModal()}
            {/* <div className="home__bg home__parallax" style={{ filter: contactModal ? 'brightness(.5)' : '' }} /> */}
            <div className="home__parallax-container">
                <img src="https://images.squarespace-cdn.com/content/v1/5b85f3ecb10598d2bca44d0c/1575504697821-T2ME0B0NC8JH3RU0OO59/ORJ01462.jpg?format=2500w" className="home__parallax-image" data-speed="0.5" />
            </div>
            <section className="home__section-small" style={{ filter: contactModal ? 'brightness(.5)' : '', backgroundColor: '#F6F6F3' }}>
                <div className="home__row">
                    <div className="home__col" style={{ width: '75vw' }}>
                        <h2 className="home__section-title">Expert Food Styling, Recipe Development & Food Consulting Services</h2>
                        <p className="home__section-text">At Culinaire Studio, we specialize in expert food styling, recipe development, and food consulting to help food brands, restaurants, and media create visually stunning images and delicious recipes. Whether you need a professional food stylist for a cookbook, tested recipes for a new product launch, or restaurant consulting to refine your menu, our expertise ensures your culinary vision comes to life.</p>
                        <p className="home__section-text">From food photography styling to menu development and operational strategy, we partner with chefs, restaurateurs, and food brands to deliver compelling, high-quality culinary content that engages your audience and elevates your brand.</p>
                        <Button
                            label={`CONTACT`}
                            handleClick={() => router.push('/contact')}
                            bgColor={APP_COLORS.TK_ORANGE}
                            textColor='#fff'
                            style={{
                                width: 'fit-content',
                                marginTop: '2rem',
                            }} />
                    </div>
                </div>
            </section>

            <section className="home__section" style={{ filter: contactModal ? 'brightness(.5)' : '', backgroundColor: '#F6F6F3', color: '#283F3B' }}>
                <h2 className="home__section-title">Our Services</h2>
                <div className="home__servicecard-list">
                    <div className="home__servicecard-container">
                        <div className="home__servicecard-image-wrapper">
                            <img src="https://images.squarespace-cdn.com/content/v1/5b85f3ecb10598d2bca44d0c/1537466071726-NYXF84Z4SB5MQJK2IXDQ/JPEG+image-200FC4901527-7.jpeg" alt="" className="home__servicecard-image" />
                        </div>
                        <p className="home__servicecard-title">Food + Prop Styling</p>
                        <p className="home__servicecard-content">Elevate your food photography with expert food styling and prop styling services. Whether it's for magazines, advertising, or digital content, I ensure your food looks as good as it tastes.</p>
                        <Button
                            label='FOOD STYLING'
                            handleClick={() => router.push('/')}
                            bgColor='#F6F6F3'
                            textColor={APP_COLORS.TK_ORANGE}
                            outline
                            style={{
                                width: 'fit-content',
                                margin: '.5rem auto 0 auto'
                            }}
                        />
                    </div>
                    <div className="home__servicecard-container">
                        <div className="home__servicecard-image-wrapper">
                            <img src="https://images.squarespace-cdn.com/content/v1/5b85f3ecb10598d2bca44d0c/1537466223757-E8T6WO0H7FDBFV1O8QLB/JPEG+image-200FC4901527-10.jpeg" alt="" className="home__servicecard-image" />
                        </div>
                        <p className="home__servicecard-title">Professional Recipe Development & Testing</p>
                        <p className="home__servicecard-content">Custom recipe development and testing tailored to your brand's unique voice. From cookbooks to marketing campaigns, every recipe is rigorously tested for flavor, accessibility, and engagement.</p>
                        <Button
                            label='RECIPE DEVELOPMENT'
                            handleClick={() => router.push('/')}
                            bgColor='#F6F6F3'
                            textColor={APP_COLORS.TK_ORANGE}
                            outline
                            style={{
                                width: 'fit-content',
                                margin: '.5rem auto 0 auto'
                            }}
                        />
                    </div>
                    <div className="home__servicecard-container">
                        <div className="home__servicecard-image-wrapper">
                            <img src="https://images.squarespace-cdn.com/content/v1/5b85f3ecb10598d2bca44d0c/1730991913312-Z131QGNP4V68KOA6MH4I/smithey_1.2_1850.jpg" alt="" className="home__servicecard-image" />
                        </div>
                        <p className="home__servicecard-title">Restaurant and Food Consultant</p>
                        <p className="home__servicecard-content">From restaurant menu development to culinary consulting, we help streamline operations and create unforgettable dining experiences.</p>
                        <Button
                            label='RESTAURANT CONSULTING'
                            handleClick={() => router.push('/')}
                            bgColor='#F6F6F3'
                            textColor={APP_COLORS.TK_ORANGE}
                            outline
                            style={{
                                width: 'fit-content',
                                margin: '.5rem auto 0 auto'
                            }}
                        />
                    </div>
                </div>
            </section>

            <section className="home__section-small" style={{ filter: contactModal ? 'brightness(.5)' : '', backgroundColor: '#e5e3dc' }}>
                <div className="home__row" style={{ width: '85vw' }}>
                    <div className="home__col" style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <h1 className="home__section-why-title">Why Work With Culinaire Studio?</h1>
                    </div>
                    <div className="home__col" style={{ alignItems: 'flex-start' }}>
                        <p className="home__section-why">
                            ✔ Collaborated with James Beard award-winning chefs - Bringing top-tier culinary expertise to every project.
                        </p>
                        <p className="home__section-why">
                            ✔ Trained at Le Cordon Bleu + MBA in Hospitality - A unique blend of culinary artistry and business strategy.
                        </p>
                        <p className="home__section-why">
                            ✔ Full-service approach - Seamlessly integrating food styling, recipe development, props, and consulting to bring your vision to life.
                        </p>
                        <p className="home__section-why" style={{ borderBottom: '1px solid', paddingBottom: '1rem' }}>
                            ✔ Featured in top-tier publications - Trusted by leading food brands, restaurants, and media.
                        </p>
                    </div>
                </div>
            </section>

            <div className="home__parallax-container" style={{ height: '70vh' }} >
                <img src="https://images.squarespace-cdn.com/content/v1/5b85f3ecb10598d2bca44d0c/1537636204047-CPANMXGI8UWQ39FG8S8T/JPEG+image-200FC4901527-14.jpeg?format=2500w" className="home__parallax-image" data-speed="0.2" />
                <div className="home__parallax-overlap">
                    <p className="home__parallax-overlap-caption" style={{ fontSize: '2rem' }}>our mission</p>
                    <p className="home__parallax-overlap-caption">
                        We believe in authentic ideas, a dependable voice, and professional execution.
                    </p>
                </div>
            </div>

            <section className="home__section-small" style={{ filter: contactModal ? 'brightness(.5)' : '', backgroundColor: '#F6F6F3' }}>
                <div className="home__col" style={{ width: '60vw' }}>
                    <h2 className="home__section-title">Our Clients</h2>
                    <p className="home__section-text">Trusted by leading food brands, restaurants, and culinary professionals, Culinaire Studio delivers expert food styling, recipe development, and consulting services that bring your vision to life. Our collaborative approach has earned the trust of industry leaders like Southern Living, Eating Well, and Le Creuset. Whether crafting market-ready recipes, styling food or creating sets for photography, or refining restaurant menus, we work closely with our clients to create beautifully styled and deliciously executed results.</p>
                    <Button
                        label={`OUR PORTFOLIO`}
                        handleClick={() => router.push('/portfolio')}
                        bgColor={APP_COLORS.TK_ORANGE}
                        textColor='#fff'
                        style={{
                            width: 'fit-content',
                            marginTop: '2rem',
                        }} />
                </div>
            </section>

            <section className="home__section-small" style={{ filter: contactModal ? 'brightness(.5)' : '', backgroundColor: '#D4967D', color: '#464646' }}>
                <div className="home__col" style={{ width: '60vw' }}>
                    <div className="home__reviews">
                        <h2 className="home__section-title">Overheard in Culinaire Studio</h2>
                        <img src="/assets/images/quotes.png" alt="quotes" className="home__reviews-quotes" />
                        <p className="home__reviews-content">"Yei is always my first choice when it comes to food or prop styling for my commercial photo + video shoots. You won't find a harder working stylist in the Charleston area who is not only a joy to work with on set but truly understands the client's vision!"</p>
                        <p className="home__reviews-author">Miguel Buencamino | Holy City Handcraft</p>
                    </div>
                </div>
            </section>

            <section className="home__section-small" style={{ filter: contactModal ? 'brightness(.5)' : '', backgroundColor: '#E5E3DC', height: 'fit-content', padding: '2rem 0' }}>
                <h2 className="home__section-title">Food Styling & Recipe Development Blog</h2>
                <div className="home__servicecard-list" style={{ margin: '2rem 0' }}>
                    <div className="home__servicecard-container" style={{ width: '18%', height: 'auto' }}>
                        <div className="home__servicecard-image-wrapper">
                            <img src="https://images.squarespace-cdn.com/content/v1/5b85f3ecb10598d2bca44d0c/574b0caf-9bf0-4798-a4e8-18d8fe2e5551/Rice+Cooker%2C+Chicken+Soup%2C+Turkey+Rice-12.jpg" alt="" className="home__servicecard-image" />
                        </div>
                        <p className="home__servicecard-title">Turkey Rice with Spring Vegetables</p>
                        <Button
                            label='SEE RECIPE'
                            handleClick={() => router.push('/')}
                            bgColor='#E5E3DC'
                            textColor={APP_COLORS.TK_ORANGE}
                            outline
                            style={{
                                width: 'fit-content',
                                margin: '.5rem auto 0 auto'
                            }}
                        />
                    </div>
                    <div className="home__servicecard-container" style={{ width: '18%', height: 'auto' }}>
                        <div className="home__servicecard-image-wrapper">
                            <img src="https://images.squarespace-cdn.com/content/v1/5b85f3ecb10598d2bca44d0c/1732210262025-SQY2U1JR2VYYKZMZ3Z5K/Dinner+Table+2.jpg" alt="" className="home__servicecard-image" />
                        </div>
                        <p className="home__servicecard-title">Thanksgiving Recipe Roundup</p>
                        <Button
                            label='SEE RECIPE'
                            handleClick={() => router.push('/')}
                            bgColor='#E5E3DC'
                            textColor={APP_COLORS.TK_ORANGE}
                            outline
                            style={{
                                width: 'fit-content',
                                margin: '.5rem auto 0 auto'
                            }}
                        />
                    </div>
                    <div className="home__servicecard-container" style={{ width: '18%', height: 'auto' }}>
                        <div className="home__servicecard-image-wrapper">
                            <img src="https://images.squarespace-cdn.com/content/v1/5b85f3ecb10598d2bca44d0c/1734373647038-4VPCE5T1VC71ULT6C7JU/Screenshot+2024-12-09+at+2.52.42%E2%80%AFPM.png" alt="" className="home__servicecard-image" />
                        </div>
                        <p className="home__servicecard-title">Recipes for Gifting</p>
                        <Button
                            label='SEE RECIPE'
                            handleClick={() => router.push('/')}
                            bgColor='#E5E3DC'
                            textColor={APP_COLORS.TK_ORANGE}
                            outline
                            style={{
                                width: 'fit-content',
                                margin: '.5rem auto 0 auto'
                            }}
                        />
                    </div>
                    <div className="home__servicecard-container" style={{ width: '18%', height: 'auto' }}>
                        <div className="home__servicecard-image-wrapper">
                            <img src="https://images.squarespace-cdn.com/content/v1/5b85f3ecb10598d2bca44d0c/b9c7ada1-87e9-4f5f-958d-43e00f3d7575/SchermersJanJL-0356.jpg" alt="" className="home__servicecard-image" />
                        </div>
                        <p className="home__servicecard-title">Olive Oil Cake</p>
                        <Button
                            label='SEE RECIPE'
                            handleClick={() => router.push('/')}
                            bgColor='#E5E3DC'
                            textColor={APP_COLORS.TK_ORANGE}
                            outline
                            style={{
                                width: 'fit-content',
                                margin: '.5rem auto 0 auto'
                            }}
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home;
