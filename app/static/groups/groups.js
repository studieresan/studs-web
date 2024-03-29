import leader1 from '../../static/img/people/studs2023/marcus.png'
import leader2 from '../../static/img/people/studs2023/daniel.png'
import travelImage from '../../static/img/people/studs2023/emmy.png'
import eventImage from '../../static/img/people/studs2023/hanna.png'
import itImage from '../../static/img/people/studs2023/gustav-e.png'
import financeImage from '../../static/img/people/studs2023/william-n.png'
import saleImage from '../../static/img/people/studs2023/tobias.png'
import infoImage from '../../static/img/people/studs2023/tania.png'

/*import leader1 from '../../static/img/profile-placeholder.png'
const leader2 = leader1
const travelImage = leader1
const eventImage = leader1
const itImage = leader1
const financeImage = leader1
const saleImage = leader1
const infoImage = leader1*/

//Groups and their responsible persons.
const projectManager1 = {
  name: 'Marcus Nordstedt',
  email: 'marcus@studs.se',
  image: leader1,
}

const projectManager2 = {
  name: 'Daniel Grünler',
  email: 'daniel-g@studs.se',
  image: leader2,
}

//The name and description for the groups can be found
//in the language json files
const it = {
  responsible: {
    firstName: 'Gustav',
    lastName: 'Ekner',
    email: 'gustav@studs.se',
    image: itImage,
  },
  languageID: 'static.groups.it',
}

const event = {
  responsible: {
    firstName: 'Hanna',
    lastName: 'Peters',
    email: 'hanna@studs.se',
    image: eventImage,
  },
  languageID: 'static.groups.event',
}

const finance = {
  responsible: {
    firstName: 'William',
    lastName: 'Nilsson',
    email: 'william@studs.se',
    image: financeImage,
  },
  languageID: 'static.groups.finance',
}

const info = {
  responsible: {
    firstName: 'Tania',
    lastName: 'Sayyah',
    email: 'tania@studs.se',
    image: infoImage,
  },
  languageID: 'static.groups.info',
}

const sales = {
  responsible: {
    firstName: 'Tobias',
    lastName: 'Vinsa',
    email: 'tobias-v@studs.se',
    image: saleImage,
  },
  languageID: 'static.groups.sales',
}

const travel = {
  responsible: {
    firstName: 'Emmy',
    lastName: 'Yin',
    email: 'emmy@studs.se',
    image: travelImage,
  },
  languageID: 'static.groups.travel',
}

export {
  projectManager1,
  projectManager2,
  it,
  event,
  finance,
  info,
  sales,
  travel,
}
