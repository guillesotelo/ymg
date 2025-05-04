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
                    <p className="home__parallax-overlap-caption" style={{ fontSize: '1.5rem' }}>Our Mission</p>
                    <p className="home__parallax-overlap-caption">
                        We believe in authentic ideas, a dependable voice, and professional execution.
                    </p>
                </div>
            </div>

            <section className="home__section" style={{ filter: contactModal ? 'brightness(.5)' : '', backgroundColor: '#F8F6F4', color: '#283F3B' }}>
                <div className="home__services">
                    <div className="home__service">
                        <img src="https://columnfivemedia.com/wp-content/uploads/2021/03/how-to-create-a-brand-identity-cove.png" alt="Brand Identity & Strategy" className="home__service-img" draggable={false} />
                        <p className="home__service-title">Brand Identity & Strategy</p>
                        <p className="home__service-overlay">Craft a unique brand identity that stands out in the culinary world. From logo design to positioning, we'll build a strategy that aligns with your vision.</p>
                    </div>
                    <div className="home__service">
                        <img src="https://www.adobe.com/express/learn/blog/media_114b76a23afe9ee97a6d31503ae2ce6edf0140dd2.jpeg?width=1200&format=pjpg&optimize=medium" alt="Social Media Management" className="home__service-img" draggable={false} />
                        <p className="home__service-title">Social Media Management</p>
                        <p className="home__service-overlay">Elevate your social presence with tailored content, targeted campaigns, and ongoing engagement to attract and retain food lovers.</p>
                    </div>
                    <div className="home__service">
                        <img src="https://media.istockphoto.com/id/1166773806/vector/set-of-vintage-chef-and-cook-hats.jpg?s=612x612&w=0&k=20&c=8lXuBEgRUv3dgPO3bj6dRSXoEBNZ76IVmtJCJQnx0Yc=" alt="Culinary Concept Development" className="home__service-img" draggable={false} />
                        <p className="home__service-title">Culinary Concept Development</p>
                        <p className="home__service-overlay">Bring fresh, innovative ideas to your menu and restaurant concept, tailored to the latest industry trends and customer preferences.</p>
                    </div>
                </div>
            </section>
            <section className="home__section" style={{ filter: contactModal ? 'brightness(.5)' : '', backgroundColor: '#283F3B', color: '#F8F6F4' }}>
                <div className="home__row">
                    <div className="home__col" style={{ width: '40%' }}>
                        <img src="https://media.licdn.com/dms/image/v2/D4D03AQGwhCYB3cptyQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1727985334259?e=1734566400&v=beta&t=UDkGw4s8QEAyTsaY7ZzPfKzmA8s9KkUNHdxJg4tutq4" alt="Yanet Mariel Gallina" className="home__about-img" draggable={false} />
                    </div>
                    <div className="home__col">
                        <h2 className="home__section-title">Meet Chef Yanet Mariel Gallina</h2>
                        <p className="home__section-text">With years of experience in the culinary world and a passion for digital marketing, Chef Yanet has helped numerous brands stand out in the gastronomic industry. Discover her journey and how she can bring her expertise to your project. </p>
                        <Button
                            label={`Learn More About Yanet`}
                            handleClick={() => router.push('/about')}
                            bgColor="#283F3B"
                            textColor="#F8F6F4"
                            outline
                            style={{
                                width: 'fit-content',
                                marginTop: '4rem',
                                transform: 'scale(1.5)',
                            }} />
                    </div>
                </div>
            </section>
            <section className="home__section" style={{ filter: contactModal ? 'brightness(.5)' : '', backgroundColor: '#F8F6F4', color: '#283F3B', height: 'fit-content', padding: '5rem 0' }}>
                <h2 className="home__section-title">A Glimpse of Success</h2>
                <div className="home__galery">
                    {galery.map((image, i) => (
                        <img
                            className="home__galery-image"
                            key={i}
                            src={image}
                            alt={`Image Galery N${i + 1}`}
                            draggable={false}
                            style={{
                                animationDelay: `${i ? (i / 10 + 1) : 1}`,
                                filter: hoverImages === -1 || hoverImages === i ? 'grayscale(0)' : 'grayscale(1)'
                            }}
                            onMouseEnter={() => setHoverImages(i)}
                            onMouseLeave={() => setHoverImages(-1)}
                        />
                    ))}
                </div>
            </section>
            <section className="home__section" style={{ filter: contactModal ? 'brightness(.5)' : '', backgroundColor: '#053C5E' }}>
                <p className="home__contact-text">
                    Whether you're ready to elevate your culinary brand or simply have a question, Chef Yanet is here to help.
                    <br />Contact us for a consultation, and let's bring your ideas to life.
                </p>
                <Button
                    label={`Get in Touch`}
                    handleClick={() => setContactModal(true)}
                    bgColor="#053C5E"
                    textColor="white"
                    outline
                    style={{
                        width: 'fit-content',
                        marginTop: '4rem',
                        transform: 'scale(1.5)',
                    }} />
            </section>
        </div>
    )
}

export default Home;
