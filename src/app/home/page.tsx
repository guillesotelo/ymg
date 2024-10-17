"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Button from "src/components/Button/Button";
import InputField from "src/components/InputField/InputField";
import Modal from "src/components/Modal/Modal";
import { sendContactEmail } from "src/services";
import { contactEmailTemplate } from "src/constants"

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

    const updateData = (key: string, e: any) => {
        const { value } = e.target
        setData(prevData => ({ ...prevData, [key]: value }))
    }

    const sendMessage = async () => {
        try {
            setLoading(true)
            const emailData = {
                from: 'YMG Consultancy',
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

    const closeModal = () => {
        setContactModal(false)
        setData({ name: '', email: '', message: '' })
        setSentMessage(false)
    }

    return (
        <div className="home__container">
            {contactModal ?
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
                : ''}
            <div className="home__bg" style={{ filter: contactModal ? 'brightness(.5)' : '' }}>
                <img src="/bg_image.jpg" alt="Background Image" className="home__bg-image" draggable={false} />
                <div className="home__bg-text">
                    <p className="home__bg-title">Where Expertise Meets Flavor</p>
                    <p className="home__bg-subtitle">Driving culinary innovation through strategic consultancy and powerful networks.</p>
                    <Button
                        label='START YOUR JOURNEY'
                        handleClick={() => router.push('/contact')}
                        bgColor="#053C5E"
                        textColor="white"
                        style={{
                            width: 'fit-content',
                            marginTop: '4rem',
                            transform: 'scale(1.3)',
                            animation: 'fade-in 1s ease-in forwards',
                            animationDelay: '3s',
                            opacity: 0,
                        }}
                    />
                </div>
            </div>
            <section className="home__section" style={{ filter: contactModal ? 'brightness(.5)' : '', backgroundColor: '#053C5E' }}>
                <div className="home__row">
                    <div className="home__col">
                        <h2 className="home__section-title">Where Passion for Food Meets Digital Strategy</h2>
                        <p className="home__section-text">Chef Yanet's unique approach combines deep culinary knowledge with cutting-edge marketing strategies to help your business thrive in a competitive industry.</p>
                        <Button
                            label={`Hungry for Results? Let's Chat!`}
                            handleClick={() => router.push('/contact')}
                            bgColor="#053C5E"
                            textColor="white"
                            outline
                            style={{
                                width: 'fit-content',
                                marginTop: '4rem',
                                transform: 'scale(1.5)',
                            }} />
                    </div>
                    <div className="home__col">
                        <div className="home__projects">
                            <div className="home__projects-item">
                                <img src="https://www.wekivaculinary.org/wp-content/uploads/2021/07/Balancing-Flavors.jpeg" alt="Flavors" className="home__projects-item-img" draggable={false} />
                                <p className="home__projects-item-symbol">+</p>
                                <div className="home__projects-item-text">
                                    <p className="home__projects-item-title">Flavor-Driven Brand Strategy</p>
                                    <p className="home__projects-item-content">Build a brand that reflects your culinary essence and captivates your audience.</p>
                                </div>
                            </div>
                            <div className="home__projects-item">
                                <img src="/assets/images/foodpic.png" alt="Flavors" className="home__projects-item-img" draggable={false} />
                                <p className="home__projects-item-symbol">+</p>
                                <div className="home__projects-item-text">
                                    <p className="home__projects-item-title">Social Media that Sizzles</p>
                                    <p className="home__projects-item-content">Craft sizzling social media campaigns that boost your online presence and engagement.</p>
                                </div>
                            </div>
                            <div className="home__projects-item">
                                <img src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0b/fd/7c/e9.jpg" alt="Flavors" className="home__projects-item-img" draggable={false} />
                                <p className="home__projects-item-symbol">+</p>
                                <div className="home__projects-item-text">
                                    <p className="home__projects-item-title">Menu & Concept Reinvention</p>
                                    <p className="home__projects-item-content">Reinvent your menu with fresh ideas that excite diners and align with the latest trends.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
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
