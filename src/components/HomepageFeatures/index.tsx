import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import React from "react";

type FeatureItem = {
    title: string;
    Svg: React.ComponentType<React.ComponentProps<'svg'>>;
    description: ReactNode;
};

const FeatureList: FeatureItem[] = [
    {
        title: 'Smart Budgeting',
        Svg: require('@site/static/img/phone_records_entry.svg').default,
        description: (
            <>
                Easily plan, track, and manage your budgets in one place.
            </>
        ),
    },
    {
        title: 'Investment Insights',
        Svg: require('@site/static/img/chart_up_star.svg').default,
        description: (
            <>
                Monitor your portfolio and optimize your financial growth.
            </>
        ),
    },
    {
        title: 'Expense Tracking',
        Svg: require('@site/static/img/magnifier_inner_chart.svg').default,
        description: (
            <>
                See where your money goes and improve your spending habits.
            </>
        ),
    },
];

function Feature({title, Svg, description}: FeatureItem) {
    return (
        <div className={clsx('col col--4')}>
            <div className="text--center">
                <Svg className={styles.featureSvg} role="img"/>
            </div>
            <div className="text--center padding-horiz--md">
                <Heading as="h3">{title}</Heading>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default function HomepageFeatures(): ReactNode {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
