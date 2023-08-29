export const Intro = () => {
  return (
    <>
      <div className='intro'>
        <div className='intro__content'>
          <h1 className="my-6">Welkom</h1>
          <p>Welkom op onze benefiet veiling ....</p>
          <p>Wij zijn ...... uit Middelburg en in oktober 2023 gaan we 63 kilometer wandelen voor de christelijke hulporganisatie Compassion. Met de opbrengst bevrijden we kinderen uit extreme armoede. Door de plaatselijke kerk horen ze over Jezus en worden ze voorzien van eten, verzorging, medicijnen en onderwijs.</p>
          <p>
            <b>MELD JE AAN</b> met de rode aanmeldknop. Dat is voor ons handig in verband met de catering.
          </p>
          <p>De veiling vindt plaats ..</p>
          <p>
            Naast deze veilingstukken is er ook een kraam met leuke cadeautjes die te koop zijn.
          </p>
          <p>
            Compassion heeft de ANBI-status.
          </p>
        </div>
        <div className='intro__graphic'>
          <img className='intro__graphic--image' src="/images/intro.jpg" alt="Foto van de lopers" />
        </div>
      </div>
      <div className='intro'>
        <div className='intro__content'>
          Aanmelden voor de veiling kan via de onderstaande button
          <div className='buttons'>
            <a href='#_' target='_blank' rel="noreferrer" className='button'>Aanmelden</a>
          </div>
          Bekijk ook de Muskathlon pagina van .....
          <div className='buttons'>
            <a href='https://www.muskathlon.nl/deelnemers/#_' target='_blank' rel="noreferrer" className='button'>....</a>
            <a href='https://www.muskathlon.nl/deelnemers/#_' target='_blank' rel="noreferrer" className='button'>....</a>
          </div>
        </div>
      </div>
    </>
  )

};
