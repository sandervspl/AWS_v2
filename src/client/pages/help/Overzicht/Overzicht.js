// dependencies
import React from 'react';
import Title from 'components/help/Title';
import InShortBlock from 'components/help/InShortBlock';
import Paragraph from 'components/help/Paragraph';
import TextBlockWithImage from 'components/help/TextBlockWithImage';

// images
import tank_neutral from 'assets/img/help/tank_neutral.png';
import tank_draining from 'assets/img/help/tank_draining.png';
import tank_capacity from 'assets/img/help/tank_capacity.png';

const Overzicht = () =>
  <div>
    <Title>Overzicht</Title>
    <InShortBlock>
      Hier vind u alle informatie over de overzichtspagina. Er zal uitgelegd
      worden wat de verschillende elementen betekenen op de overzichtspagina en
      wat u als gebruiker kan doen.
    </InShortBlock>

    <Paragraph>
      Het overzicht bestaat uit alle watertanks in het systeem. Elk element op
      de pagina vertaald naar een unieke watertank.
      Op deze pagina kan er op een watertank geklikt worden om deze te legen.
      Normaliter gebeurd dit via eenautomatische proces is.
    </Paragraph>

    <TextBlockWithImage image={tank_neutral} title="Neutraal">
      Een oranje kleur betekent dat de watertank in de neutrale stand staat.
      Wanneer een maximale capaciteit wordt bereikt zal deze automatisch worden
      geleegd.
    </TextBlockWithImage>

    <TextBlockWithImage image={tank_draining} title="Draineren">
      Een groene kleur betekent dat de tank wordt geleegd. Dit proces wordt
      automatisch gestart door het systeem wanneer een maximale capaciteit wordt
      bereikt. Als gebruiker kunt u dit proces starten door op een neutrale
      (oranje) watertank te klikken. Het wordt aangeraden om dit door het
      systeem over te laten.
    </TextBlockWithImage>

    <TextBlockWithImage image={tank_capacity} title="Capaciteit">
      Elke tank heeft een maximale capaciteit. Deze wordt getoond op elk
      watertank element samen met het huidige waterniveau in liters en het
      percentage van de maximale capaciteit. Wanneer de maximale capaciteit
      bijna is bereikt, zal dit aangegeven worden met een waarschuwing. Het
      systeem zal altijd de watertank legen wanneer het lijkt dat deze de
      maximale capaciteit zal bereiken. Het draineerproces kunt u zelf starten
      door op de watertank te klikken.
    </TextBlockWithImage>
  </div>;

export default Overzicht;
