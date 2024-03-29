import logoKU from '@/images/logos/ku.png';
import logoSW from '@/images/logos/sw.png';
import logoCerner from '@/images/logos/cerner.png';
import logoCRL from '@/images/logos/crl.png';
import logoJJ from '@/images/logos/jj.png';

const RESUME = [
  {
    company: 'University of Kansas',
    title: 'Fullstack Contract Work',
    logo: logoKU,
    start: new Date('2022-12-19'),
    end: new Date(),
    description: (
      <>
        <li>
          Building web applications from scratch using React with typescript on
          the frontend and leveraging AWS lambda functions written in typescript
          and a Postgres database on the backend.
        </li>
        <li>
          Built an SSO auth solution for multiple applications handling routing,
          permissions, cookie and token handling etc.
        </li>
        <li>Mentoring junior devs.</li>
      </>
    ),
  },
  {
    company: 'Smart Warehousing',
    title: 'Senior Software Engineer',
    logo: logoSW,
    // iso 8601 date format
    start: new Date('2021-09-20'),
    end: new Date('2022-12-14'),
    description: (
      <>
        <li>
          Org-wide subject matter expert in micro-frontend architecture and
          frontend engineering in general.
        </li>

        <li>
          Lead many knowledge sharing events around frontend architectural
          decisions as well as best practices.
        </li>
        <li>
          Was consulted for input from design to backend to frontend to
          deployment.
        </li>
        <li>Responsible for mentoring junior engineers and interns.</li>
        <li>
          Lead the charge on building reusable component library for
          fast/consistent UI.
        </li>
        <li>
          Was main frontend engineer on my team building many micro-frontends
          for views and navigation elements.
        </li>
      </>
    ),
  },
  {
    company: 'Cerner',
    title: 'Software Engineer',
    logo: logoCerner,
    start: new Date('2018-05-01'),
    end: new Date('2021-09-17'),
    description: (
      <>
        <li>
          Experience in implementing ideas from start to finish. (designing to
          shipping code)
        </li>
        <li>
          Regression/Unit testing with jest and development cycle experience.
        </li>
        <li>
          Develop Javascript on the node.js platform as well as publishing and
          consuming through npm.
        </li>
        <li>
          Full stack experience with building React components and the Rails
          engines to consume/shape data for them.
        </li>
      </>
    ),
  },
  {
    company: 'CRL',
    title: 'Business Intelligence Developer',
    logo: logoCRL,
    start: new Date('2016-01-01'),
    end: new Date('2018-05-01'),
    description: (
      <>
        <li>
          Built dashboards and reports for clients using SQL, Tableau, python,
          and SSRS.
        </li>
        <li>
          Worked directly with upper management to gather requirements and
          deliver solutions.
        </li>
      </>
    ),
  },
];

export default RESUME;
