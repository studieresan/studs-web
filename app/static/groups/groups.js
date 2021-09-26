// import leader1 from 'static/img/people/leader1.jpg'
// import leader2 from 'static/img/people/leader2.jpg'
// import travelImage from 'static/img/people/travel.jpg'
// import eventImage from 'static/img/people/event.jpg'
// import itImage from 'static/img/people/it.jpg'
// import financeImage from 'static/img/people/finance.jpg'
// import saleImage from 'static/img/people/sales.jpg'
// import infoImage from 'static/img/people/info.jpg'

import leader1 from 'static/img/people/studs2022/proj_mel.jpg'
import leader2 from 'static/img/people/studs2022/proj_isa.jpg'
import travelImage from 'static/img/people/studs2022/travel.jpg'
import eventImage from 'static/img/people/studs2022/event.jpg'
import itImage from 'static/img/people/studs2022/it.jpg'
import financeImage from 'static/img/people/studs2022/finance.jpg'
import saleImage from 'static/img/people/studs2022/sales.jpg'
import infoImage from 'static/img/people/studs2022/info.jpg'

//Groups and their responsible persons.
const projectManager1 = {
  name: 'Melvin Lundkvist',
  email: 'melvin@studs.se',
  image: leader1,
}

const projectManager2 = {
  name: 'Isabel Redtzer',
  email: 'isabel@studs.se',
  image: leader2,
}

//The name and description for the groups can be found
//in the language json files
const it = {
  responsible: {
    firstName: 'Artin',
    lastName: 'Mirzaian',
    email: 'artin@studs.se',
    image: itImage,
  },
  languageID: 'static.groups.it',
}

const event = {
  responsible: {
    firstName: 'Emelie',
    lastName: 'Lindborg',
    email: 'emelie@studs.se',
    image: eventImage,
  },
  languageID: 'static.groups.event',
}

const finance = {
  responsible: {
    firstName: 'Simon',
    lastName: 'Osnes',
    email: 'simon@studs.se',
    image: financeImage,
  },
  languageID: 'static.groups.finance',
}

const info = {
  responsible: {
    firstName: 'Eva',
    lastName: 'Despinoy',
    email: 'eva@studs.se',
    image: infoImage,
  },
  languageID: 'static.groups.info',
}

const sales = {
  responsible: {
    firstName: 'Julia',
    lastName: 'Byström',
    email: 'julia@studs.se',
    image: saleImage,
  },
  languageID: 'static.groups.sales',
}

const travel = {
  responsible: {
    firstName: 'Vilma',
    lastName: 'Javala',
    email: 'vilma@studs.se',
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
