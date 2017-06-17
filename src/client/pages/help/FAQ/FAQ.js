// dependencies
import React from 'react';
import Title from 'components/help/Title';
import InShortBlock from 'components/help/InShortBlock';
import FAQBlock from 'components/help/FAQBlock';
import Paragraph from 'components/help/Paragraph';

const FAQ = () =>
  <div>
    <Title>Veelgestelde vragen</Title>
    <InShortBlock>
      Weet u niet zeker waar u naar zoekt? Mogelijk vind u hier waar u naar op
      zoek bent.
    </InShortBlock>

    <FAQBlock url="/help/startscherm">
      Wat betekent alles op het startscherm?
    </FAQBlock>

    <FAQBlock url="/help/wateropslag">
      Wat doet de blauwe knop op mijn starscherm?
    </FAQBlock>

    <FAQBlock url="/help/weer">
      Waar kan ik informatie over het weer vinden?
    </FAQBlock>

    <FAQBlock url="/help/grid">
      Hoe kan ik een enkele watertank legen?
    </FAQBlock>

    <FAQBlock url="/help/drainage">
      Hoe kan ik mijn al mijn watertanks legen?
    </FAQBlock>

    <Paragraph marginTop="50px">
      Heeft u verdere vragen? Stuur dan een e-mail naar help@aws.com
    </Paragraph>
  </div>;

export default FAQ;
