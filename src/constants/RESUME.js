import logoKU from '@/images/logos/ku.png'
import logoSW from '@/images/logos/sw.png'
import logoCerner from '@/images/logos/cerner.png'
import logoCRL from '@/images/logos/crl.png'
import logoJJ from '@/images/logos/jj.png'

const RESUME = [
  {
    company: 'University of Kansas',
    title: 'Fullstack Contract Work',
    logo: logoKU,
    start: '2021',
    end: {
      label: 'Present',
      dateTime: new Date().getFullYear(),
    },
  },
  {
    company: 'Smart Warehousing',
    title: 'Senior Software Engineer',
    logo: logoSW,
    start: '2021',
    end: '2022',
  },
  {
    company: 'Cerner',
    title: 'Software Engineer',
    logo: logoCerner,
    start: '2018',
    end: '2021',
  },
  {
    company: 'CRL',
    title: 'Business Intelligence Developer',
    logo: logoCRL,
    start: '2016',
    end: '2018',
  },
  {
    company: "Jimmy John's",
    title: 'Artisanal Sandwich Transporter',
    logo: logoJJ,
    start: '2012',
    end: '2016',
  },
]

export default RESUME
