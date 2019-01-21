const React = require('react')

const CompLibrary = require('../../core/CompLibrary.js')
const translate = require('../../server/translate.js').translate

const { Container, MarkdownBlock } = CompLibrary

const Community = () => (
  <Container padding={['all']}>
    <p>
      <translate>We aim to build a closed - loop community to connect operators, developers and users.</translate>
    </p>
    <h1>
      <translate>Where to get help</translate>
    </h1>
    <p>
      <translate>
        If you need help with CITA, the right place to go depends on the type of help that you need.
      </translate>
    </p>

    <h2>
      <translate>For technical problem:</translate>
    </h2>

    <p>
      <a href="https://talks.citahub.com/" alt="CITAHub Talk">
        <translate>talks.citahub.com</translate>
      </a>{' '}
      <translate>
        would be a perfect place to get help, no matter having a code-level questions or being stuck with a specific
        error.{' '}
      </translate>
    </p>

    <h2>
      <translate>Looking for the solution for your organization</translate>
    </h2>

    <p>
      <translate>Please make a apply to join</translate>
      <a href="https://www.citahub.com/#/Our" alt="Our Community">
        <translate>our community</translate>
      </a>
    </p>

    <p>
      <translate>
        Our team can offer dedicated support technicians to assist you in developing with CITA stack.What can we do for
        you ?
      </translate>
    </p>

    <ul>
      <li>
        <translate>
          Advisory services: Tap into our extensive experience(Coming soon) in blockchain architecture and ensure you
          make the right decisions.
        </translate>
      </li>

      <li>
        <translate>
          Customizable features: By configuring and customizing the services, CITA can meet all the needs of
          enterprise.No matter which of blockchain network you choose to build, we make sure to offer you the right set
          of features.
        </translate>
      </li>
    </ul>

    <h1>
      <translate>How to contribute</translate>
    </h1>

    <p>
      <translate>Read </translate>
      <a href="https://github.com/cryptape/cita/blob/develop/CONTRIBUTING.md" alt="Contributing">
        <translate>contributing.md</translate>
      </a>{' '}
      <translate>for the first.</translate>
    </p>

    <p>
      <translate>
        Please keep in mind nor is code the only way to contribute to the project, we strongly value documentation and
        gladly accept improvements to the documentation.
      </translate>
    </p>

    <p>
      <translate>Generally, CITA uses:</translate>
    </p>

    <ul>
      <li>
        <translate>CITA improvement proposal for planning major changes</translate>
      </li>

      <li>
        <translate>
          Github issue and Github Project to create, organize and track logical issues, including bugs and improvement
        </translate>
      </li>
      <li>
        <translate>docs.citahub.com for documentation</translate>
      </li>
      <li>
        <translate>Github pull requests to manage the review and merge of specific code or docs changes</translate>
      </li>
    </ul>

    <p>
      <translate>
        That is, Github issue and CIP are used to describe what should be fixed or changed, and high - level approaches,
        and pull requests describe how to implement that change in the project 's source code.
      </translate>
    </p>

    <p>
      <translate>If you want to join our core team, please apply in</translate>{' '}
      <a href="https://www.citahub.com/#/">
        <translate>CITAHub</translate>
      </a>
    </p>

    <h1>
      <translate>Staying up to date</translate>
    </h1>

    <h2>
      <translate>official channel</translate>
    </h2>

    <p>
      <translate>Coming soon</translate>
    </p>

    <h2>
      <translate>CIPs and RFCs</translate>
    </h2>

    <p>
      <translate>Coming soon</translate>
    </p>

    <h2>
      <translate>Rocking in Community</translate>
    </h2>

    <h3>
      <translate>Forum</translate>
    </h3>

    <p>
      <translate>
        talks.citahub.com Feel free to share articles and tutorials as well as start discussions about all kinds of hot
        topics about blockchain.
      </translate>
    </p>

    <h3>
      <translate>Meetups</translate>
    </h3>

    <p>
      <translate>Coming soon</translate>
    </p>

    <h2>
      <translate>Training</translate>
    </h2>

    <p>
      <translate>Check our past </translate>
      <a href="https://mp.weixin.qq.com/s/9o2sq9YqUuXLYaHE7tv1Ng" alt="Training Activity">
        <translate>Training activity</translate>
      </a>
      .
    </p>
  </Container>
)

module.exports = Community
