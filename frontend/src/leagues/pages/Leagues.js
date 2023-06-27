import React from 'react';
import LeaguesList from '../components/LeaguesList';
import Brazil from '../../images/Flag_of_Brazil.svg.png' 
import England from '../../images/Flag_of_England.svg.png';
import Italy from '../../images/Flag_of_Italy.svg.png';
import France from '../../images/Flag_of_France.svg.png';
import Netherlands from '../../images/Flag_of_Netherlands.svg.png';
import Spain from '../../images/Flag_of_Spain.svg.png';
import Portugal from '../../images/Flag_of_Portugal.svg.png';

const Leagues = () => {
    
   const leagues = [
      {
        id: 'l1',
        name: 'brazil',
        title: 'brazilian-a-series',
        image: Brazil,
      },
      {
        id: 'l2',
        name: 'england',
        title: 'premier-league',
        image: England,
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

    return <LeaguesList items={leagues}/>
}

export default Leagues;