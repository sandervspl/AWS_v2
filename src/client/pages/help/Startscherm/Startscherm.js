// dependencies
import React from 'react';
import Title from 'components/help/Title';
import InShortBlock from 'components/help/InShortBlock';
import TextBlockWithImage from 'components/help/TextBlockWithImage';
import MoreInfoBtn from 'components/help/MoreInfoBtn';

// images
import btn_wateropslag from 'assets/img/help/btn_wateropslag.png';
import btn_grid from 'assets/img/help/btn_grid.png';
import btn_weather from 'assets/img/help/btn_weather.png';
import btn_drainage from 'assets/img/help/btn_drainage.png';

const Startscherm = () =>
  <div>
    <Title>Startscherm</Title>
    <InShortBlock>
      Dit is het scherm die u het meest zal gebruiken.
      Hier leggen we uit wat de verschillende onderdelen betekenen en wat u
      ermee kan doen.
    </InShortBlock>
    <p className="help__paragraph">
      Op het startscherm zijn 4 knoppen te zien. Deze zullen hieronder per knop
      worden omschreven.
    </p>

    <TextBlockWithImage image={btn_wateropslag} title="Wateropslag">
      Hier kunt u zien hoeveel procent van uw totale wateropslag wordt gebruikt.
      <MoreInfoBtn url="/help/wateropslag" />
    </TextBlockWithImage>

    <TextBlockWithImage image={btn_grid} title="Overzicht">
      Knop om naar het overzicht van de watertanks te gaan.
      <MoreInfoBtn url="/help/overzicht" />
    </TextBlockWithImage>

    <TextBlockWithImage image={btn_weather} title="Weer">
      Wat is de temperatuur en hoeziet het weer eruit. Knop om de huidige
      weerinformatie te zien.
      <MoreInfoBtn url="/help/weer" />
    </TextBlockWithImage>

    <TextBlockWithImage image={btn_drainage} title="Drainage">
      Leeg alle watertanks door middel van deze knop.
      <MoreInfoBtn url="/help/drainage" />
    </TextBlockWithImage>
  </div>;

export default Startscherm;
