// dependencies
import React from 'react';
import Title from 'components/help/Title';
import InShortBlock from 'components/help/InShortBlock';
import Paragraph from 'components/help/Paragraph';
import Image from 'components/Image';

// images
import widget_weather from 'assets/img/help/widget_weather.png';

const Overzicht = () =>
  <div>
    <Title>Weer</Title>
    <InShortBlock>
      Op deze widget is gedetailleerde informatie over het huidige weer op uw
      locatie te zien.
    </InShortBlock>

    <Paragraph marginTop="20px">
      Wanneer je op de weer knop drukt zal er een widget onderaan het scherm
      verschijnen. Hier is gedetailleerde informatie te vinden over het weer.
      Dit bestaat uit luchtvochtigheid, windsnelheid en de temperatuur.
    </Paragraph>

    <Image img={widget_weather} alt="weer widget" blockWidth />
  </div>;

export default Overzicht;
