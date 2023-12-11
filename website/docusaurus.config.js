const lightCodeTheme = require('prism-react-renderer/themes/nightOwl');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(
  module.exports = {
    title: 'NestJS Hybrid Auth',
    tagline: 'Integrate social logins in your NestJS application seamlessly',
    url: 'https://mjangir.github.io/nestjs-hybrid-auth',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'mjangir', // Usually your GitHub org/user name.
    projectName: 'nestjs-hybrid-auth', // Usually your repo name.

    presets: [
      [
        '@docusaurus/preset-classic',
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            sidebarCollapsible: false,
            sidebarPath: require.resolve('./sidebars.js'),
            // Please change this to your repo.
            editUrl:
              'https://github.com/mjangir/nestjs-hybrid-auth/blob/main/website/',
          },
          theme: {
            customCss: require.resolve('./src/css/custom.css'),
          },
        }),
      ],
    ],

    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        announcementBar: {
          id: 'github-star',
          content:
            'If you like NestJS Hybrid Auth, <a target="_blank" rel="noopener noreferrer" href="https://github.com/mjangir/nestjs-hybrid-auth">give me a star on GitHub</a>! ⭐️',
          backgroundColor: 'var(--ifm-color-primary)',
          textColor: '#FFF',
          isCloseable: false,
        },
        navbar: {
          title: 'NestJS Hybrid Auth',
          logo: {
            alt: 'NestJS Hybrid Auth',
            src: 'img/logo.svg',
          },
          items: [
            {
              type: 'doc',
              docId: 'introduction/getting-started',
              position: 'left',
              label: 'Docs',
            },
            {
              href: 'https://github.com/mjangir/nestjs-hybrid-auth',
              label: 'GitHub',
              position: 'right',
            },
          ],
        },
        footer: {
          style: 'dark',
          links: [
            {
              title: 'Docs',
              items: [
                {
                  label: 'Getting Started',
                  to: '/docs/introduction/getting-started',
                },
                {
                  label: 'How To Use',
                  to: '/docs/introduction/how-to-use',
                },
              ],
            },
            {
              title: 'Community',
              items: [
                {
                  label: 'Stack Overflow',
                  href: 'https://stackoverflow.com/users/1029506/manish-jangir',
                },
                {
                  label: 'Discord',
                  href: 'https://discord.gg/w2xmTsxr',
                },
                {
                  label: 'Twitter',
                  href: 'https://twitter.com/mjangir70',
                },
              ],
            },
            {
              title: 'More',
              items: [
                {
                  label: 'GitHub',
                  href: 'https://github.com/mjangir/nestjs-hybrid-auth',
                },
              ],
            },
          ],
          copyright: `Copyright © ${new Date().getFullYear()} Manish Jangir Open Source.`,
        },
        prism: {
          theme: lightCodeTheme,
          darkTheme: darkCodeTheme,
        },
      }),
  }
);
