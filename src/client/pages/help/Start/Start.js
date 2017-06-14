// dependencies
import React from 'react';
import Title from 'components/help/Title';
import InShortBlock from 'components/help/InShortBlock';

const Start = () =>
  <div>
    <Title>Aan de slag met AWS</Title>
    <InShortBlock>
      Deze app biedt een hele hoop data voor u als boer.
      Deze handleiding zal elk deel van de app in detail voor u uitleggen, zodat
      u het meeste uit uw AWS systeem kunt halen.
    </InShortBlock>
    <p className="help__paragraph">Welkom bij de app van AWS.</p>
    <p className="help__paragraph">
      In deze gebruikershandleiding vind u alles wat u moet weten over uw
      nieuwe AWS systeem, zodat u snel aan de slag kan gaan met uw nieuwe AWS
      systeem.
    </p>
    <p className="help__paragraph">Veel plezier met uw nieuwe AWS systeem!</p>
  </div>;

export default Start;
