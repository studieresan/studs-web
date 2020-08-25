import leader1 from 'static/img/people/leader1.jpg'
import leader2 from 'static/img/people/leader2.jpg'
import travelImage from 'static/img/people/travel.jpg'
import eventImage from 'static/img/people/event.jpg'
import itImage from 'static/img/people/it.jpg'
import financeImage from 'static/img/people/finance.jpg'
import saleImage from 'static/img/people/sale.jpg'
import infoImage from 'static/img/people/info.jpg'
import messages from './messages.js'

//Groups and their responsible persons.
const projectManager1 = {
  name: 'Albin Winkelmann',
  email: 'albin@studs.se',
  image: leader1,
}

const projectManager2 = {
  name: 'Axel Lindeberg',
  email: 'axel@studs.se',
  image: leader2,
}

//The name and description for the groups can be found
//in the language json files
const it = {
  responsible: {
    firstName: 'Glenn',
    lastName: 'Olsson',
    email: 'glenn@studs.se',
    image: itImage,
  },
  languageID: 'static.groups.it',
}

const event = {
  responsible: {
    firstName: 'Lisa',
    lastName: 'Tran',
    email: 'lisa@studs.se',
    image: eventImage,
  },
  languageID: 'static.groups.event',
}

const finance = {
  responsible: {
    firstName: 'Bella',
    lastName: 'Tapper',
    email: 'bella@studs.se',
    image: financeImage,
  },
  languageID: 'static.groups.finance',
}

const info = {
  responsible: {
    firstName: 'Per',
    lastName: 'Fahlander',
    email: 'per@studs.se',
    image: infoImage,
  },
  languageID: 'static.groups.info',
}

const sales = {
  responsible: {
    firstName: 'Andreas',
    lastName: 'Wallström',
    email: 'andreas@studs.se',
    image: saleImage,
  },
  languageID: 'static.groups.sales',
}

const travel = {
  responsible: {
    firstName: 'Louise',
    lastName: 'Hellberg',
    email: 'lousie@studs.se',
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
