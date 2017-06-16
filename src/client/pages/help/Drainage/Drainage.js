// dependencies
import React from 'react';
import Title from 'components/help/Title';
import InShortBlock from 'components/help/InShortBlock';
import Paragraph from 'components/help/Paragraph';
import TextBlockWithImage from 'components/help/TextBlockWithImage';

// images
import btn_drainage from 'assets/img/help/btn_drainage.png';
import btn_drainage_on from 'assets/img/help/btn_drainage_on.png';

const Drainage = () =>
  <div>
    <Title>Drainage</Title>
    <InShortBlock>
      De drainage knop is bedoeld om alle watertanks tegelijk te laten
      draineren.
    </InShortBlock>

    <Paragraph>
      De drainage knop kan gebruikt worden wanneer het nodig is om alle
      watertanks in het systeem te draineren. Het systeem zal altijd zelf letten
      op de capaciteit van de watertanks. Deze knop kan gebruikt worden mocht
      het nodig zijn om alle tanks buiten het systeem om te legen.
    </Paragraph>

    <TextBlockWithImage image={btn_drainage} title="Uit">
      Wanneer de knop rood is staat het draineer systeem niet aan. Het kan zijn
      dat er wel enkele watertanks aan het legen zijn. Kijk hiervoor op de
      overzichtspagina. Druk op de knop om handmatig alle watertanks te legen.
    </TextBlockWithImage>

    <TextBlockWithImage image={btn_drainage_on} title="Aan">
      Het draineer systeem staat aan wanneer deze knop groen gloeit. Dit
      betekent dat alle watertanks worden geleegd. Druk op de knop om dit proces
      te annuleren.
    </TextBlockWithImage>
  </div>;

export default Drainage;
