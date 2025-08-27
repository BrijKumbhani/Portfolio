import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import emailjs from "@emailjs/browser";

import "./Contact.css";
import "react-toastify/dist/ReactToastify.css";
import { 
    trackSectionView, 
    trackFormSubmit, 
    trackFormField, 
    trackContactAttempt 
} from "../../utils/tracking";

const Contact = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // Track when Contact section comes into view
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        trackSectionView('Contact');
                    }
                });
            },
            { threshold: 0.5 }
        );

        const section = document.getElementById('contact');
        if (section) {
            observer.observe(section);
        }

        return () => observer.disconnect();
    }, []);

    // Track form field interactions
    const handleFieldFocus = (fieldName) => {
        trackFormField(fieldName, 'focus');
    };

    const handleFieldBlur = (fieldName) => {
        trackFormField(fieldName, 'blur');
    };

    // Handle form field changes with tracking
    const handleNameChange = (e) => {
        setName(e.target.value);
        if (e.target.value.length === 1) { // Track when user starts typing
            trackFormField('Name', 'start_typing');
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (e.target.value.length === 1) {
            trackFormField('Email', 'start_typing');
        }
    };

    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
        if (e.target.value.length === 1) {
            trackFormField('Subject', 'start_typing');
        }
    };

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
        if (e.target.value.length === 1) {
            trackFormField('Message', 'start_typing');
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        
        // Track form submission attempt
        trackContactAttempt('Contact Form');
        trackFormSubmit('Contact Form');
        
        if (!name || !email || !subject || !message) {
            // Track form validation error
            trackFormField('Contact Form', 'validation_error');
            return toast.error("Please complete the form above");
        }

        setLoading(true);

        const data = {
            name,
            email,
            subject,
            message,
        };

        emailjs
            .send(
                process.env.REACT_APP_EMAILJS_SERVICE_ID,
                process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
                data,
                process.env.REACT_APP_EMAILJS_PUBLIC_API
            )
            .then(
                (result) => {
                    setLoading(false);
                    toast.success(`Successfully sent email.`);
                    
                    // Track successful form submission
                    trackFormField('Contact Form', 'submit_success');
                    
                    // Reset form
                    setName("");
                    setEmail("");
                    setSubject("");
                    setMessage("");
                },
                (error) => {
                    setLoading(false);
                    console.log(error);
                    toast.error(error.text);
                    
                    // Track form submission error
                    trackFormField('Contact Form', 'submit_error');
                }
            );
    };

    return (
        <section className="contact container section" id="contact">
            <h2 className="section__title">Get In Touch</h2>

            <div className="contact__container grid">
                <div className="contact__info">
                    <h3 className="contact__title">Let's talk about everything!</h3>
                    <p className="contact__details">
                        Don't like forms? Send me an email. 👋
                    </p>
                </div>

                <form onSubmit={submitHandler} className="contact__form">
                    <div className="contact__form-group">
                        <div className="contact__form-div">
                            <input
                                type="text"
                                className="contact__form-input"
                                placeholder="Insert your name"
                                value={name}
                                onChange={handleNameChange}
                                onFocus={() => handleFieldFocus('Name')}
                                onBlur={() => handleFieldBlur('Name')}
                            />
                        </div>

                        <div className="contact__form-div">
                            <input
                                type="email"
                                className="contact__form-input"
                                placeholder="Insert your email"
                                value={email}
                                onChange={handleEmailChange}
                                onFocus={() => handleFieldFocus('Email')}
                                onBlur={() => handleFieldBlur('Email')}
                            />
                        </div>
                    </div>

                    <div className="contact__form-div">
                        <input
                            type="text"
                            className="contact__form-input"
                            placeholder="Insert your subject"
                            value={subject}
                            onChange={handleSubjectChange}
                            onFocus={() => handleFieldFocus('Subject')}
                            onBlur={() => handleFieldBlur('Subject')}
                        />
                    </div>

                    <div className="contact__form-div contact__form-area">
                        <textarea
                            name="message"
                            id="message"
                            cols="30"
                            rows="10"
                            className="contact__form-input"
                            placeholder="Write your message"
                            value={message}
                            onChange={handleMessageChange}
                            onFocus={() => handleFieldFocus('Message')}
                            onBlur={() => handleFieldBlur('Message')}
                        ></textarea>
                    </div>

                    <button type="submit" className="btn" disabled={loading}>
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                </form>
                <ToastContainer position="bottom-right" theme={props.theme} />
            </div>
        </section>
    );
};

export default Contact;