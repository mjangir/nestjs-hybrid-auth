import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate from '@docusaurus/Translate';
import { translate } from '@docusaurus/core/lib/client/exports/Translate';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';

const moduleExample = `
// app.module.ts

import { GoogleAuthModule } from '@nestjs-hybrid-auth/google';

@Module({
  import: [
    GoogleAuthModule.forRoot({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      requestCallbackURL: process.env.GOOGLE_CALLBACK_URL,
    }),
  ],
})
class AppModule {}
`.trim();

const controllerExample = `
// app.controller.ts

import { UseGoogleAuth } from '@nestjs-hybrid-auth/google';

@Controller
class AuthController {
  @UseGoogleAuth()
  @Get('auth/google')
  googleLogin() {}

  @UseGoogleAuth()
  @Get('auth/google-callback')
  googleLoginCallback(req: Request) {
    console.log(req.hybridAuthResult.user | accessToken | refreshToken);
  }
}
`.trim();

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div className={styles.hero}>
      <div className={styles.heroInner}>
        <h1 className={styles.heroProjectTagline}>
          <img
            alt="NestJS Hybrid Auth Banner"
            className={styles.heroLogo}
            src={useBaseUrl('img/nestjs-hybrid-auth.png')}
          />
          <span
            className={styles.heroTitleTextHtml}
            dangerouslySetInnerHTML={{
              __html: translate({
                id: 'homepage.hero.title',
                message:
                  'Integrate <b>Social Login</b> into your NestJS app <b>seamlessly</b>.',
                description:
                  'Home page hero title, can contain simple html tags',
              }),
            }}
          />
        </h1>
        <div className={styles.indexCtas}>
          <Link
            className={styles.indexCtasGetStartedButton}
            to={useBaseUrl('docs/introduction/getting-started')}
          >
            <Translate>Get Started</Translate>
          </Link>
          <Link
            className={clsx('margin-left--md', styles.indexTryMeButton)}
            to="https://github.com/mjangir/nestjs-hybrid-auth"
          >
            <Translate>Github</Translate>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} Documentation`}
      description="Integrate social login into your nestjs application"
    >
      <HomepageHeader />
      <main>
        <div className={styles.customCodeContainer}>
          <CodeBlock className="language-jsx">{moduleExample}</CodeBlock>
          <CodeBlock className="language-jsx">{controllerExample}</CodeBlock>
        </div>

        <HomepageFeatures />
      </main>
    </Layout>
  );
}
