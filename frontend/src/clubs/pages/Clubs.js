import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ClubsList from '../components/ClubsList';
import { leagues } from '../../leagues/pages/Leagues';

import ManchesterCityImg from '../../images/clubs/Manchester_City_FC.png';

export const clubs = [
  { id: 'c1', name: 'Arsenal', image: ManchesterCityImg, leagueId: 'l1' },
  { id: 'c2', name: 'Aston Villa', image: ManchesterCityImg, leagueId: 'l1' },
  { id: 'c3', name: 'Brentford', image: ManchesterCityImg, leagueId: 'l1' },
  { id: 'c4', name: 'Brighton & Hove Albion', img: ManchesterCityImg, leagueId: 'l1' },
  { id: 'c5', name: 'Burnley', image: ManchesterCityImg, leagueId: 'l1' },
  { id: 'c6', name: 'Chelsea', image: ManchesterCityImg, leagueId: 'l1' },
  { id: 'c7', name: 'Crystal Palace', image: ManchesterCityImg, leagueId: 'l1' },
  { id: 'c8', name: 'Everton', image: ManchesterCityImg, leagueId: 'l1' },
  { id: 'c9', name: 'Leeds United', image: ManchesterCityImg, leagueId: 'l1' },
  { id: 'c10', name: 'Leicester City', image: ManchesterCityImg, leagueId: 'l1' },
  { id: 'c11', name: 'Liverpool', image: ManchesterCityImg, leagueId: 'l1' },
  { id: 'c12', name: 'Manchester City', image: ManchesterCityImg, leagueId: 'l1' },
  { id: 'c13', name: 'Manchester United', image: ManchesterCityImg, leagueId: 'l1' },
  { id: 'c14', name: 'Newcastle United', image: ManchesterCityImg, leagueId: 'l1' },
  { id: 'c15', name: 'Norwich City', image: ManchesterCityImg, leagueId: 'l1' },
  { id: 'c16', name: 'Southampton', image: ManchesterCityImg, leagueId: 'l1' },
  { id: 'c17', name: 'Tottenham Hotspur', image: ManchesterCityImg, leagueId: 'l1' },
  { id: 'c18', name: 'Watford', image: ManchesterCityImg, leagueId: 'l1' },
  { id: 'c19', name: 'West Ham United', image: ManchesterCityImg, leagueId: 'l1' },
  { id: 'c20', name: 'Wolverhampton Wanderers', image: ManchesterCityImg, leagueId: 'l1' },
  { id: 'c21', name: 'Atlético Mineiro', leagueId: 'l2' },
  { id: 'c22', name: 'Bahia', leagueId: 'l2' },
  { id: 'c23', name: 'Ceará', leagueId: 'l2' },
  { id: 'c24', name: 'Chapecoense', leagueId: 'l2' },
  { id: 'c25', name: 'Corinthians', leagueId: 'l2' },
  { id: 'c26', name: 'Cuiabá', leagueId: 'l2' },
  { id: 'c27', name: 'Flamengo', leagueId: 'l2' },
  { id: 'c28', name: 'Fluminense', leagueId: 'l2' },
  { id: 'c29', name: 'Fortaleza', leagueId: 'l2' },
  { id: 'c30', name: 'Grêmio', leagueId: 'l2' },
  { id: 'c31', name: 'Internacional', leagueId: 'l2' },
  { id: 'c32', name: 'Juventude', leagueId: 'l2' },
  { id: 'c33', name: 'Palmeiras', leagueId: 'l2' },
  { id: 'c34', name: 'Santos', leagueId: 'l2' },
  { id: 'c35', name: 'São Paulo', leagueId: 'l2' },
  { id: 'c36', name: 'Sport Recife', leagueId: 'l2' },
  { id: 'c37', name: 'AC Milan', leagueId: 'l3' },
  { id: 'c38', name: 'AS Roma', leagueId: 'l3' },
  { id: 'c39', name: 'Atalanta', leagueId: 'l3' },
  { id: 'c40', name: 'Bologna', leagueId: 'l3' },
  { id: 'c41', name: 'Cagliari', leagueId: 'l3' },
  { id: 'c42', name: 'Empoli', leagueId: 'l3' },
  { id: 'c43', name: 'Fiorentina', leagueId: 'l3' },
  { id: 'c44', name: 'Genoa', leagueId: 'l3' },
  { id: 'c45', name: 'Hellas Verona', leagueId: 'l3' },
  { id: 'c46', name: 'Inter Milan', leagueId: 'l3' },
  { id: 'c47', name: 'Juventus', leagueId: 'l3' },
  { id: 'c48', name: 'Lazio', leagueId: 'l3' },
  { id: 'c49', name: 'Napoli', leagueId: 'l3' },
  { id: 'c50', name: 'Sampdoria', leagueId: 'l3' },
  { id: 'c51', name: 'Sassuolo', leagueId: 'l3' },
  { id: 'c52', name: 'Spezia', leagueId: 'l3' },
  { id: 'c53', name: 'Torino', leagueId: 'l3' },
  { id: 'c54', name: 'Udinese', leagueId: 'l3' },
  { id: 'c55', name: 'Venezia', leagueId: 'l3' },
  { id: 'c56', name: 'Salernitana', leagueId: 'l3' },
  { id: 'c57', name: 'Angers', leagueId: 'l4' },
  { id: 'c58', name: 'AS Monaco', leagueId: 'l4' },
  { id: 'c59', name: 'Bordeaux', leagueId: 'l4' },
  { id: 'c60', name: 'Brest', leagueId: 'l4' },
  { id: 'c61', name: 'Clermont Foot', leagueId: 'l4' },
  { id: 'c62', name: 'Lille', leagueId: 'l4' },
  { id: 'c63', name: 'Lorient', leagueId: 'l4' },
  { id: 'c64', name: 'Lyon', leagueId: 'l4' },
  { id: 'c65', name: 'Marseille', leagueId: 'l4' },
  { id: 'c66', name: 'Metz', leagueId: 'l4' },
  { id: 'c67', name: 'Montpellier', leagueId: 'l4' },
  { id: 'c68', name: 'Nantes', leagueId: 'l4' },
  { id: 'c69', name: 'Nice', leagueId: 'l4' },
  { id: 'c70', name: 'Paris Saint-Germain', leagueId: 'l4' },
  { id: 'c71', name: 'Rennes', leagueId: 'l4' },
  { id: 'c72', name: 'Saint-Étienne', leagueId: 'l4' },
  { id: 'c73', name: 'Strasbourg', leagueId: 'l4' },
  { id: 'c74', name: 'Troyes', leagueId: 'l4' },
  { id: 'c75', name: 'Lens', leagueId: 'l4' },
  { id: 'c76', name: 'Reims', leagueId: 'l4' },
  { id: 'c77', name: 'Ajax', leagueId: 'l5' },
  { id: 'c78', name: 'AZ Alkmaar', leagueId: 'l5' },
  { id: 'c79', name: 'Cambuur', leagueId: 'l5' },
  { id: 'c80', name: 'FC Emmen', leagueId: 'l5' },
  { id: 'c81', name: 'FC Groningen', leagueId: 'l5' },
  { id: 'c82', name: 'FC Twente', leagueId: 'l5' },
  { id: 'c83', name: 'Feyenoord', leagueId: 'l5' },
  { id: 'c84', name: 'Fortuna Sittard', leagueId: 'l5' },
  { id: 'c85', name: 'Go Ahead Eagles', leagueId: 'l5' },
  { id: 'c86', name: 'Heracles Almelo', leagueId: 'l5' },
  { id: 'c87', name: 'NEC Nijmegen', leagueId: 'l5' },
  { id: 'c88', name: 'PEC Zwolle', leagueId: 'l5' },
  { id: 'c89', name: 'PSV Eindhoven', leagueId: 'l5' },
  { id: 'c90', name: 'RKC Waalwijk', leagueId: 'l5' },
  { id: 'c91', name: 'SC Heerenveen', leagueId: 'l5' },
  { id: 'c92', name: 'Sparta Rotterdam', leagueId: 'l5' },
  { id: 'c93', name: 'Utrecht', leagueId: 'l5' },
  { id: 'c94', name: 'Vitesse', leagueId: 'l5' },
  { id: 'c95', name: 'VVV-Venlo', leagueId: 'l5' },
  { id: 'c96', name: 'Willem II', leagueId: 'l5' },
  { id: 'c97', name: 'Alavés', leagueId: 'l6' },
  { id: 'c98', name: 'Athletic Bilbao', leagueId: 'l6' },
  { id: 'c99', name: 'Atlético Madrid', leagueId: 'l6' },
  { id: 'c100', name: 'Barcelona', leagueId: 'l6' },
  { id: 'c101', name: 'Cádiz', leagueId: 'l6' },
  { id: 'c102', name: 'Celta Vigo', leagueId: 'l6' },
  { id: 'c103', name: 'Elche', leagueId: 'l6' },
  { id: 'c104', name: 'Espanyol', leagueId: 'l6' },
  { id: 'c105', name: 'Getafe', leagueId: 'l6' },
  { id: 'c106', name: 'Granada', leagueId: 'l6' },
  { id: 'c107', name: 'Levante', leagueId: 'l6' },
  { id: 'c108', name: 'Mallorca', leagueId: 'l6' },
  { id: 'c109', name: 'Osasuna', leagueId: 'l6' },
  { id: 'c110', name: 'Rayo Vallecano', leagueId: 'l6' },
  { id: 'c111', name: 'Real Betis', leagueId: 'l6' },
  { id: 'c112', name: 'Real Madrid', leagueId: 'l6' },
  { id: 'c113', name: 'Real Sociedad', leagueId: 'l6' },
  { id: 'c114', name: 'Sevilla', leagueId: 'l6' },
  { id: 'c115', name: 'Valencia', leagueId: 'l6' },
  { id: 'c116', name: 'Villarreal', leagueId: 'l6' },
  { id: 'c117', name: 'Belenenses SAD', leagueId: 'l7' },
  { id: 'c118', name: 'Boavista', leagueId: 'l7' },
  { id: 'c119', name: 'Braga', leagueId: 'l7' },
  { id: 'c120', name: 'Estoril', leagueId: 'l7' },
  { id: 'c121', name: 'Famalicão', leagueId: 'l7' },
  { id: 'c122', name: 'Gil Vicente', leagueId: 'l7' },
  { id: 'c123', name: 'Marítimo', leagueId: 'l7' },
  { id: 'c124', name: 'Moreirense', leagueId: 'l7' },
  { id: 'c125', name: 'Paços de Ferreira', leagueId: 'l7' },
  { id: 'c126', name: 'Portimonense', leagueId: 'l7' },
  { id: 'c127', name: 'Porto', leagueId: 'l7' },
  { id: 'c128', name: 'Santa Clara', leagueId: 'l7' },
  { id: 'c129', name: 'Sporting CP', leagueId: 'l7' },
  { id: 'c130', name: 'Tondela', leagueId: 'l7' },
  { id: 'c131', name: 'Vitória Guimarães', leagueId: 'l7' },
  { id: 'c132', name: 'Vitória SC', leagueId: 'l7' },
];

const Clubs = () => {

  const navigate = useNavigate();

  const { club } = useParams();

  const isValidClub = clubs.some(clubItem => clubItem.name.toLowerCase().replace(/\s+/g, '-') === club);

  if (!isValidClub) {
    navigate('/');
    return null;
  }

  return (
    <div>
      <ClubsList clubs={clubs} leagues={leagues} />
    </div>
  );
};

export default Clubs;

/*  return (
    <div>
      <Routes>
        <Route path="/" element={<ClubsList clubs={clubs} />} />
        <Route path=":clubId" element={<ClubDetail clubs={clubs} />} />
      </Routes>
    </div>
  );*/
