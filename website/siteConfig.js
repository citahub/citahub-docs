/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

const baseUrl = '/'

const siteConfig = {
  title: 'CITAHub Docs',
  tagline: 'Documents of CITAHub',
  url: 'https://docs.citahub.com/',
  baseUrl,
  customDocsPath: 'docs/',
  docsUrl: '',
  cname: 'docs.citahub.com',
  projectName: 'citahub-docs',
  organizationName: 'citahub',
  editUrl: 'https://github.com/citahub/edit/master/docs/',
  headerLinks: [{
      page: 'community',
      label: 'Community',
    },
    {
      search: true,
    },
    {
      language: true,
    },
    {
      href: "https://github.com/citahub/citahub-docs",
      label: "GitHub"
    },
  ],
  headerIcon: 'img/citahub_logo.svg',
  footerIcon: 'img/citahub_logo.svg',
  favicon: 'img/citahub_logo.png',
  colors: {
    primaryColor: '#231719',
    secondaryColor: '#595656',
  },
  translationRecruitingLink: 'https://crowdin.com/project/citahub-docs',
  copyright: `Copyright © ${new Date().getFullYear()} Your Name or Your Company Name`,
  highlight: {
    theme: 'default',
  },

  scripts: [baseUrl + 'javascript/index.js'],
  onPageNav: 'separate',
  docsSideNavCollapsible: true,
  cleanUrl: true,
  ogImage: 'img/docusaurus.png',
  twitterImage: 'img/docusaurus.png',
  scrollToTop: true,
  algolia: {
    apiKey: "54b71429d181fd36fdc0781f1fda5e53",
    indexName: "citahub",
    placeholder: 'Search',
    algoliaOptions: {
      facetFilters: ["language:LANGUAGE", "version:VERSION"]
    }
  },
}

module.exports = siteConfig
