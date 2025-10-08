import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import React from "react";
import styles from './index.module.css';

function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <header className={clsx('hero', styles.heroBanner)}>
            <div className="container">
                <div className={styles.heroContent}>
                    <Heading as="h1" className={styles.heroTitle}>
                        <img
                            src="/img/myfin-logo-transparent.png"
                            alt="MyFinBudget Logo"
                            className={styles.heroLogo}
                        />
                    </Heading>
                    <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
                    <div className={styles.buttons}>
                        <Link
                            style={{background: "#eaf5ff", color:"var(--ifm-color-primary)"}}
                            className="button button--primary button--lg"
                            to="/docs/intro">
                            Get Started
                            <span className={styles.buttonIcon}>🚀</span>
                        </Link>
                        <Link
                            style={{color: "#eaf5ff"}}
                            className="button button--outline button--primary button--lg"
                            to="/docs/intro#demo-account---try-it-for-yourself">
                            View Demo
                        </Link>
                    </div>
                </div>

            </div>
            <div className={styles.heroImageWrapper}>
                <img
                    src="/img/myfin-preview-frames.png"
                    alt="MyFin Budget App Preview"
                    className={styles.heroImage}
                />
            </div>
        </header>
    );
}

export default function Home(): ReactNode {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout
            title={`${siteConfig.title}`}
            description="The open-source personal finance manager">
            <HomepageHeader/>
            <main style={{backgroundColor: "var(--ifm-navbar-background-color)"}}>
                <HomepageFeatures/>
            </main>
        </Layout>
    );
}