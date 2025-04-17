// src/pages/Contact.jsx
import PageLayout from "../layouts/PageLayout";
import TextIntroSide from "../components/TextIntroSide";
import ImageSide from "../components/ImageSide";
import imgBg from "../assets/contact/contact-main.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Contact() {
    return (
        <PageLayout
            introLeft={
                <TextIntroSide
                    variant="intro"
                    title="contact."
                    subtitle={
                        <>
                            <p>
                                Get in touch with me via social media or send me
                                an email.
                            </p>
                            <p className="mt-4 flex items-center gap-2 text-indigo-600 text-sm">
                                <FontAwesomeIcon icon={faEnvelope} />
                                <span>
                                    tmw.poopradubsil [at] gmail [dot] com
                                </span>
                            </p>
                        </>
                    }
                    description={
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <a
                                href="https://www.linkedin.com/in/thamolwan-poopradubsil"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 p-3 rounded-full bg-[#0A66C2] text-white font-semibold hover:opacity-90 transition"
                            >
                                <FontAwesomeIcon
                                    icon={faLinkedin}
                                    className="text-lg"
                                />
                                <span className="text-sm">LinkedIn</span>
                            </a>

                            <a
                                href="http://github.com/thamolwanpo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 p-3 rounded-full bg-[#333] text-white font-semibold hover:opacity-90 transition"
                            >
                                <FontAwesomeIcon
                                    icon={faGithub}
                                    className="text-lg"
                                />
                                <span className="text-sm">GitHub</span>
                            </a>
                        </div>
                    }
                />
            }
            introRight={<ImageSide imgSrc={imgBg} alt="contact" />}
        />
    );
}
