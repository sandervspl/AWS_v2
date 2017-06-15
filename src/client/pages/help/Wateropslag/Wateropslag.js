// dependencies
import React from 'react';
import Title from 'components/help/Title';
import InShortBlock from 'components/help/InShortBlock';
import TextBlockWithImage from 'components/help/TextBlockWithImage';
import Paragraph from 'components/help/Paragraph';
import Image from 'components/Image';

// images
import btn_wateropslag from 'assets/img/help/btn_wateropslag.png';
import widget_wateropslag from 'assets/img/help/widget_wateropslag.png';

const Startscherm = () =>
  <div>
    <Title>Wateropslag</Title>
    <InShortBlock>
      Op deze knop zult u het percentage van de gebruikte
      wateropslag van alle watertanks zien.

      Wanneer u op deze knop drukt zal er een scherm onderaan het scherm
      tevoorschijnkomen. Dit scherm laat de wateropslag van de afgelopen week
      zien.
    </InShortBlock>

    <TextBlockWithImage image={btn_wateropslag} title="Wateropslag">
      Deze knop staat voor de wateropslag. Op deze knop zal de percentage van
      de totale wateropslag te zien zijn.
    </TextBlockWithImage>

    <Paragraph marginTop="20px">
      Wanneer er op deze knop gedrukt wordt zal er een scherm vanuit onderen
      komen die de wateropslag van de afgelopen week laat zien.
    </Paragraph>

    <Image img={widget_wateropslag} alt="wateropslag widget" blockWidth />
  </div>;

export default Startscherm;
