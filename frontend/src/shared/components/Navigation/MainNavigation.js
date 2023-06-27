import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import './MainNavigation.css';

const MainNavigation = props => {

  return (
    <React.Fragment>
      <MainHeader>
        <h1 className='main-navigation__title'>
          <Link to='/'>ScoreSphere</Link>
        </h1>
        <nav className='main-navigation__header-nav'>
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;


  /*return (
    <React.Fragment>
      {/*<MainHeader title={title}>
        <button className="man-button">
          <img src="man-icon.png" alt="Man" />
        </button>
        <button className="settings-button">Settings</button>
              </MainHeader>*/

//{
  /*<MainHeader>
        <h1 className='main-navigation__title'>
          <Link to='/'>ScoreSphere</Link>
        </h1>
        <nav className='main-navigation__header-nav'>
          <NavLinks />
        </nav>
      </MainHeader>
      <Card>
        <Content
          className='-container'
          name={cards[0].name}
          title={cards[0].title}
          image={cards[0].image}
          //onClick={handleCardClick}
          routePath="/brazil/brazilian-championship-a-series"
        />
        <Content
          className='-container'
          name={cards[1].name}
          title={cards[1].title}
          image={cards[1].image}
          //onClick={handleCardClick}
          routePath="/england/premier-league"
        />
        <Content
          className='-container'
          name={cards[2].name}
          title={cards[2].title}
          image={cards[2].image}
          //onClick={handleCardClick}
          routePath="/italy/seria-a"
        />
        <Content
          className='-container'
          name={cards[3].name}
          title={cards[3].title}
          image={cards[3].image}
          //onClick={handleCardClick}
          routePath="/france/ligue-one"
        />
        <Content
          className='-container'
          name={cards[4].name}
          title={cards[4].title}
          image={cards[4].image}
          //onClick={handleCardClick}
          routePath="/netherlands/eredivisie"

        />
        <Content
          className='-container'
          name={cards[5].name}
          title={cards[5].title}
          image={cards[5].image}
          //onClick={handleCardClick}
          routePath="/spain/primera-division"
        />
        <Content
          className='-container'
          name={cards[6].name}
          title={cards[6].title}
          image={cards[6].image}
          //onClick={handleCardClick}
          routePath="/portugal/primeira-liga"
        />
        {/*<Card className="card8" title={props.title} />
        <Card className="card9" title={props.title} />
        <Card className="card10" title={props.title} />
        <Card className="card11" title={props.title} />
        <Card className="card12" title={props.title} /> */
//}
/*      </Card>
      
    </React.Fragment>
  );
};*/

