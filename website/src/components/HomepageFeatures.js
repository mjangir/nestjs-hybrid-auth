import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Easy to Use',
    description: (
      <>
        NestJS Hybrid Auth is just a dynamic module which can be imported inside
        of your application root module configure it for various identity
        providers and use the route handlers in your controller.
      </>
    ),
  },
  {
    title: 'Multiple Identity Providers',
    description: (
      <>
        The library contains various social identity providers for e.g. Google,
        Facebook, Twitter and many more. I will keep updating it with more
        providers. You just need to configure them in the root module.
      </>
    ),
  },
];

function Feature({ title, description }) {
  return (
    <div className={clsx('col col--6')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
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
