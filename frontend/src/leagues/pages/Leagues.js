import React from 'react';
import LeaguesList from '../components/LeaguesList';
import Brazil from '../../images/Flag_of_Brazil.svg.png';
import England from '../../images/Flag_of_England.svg.png';
import Italy from '../../images/Flag_of_Italy.svg.png';
import France from '../../images/Flag_of_France.svg.png';
import Netherlands from '../../images/Flag_of_Netherlands.svg.png';
import Spain from '../../images/Flag_of_Spain.svg.png';
import Portugal from '../../images/Flag_of_Portugal.svg.png';
import LeaguesTables from '../components/LeaguesTables';
import { Link } from 'react-router-dom';
import './Leagues.css';

const Leagues = () => {
  const leagues = [
    {
      id: 'l1',
      name: 'brazil',
      title: 'brazilian-a-series',
      image: Brazil,
      clubs: [
        'Atlético Mineiro',
        'Bahia',
        'Ceará',
        'Chapecoense',
        'Corinthians',
        'Cuiabá',
        'Flamengo',
        'Fluminense',
        'Fortaleza',
        'Grêmio',
        'Internacional',
        'Juventude',
        'Palmeiras',
        'Santos',
        'São Paulo',
        'Sport Recife',
      ],
    },
    {
      id: 'l2',
      name: 'england',
      title: 'premier-league',
      image: England,
      clubs: [
        'Arsenal',
        'Aston Villa',
        'Brentford',
        'Brighton & Hove Albion',
        'Burnley',
        'Chelsea',
        'Crystal Palace',
        'Everton',
        'Leeds United',
        'Leicester City',
        'Liverpool',
        'Manchester City',
        'Manchester United',
        'Newcastle United',
        'Norwich City',
        'Southampton',
        'Tottenham Hotspur',
        'Watford',
        'West Ham United',
        'Wolverhampton Wanderers',
      ],
    },
    {
      id: 'l3',
      name: 'italy',
      title: 'seria-a',
      image: Italy,
      clubs: [
        'AC Milan',
        'AS Roma',
        'Atalanta',
        'Bologna',
        'Cagliari',
        'Empoli',
        'Fiorentina',
        'Genoa',
        'Hellas Verona',
        'Inter Milan',
        'Juventus',
        'Lazio',
        'Napoli',
        'Sampdoria',
        'Sassuolo',
        'Spezia',
        'Torino',
        'Udinese',
        'Venezia',
        'Salernitana',
      ],
    },
    {
      id: 'l4',
      name: 'france',
      title: 'ligue-1',
      image: France,
      clubs: [
        'Angers',
        'AS Monaco',
        'Bordeaux',
        'Brest',
        'Clermont Foot',
        'Lille',
        'Lorient',
        'Lyon',
        'Marseille',
        'Metz',
        'Montpellier',
        'Nantes',
        'Nice',
        'Paris Saint-Germain',
        'Rennes',
        'Saint-Étienne',
        'Strasbourg',
        'Troyes',
        'Lens',
        'Reims',
      ],
    },
    {
      id: 'l5',
      name: 'netherlands',
      title: 'eredivisie',
      image: Netherlands,
      clubs: [
        'Ajax',
        'AZ Alkmaar',
        'Cambuur',
        'FC Emmen',
        'FC Groningen',
        'FC Twente',
        'Feyenoord',
        'Fortuna Sittard',
        'Go Ahead Eagles',
        'Heracles Almelo',
        'NEC Nijmegen',
        'PEC Zwolle',
        'PSV Eindhoven',
        'RKC Waalwijk',
        'SC Heerenveen',
        'Sparta Rotterdam',
        'Utrecht',
        'Vitesse',
        'VVV-Venlo',
        'Willem II',
      ],
    },
    {
      id: 'l6',
      name: 'spain',
      title: 'primera-division',
      image: Spain,
      clubs: [
        'Alavés',
        'Athletic Bilbao',
        'Atlético Madrid',
        'Barcelona',
        'Cádiz',
        'Celta Vigo',
        'Elche',
        'Espanyol',
        'Getafe',
        'Granada',
        'Levante',
        'Mallorca',
        'Osasuna',
        'Rayo Vallecano',
        'Real Betis',
        'Real Madrid',
        'Real Sociedad',
        'Sevilla',
        'Valencia',
        'Villarreal',
      ],
    },
    {
      id: 'l7',
      name: 'portugal',
      title: 'primeira-liga',
      image: Portugal,
      clubs: [
        'Belenenses SAD',
        'Boavista',
        'Braga',
        'Estoril',
        'Famalicão',
        'Gil Vicente',
        'Marítimo',
        'Moreirense',
        'Paços de Ferreira',
        'Portimonense',
        'Porto',
        'Santa Clara',
        'Sporting CP',
        'Tondela',
        'Vitória Guimarães',
        'Vitória SC',
      ],
    },
  ];

  return (
    <div className='leagues-container'>
      <LeaguesList items={leagues} />
      <LeaguesTables items={leagues} />
      {/*leagues.map(league => (*/}
        
     {/* ))} */}
    </div>
  );
};

export default Leagues;
