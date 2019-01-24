/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react')

const CompLibrary = require('../../core/CompLibrary')
const translate = require('../../server/translate.js').translate

const Container = CompLibrary.Container

const CWD = process.cwd()

const versions = require(`${CWD}/versions.json`)

function Versions(props) {
  const { config: siteConfig, language } = props
  const latestVersion = versions[0]
  const repoUrl = `https://github.com/${siteConfig.organizationName}/${siteConfig.projectName}`
  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer versionsContainer">
        <div className="post">
          <header className="postHeader">
            <h1>{siteConfig.title} Versions</h1>
          </header>
          <p>
            <translate>CITA adopted a time-based release cadence.</translate>
          </p>
          <ul>
            <li>
              <translate>
                To see what changes are coming and provide better feedback to CITA contributors, use the latest release
                candidate when possible.
              </translate>
            </li>
            <li>
              <translate>In production environment, we highly recommend to use stable version.</translate>
            </li>
          </ul>
          <p>
            <translate>
              Please be notice, the version number of toolchains may not consistent with CITA, since they are separate
              program. But in documents，we present CITA and its corresponding toolchain as a usable whole set，so don't
              worry about the version confusion.
            </translate>
          </p>
          <h3 id="latest">Latest</h3>
          <table className="versions">
            <tbody>
              <tr>
                <th>{/*latestVersion*/}Develop</th>
                <td>
                  <a href={`${siteConfig.baseUrl + siteConfig.docsUrl}${language}/welcome`}>Documentation</a>
                </td>
                <td>
                  <a href="https://github.com/cryptape/cita/compare/develop...master" alt="compare" target="_blank">
                    Commits since version {versions[1]}
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <h3 id="archive">Stable Versions</h3>
          <table className="versions">
            <tbody>
              {versions.map(
                version =>
                  version !== latestVersion && (
                    <tr>
                      <th>{version}</th>
                      <td>
                        <a href={`${siteConfig.baseUrl + siteConfig.docsUrl}${language}/${version}/welcome`}>
                          Documentation
                        </a>
                      </td>
                      <td>
                        <a href={`https://github.com/cryptape/cita/tree/${version}`} alt="Release Note" target="_blank">
                          Release Note
                        </a>
                      </td>
                    </tr>
                  ),
              )}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  )
}

module.exports = Versions
