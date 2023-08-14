import React, {useState, useEffect} from 'react';
import LeaguesList from '../components/LeaguesList';
import axios from 'axios';
import Brazil from '../../images/countries/Flag_of_Brazil.svg.png';
import England from '../../images/countries/Flag_of_England.svg.png';
import Italy from '../../images/countries/Flag_of_Italy.svg.png';
import France from '../../images/countries/Flag_of_France.svg.png';
import Netherlands from '../../images/countries/Flag_of_Netherlands.svg.png';
import Spain from '../../images/countries/Flag_of_Spain.svg.png';
import Portugal from '../../images/countries/Flag_of_Portugal.svg.png';
import LeaguesTables from '../components/LeaguesTables';

export const leagues = [
  {
    id: 'l1',
    name: 'england',
    title: 'premier-league',
    image: England,
  },
  {
    id: 'l2',
    name: 'brazil',
    title: 'brazilian-a-series',
    image: Brazil,
  },
  {
    id: 'l3',
    name: 'italy',
    title: 'seria-a',
    image: Italy,
  },
  {
    id: 'l4',
    name: 'france',
    title: 'ligue-1',
    image: France,
  },
  {
    id: 'l5',
    name: 'netherlands',
    title: 'eredivisie',
    image: Netherlands,
  },
  {
    id: 'l6',
    name: 'spain',
    title: 'primera-division',
    image: Spain,
  },
  {
    id: 'l7',
    name: 'portugal',
    title: 'primeira-liga',
    image: Portugal,
  },
];

const Leagues = () => {
  return (
    <div className='leagues-container'>
      <LeaguesList items={leagues} />
      <LeaguesTables items={leagues} />
    </div>
  );
};

export default Leagues;
