import { useEffect, useState } from 'react';
import { Kavel } from '../Interfaces';

type Props = {
    kavels: Kavel[],
    isActive: boolean,
};

export const Present = ({ kavels, isActive }: Props) => {

    const [kavel, setCurrentKavel] = useState<Kavel>(kavels[0] as Kavel);
    const index = kavels.indexOf(kavel);

    const navPrev = () => {
        if (index > 0) {
            setCurrentKavel(kavels[index - 1]as Kavel)
        }
    }

    const navNext = () => {
        if (index < kavels.length - 1) {
            setCurrentKavel(kavels[index + 1] as Kavel)
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

    let bgImg = kavel.afbeeldingen.filter((e, index) => index > 0)[0];

    if (bgImg === undefined) {
        bgImg = kavel.afbeeldingen.filter((e, index) => index === 0)[0];
    }

    let bgStyling;
    if (bgImg !== undefined) {
        bgStyling = { backgroundImage: `url("/images/${bgImg.path}")` };
    } else {
        bgStyling = { backgroundImage: 'none' };
    }

    return (
        <div className='present-container'>
            <div className='nav nav__prev' onClick={navPrev}></div>
            <div className='nav nav__next' onClick={navNext}></div>
            <div className='background' style={bgStyling}></div>
            <div className='present'>
                <div className='kavel'>
                    <div className='kavel__poster'>
                        {kavel.afbeeldingen.filter((e, index) => index === 0).map((afbeelding) => (
                            <div className='kavel__poster__frame' key={afbeelding.path}>
                                <img
                                    className='kavel__poster__frame--image'
                                    alt={`${afbeelding.name}`}
                                    src={`/images/${afbeelding.path}`}
                                />
                            </div>
                        ))}
                    </div>
                    <div className='kavel__content'>
                        <h3>{index + 1} - {kavel.name}</h3>
                        <div dangerouslySetInnerHTML={{ __html: kavel.omschrijving }} />
                        <div className='thumbs'>
                            {kavel.afbeeldingen.filter((e, index) => index > 0).map((afbeelding) => (
                                <img className='img'
                                    key={afbeelding.path}
                                    alt={`${afbeelding.name}`}
                                    src={`/images/${afbeelding.path}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
