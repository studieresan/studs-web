import leader1 from 'static/img/people/leader1.jpg'
import leader2 from 'static/img/people/leader2.jpg'
import travelImage from 'static/img/people/travel.jpg'
import eventImage from 'static/img/people/event.jpg'
import itImage from 'static/img/people/it.jpg'
import financeImage from 'static/img/people/finance.jpg'
import saleImage from 'static/img/people/sale.jpg'
import infoImage from 'static/img/people/info.jpg'

//Responsible people
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

const it = {
  responsible: {
    firstName: 'Glenn',
    lastName: 'Olsson',
    email: 'glenn@studs.se',
    image: itImage,
  },
  name: 'IT-gruppen',
  description:
    'IT-gruppen ansvarar för Studs webbsida, backend och de interna mobilapplikationerna som finns för både Android och iOS. Du bör ha ett intresse för programmering och mjukvaruutveckling samt viljan att lära dig nya saker. Det är ett plus om du har tidigare erfarenhet, men det är inget krav.',
}

const event = {
  responsible: {
    firstName: 'Lisa',
    lastName: 'Tran',
    email: 'lisa@studs.se',
    image: eventImage,
  },
  description:
    'Eventgruppen ansvarar för planerandet och genomförandet av alla företagsevent och arbetar tillsammans med företagen för att skapa evenemang som är relevanta, intressanta och roliga både för projektmedlemmarna och företagen. Gruppen hjälper företagen att visa sina bästa sidor och arbetet är därför kreativt då företagen skiljer sig mycket och kräver olika lösningar.',
}

const finance = {
  responsible: {
    firstName: 'Bella',
    lastName: 'Tapper',
    email: 'bella@studs.se',
    image: financeImage,
  },
  description:
    'Ekonomigruppen är liten grupp som jobbar nära varandra och projektledarna med att skapa projektets budget och se till att den efterföljs. Gruppen sköter även all bokföring och tillgodoser de andra gruppernas ekonomiska behov.',
}

const info = {
  responsible: {
    firstName: 'Per',
    lastName: 'Fahlander',
    email: 'per@studs.se',
    image: infoImage,
  },
  description:
    'Informationsgruppen består av fotografer, redaktörer och två art directors som tillsammans skapar allt innehåll och den grafiska profil som syns i våra olika kanaler samt i rapporten. Fotograferna tar porträttbilder av projektgruppen samt fotograferar alla event och resan. Redaktörerna producerar all text i sociala medier och rapporten. Gruppens art directors skapar den grafiska profilen och är ansvariga webb-, app- och UX-design. De ansvar också för rapportens layout.',
}

const sales = {
  responsible: {
    firstName: 'Andreas',
    lastName: 'Wallström',
    email: 'andreas@studs.se',
    image: saleImage,
  },
  description:
    'Medlemmarna i säljgruppen skapar den första kontakten mellan Studs och företag och säljer in event. Det är viktigt att du som medlem i säljgruppen är utåtriktad och social, och inte tappar glöden om du får ett nej. Säljgruppen jobbar nära flera andra grupper, framförallt eventgruppen som tar över när ett event har blivit bokat.',
}

const travel = {
  responsible: {
    firstName: 'Louise',
    lastName: 'Hellberg',
    email: 'lousie@studs.se',
    image: travelImage,
  },
  description:
    'Resegruppen ansvarar för all planering och genomförandet av resan som avslutar projektet, allt från resrutt och flyg till koordinering av dagsaktiviteter. Arbetet är både kreativt och strukturerat då resegruppen utöver planering och logistik också är ansvarig för att ta fram inspiration och förslag på resmål. Som medlem i resegruppen leder du hela projektgruppen under resan, ser till att alla har det bra och hanterar oförutsägbara situationer.',
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
