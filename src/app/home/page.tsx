"use client";

import { useRouter } from "next/navigation";
import Button from "src/components/Button/Button";

const Home = () => {

    const router = useRouter()
    return (
        <div className="home__container">
            <div className="home__bg">
                <img src="/bg_image.jpg" alt="Background Image" className="home__bg-image" />
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
            <section className="home__section" style={{ backgroundColor: '#053C5E' }}>
                <div className="home__row">
                    <div className="home__col">
                        <h2 className="home__section-title">Where Passion for Food Meets Digital Strategy</h2>
                        <p className="home__section-text">Chef Yanet's unique approach combines deep culinary knowledge with cutting-edge marketing strategies to help your business thrive in a competitive industry.</p>
                        <Button
                            label={`Hungry for Results? Let's Chat!`}
                            handleClick={() => router.push('/contact')}
                            bgColor="#053C5E"
                            textColor="white"
                            reverseBG
                            style={{
                                width: 'fit-content',
                                marginTop: '4rem',
                                transform: 'scale(1.5)',
                            }} />
                    </div>
                    <div className="home__col">
                        <div className="home__projects">
                            <div className="home__projects-item">
                                <img src="https://www.wekivaculinary.org/wp-content/uploads/2021/07/Balancing-Flavors.jpeg" alt="Flavors" className="home__projects-item-img" />
                                <p className="home__projects-item-symbol">+</p>
                                <div className="home__projects-item-text">
                                    <p className="home__projects-item-title">Flavor-Driven Brand Strategy</p>
                                    <p className="home__projects-item-content">Build a brand that reflects your culinary essence and captivates your audience.</p>
                                </div>
                            </div>
                            <div className="home__projects-item">
                                <img src="/assets/images/foodpic.png" alt="Flavors" className="home__projects-item-img" />
                                <p className="home__projects-item-symbol">+</p>
                                <div className="home__projects-item-text">
                                    <p className="home__projects-item-title">Social Media that Sizzles</p>
                                    <p className="home__projects-item-content">Craft sizzling social media campaigns that boost your online presence and engagement.</p>
                                </div>
                            </div>
                            <div className="home__projects-item">
                                <img src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0b/fd/7c/e9.jpg" alt="Flavors" className="home__projects-item-img" />
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
            <section className="home__section" style={{ backgroundColor: '#F8F6F4', color: '#283F3B' }}>
                <div className="home__services">
                    <div className="home__service">
                        <img src="https://columnfivemedia.com/wp-content/uploads/2021/03/how-to-create-a-brand-identity-cove.png" alt="Brand Identity & Strategy" className="home__service-img" />
                        <p className="home__service-title">Brand Identity & Strategy</p>
                        <p className="home__service-overlay">Craft a unique brand identity that stands out in the culinary world. From logo design to positioning, we'll build a strategy that aligns with your vision.</p>
                    </div>
                    <div className="home__service">
                        <img src="https://www.adobe.com/express/learn/blog/media_114b76a23afe9ee97a6d31503ae2ce6edf0140dd2.jpeg?width=1200&format=pjpg&optimize=medium" alt="Social Media Management" className="home__service-img" />
                        <p className="home__service-title">Social Media Management</p>
                        <p className="home__service-overlay">Elevate your social presence with tailored content, targeted campaigns, and ongoing engagement to attract and retain food lovers.</p>
                    </div>
                    <div className="home__service">
                        <img src="https://media.istockphoto.com/id/1166773806/vector/set-of-vintage-chef-and-cook-hats.jpg?s=612x612&w=0&k=20&c=8lXuBEgRUv3dgPO3bj6dRSXoEBNZ76IVmtJCJQnx0Yc=" alt="Culinary Concept Development" className="home__service-img" />
                        <p className="home__service-title">Culinary Concept Development</p>
                        <p className="home__service-overlay">Bring fresh, innovative ideas to your menu and restaurant concept, tailored to the latest industry trends and customer preferences.</p>
                    </div>
                </div>
            </section>
            <section className="home__section" style={{ backgroundColor: '#283F3B', color: '#F8F6F4' }}>
                <div className="home__row">
                    <div className="home__col" style={{ width: '40%' }}>
                        <img src="https://media.licdn.com/dms/image/v2/D4D03AQGwhCYB3cptyQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1727985334259?e=1734566400&v=beta&t=UDkGw4s8QEAyTsaY7ZzPfKzmA8s9KkUNHdxJg4tutq4" alt="Yanet Mariel Gallina" className="home__about-img" />
                    </div>
                    <div className="home__col">
                        <h2 className="home__section-title">Meet Chef Yanet Mariel Gallina</h2>
                        <p className="home__section-text">With years of experience in the culinary world and a passion for digital marketing, Chef Yanet has helped numerous brands stand out in the gastronomic industry. Discover her journey and how she can bring her expertise to your project. </p>
                        <Button
                            label={`Learn More About Yanet`}
                            handleClick={() => router.push('/about')}
                            bgColor="#283F3B"
                            textColor="#F8F6F4"
                            reverseBG
                            style={{
                                width: 'fit-content',
                                marginTop: '4rem',
                                transform: 'scale(1.5)',
                            }} />
                    </div>
                </div>
            </section>
            <section className="home__section" style={{ backgroundColor: '#F8F6F4', color: '#283F3B' }}>
            </section>

        </div>
    )
}

export default Home;
