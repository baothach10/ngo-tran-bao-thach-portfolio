import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import './NotFoundPage.css'

export default function NotFoundPage() {
    return (
        <section className="not-found-page">
            <Helmet>
                <title>404 Not Found | Ngo Tran Bao Thach</title>
                <meta name="description" content="The page you are looking for does not exist." />
                <meta property="og:title" content="404 Not Found | Ngo Tran Bao Thach" />
                <meta property="og:description" content="The page you are looking for does not exist." />
            </Helmet>
            <div className="cloak__wrapper">
                <div className="cloak__container">
                    <div className="cloak">

                    </div>
                </div>
            </div>
            <div className="title-wrapper">
                <h1 className="title title--shadow">404</h1>
                <h1 className="notfound-title">404</h1>
            </div>
            <div className="info">
                <h2>We can't find that page</h2>
                <p>
                    We're fairly sure that page used to be here, but seems to have gone missing. We do apologize on its behalf.
                </p>
                <Link to="/" className="button_link" aria-label="Go to Home Page">
                    Home
                </Link>

            </div>
        </section>
    );
}