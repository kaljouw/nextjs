import { useEffect, useState } from 'react';
import { Kavel, KavelPageType } from '../Interfaces';
import RichTextField from '../RichTextField';

type Props = {
    kavels: KavelPageType[],
    isActive: boolean,
};

export const Present = ({ kavels, isActive }: Props) => {

    const [kavel, setCurrentKavel] = useState<KavelPageType>(kavels[0]!);
    const index = kavels.indexOf(kavel);

    const navPrev = () => {
        if (index > 0) {
            setCurrentKavel(kavels[index - 1]!)
        }
    }

    const navNext = () => {
        if (index < kavels.length - 1) {
            setCurrentKavel(kavels[index + 1]!)
        }
    }

    const handleKeyup = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight') {
            navNext();
        } else if (e.key === 'ArrowLeft') {
            navPrev();
        }
    }

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup);
        return () => window.removeEventListener('keyup', handleKeyup);
    });

    if (!isActive) {
        return (<></>)
    }

    let bgImg = kavel.content.afbeeldingen.filter((e, index) => index > 0)[0];

    if (bgImg === undefined) {
        bgImg = kavel.content.afbeeldingen.filter((e, index) => index === 0)[0];
    }

    let bgStyling;
    let bgUrl;
    if (bgImg !== undefined) {
        bgStyling = { backgroundImage: `url(${bgImg.filename}")` };
        bgUrl = bgImg.filename
    } else {
        bgStyling = { backgroundImage: 'none' };
        bgUrl = ''
    }

    return (
        <div className='present-container'>
            <div className='nav nav__prev' onClick={navPrev}></div>
            <div className='nav nav__next' onClick={navNext}></div>
            <div className={`background`} style={bgStyling}><img className='object-cover w-full h-full' src={`${bgUrl}`} /></div>
            <div className='present'>
                <div className='kavel'>
                    <div className='kavel__poster'>
                        {kavel.content.afbeeldingen.filter((e, index) => index === 0).map((afbeelding) => (
                            <div className='kavel__poster__frame' key={afbeelding.id}>
                                <img
                                    className='kavel__poster__frame--image'
                                    alt={`${afbeelding.name}`}
                                    src={`${afbeelding.filename}`}
                                />
                            </div>
                        ))}
                    </div>
                    <div className='kavel__content'>
                        <h3>{index + 1} - {kavel.name}</h3>
                        <RichTextField data={kavel.content.omschrijving} />
                        <div className='thumbs'>
                            {kavel.content.afbeeldingen.filter((e, index) => index > 0).map((afbeelding) => (
                                <img className='img'
                                    key={afbeelding.id}
                                    alt={`${afbeelding.name}`}
                                    src={`${afbeelding.filename}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
