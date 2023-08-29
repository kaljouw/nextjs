import { useEffect, useState } from 'react';
import { Afbeelding, AssetType, Kavel, KavelPageType } from '../Interfaces';
import { Modal } from '../Modal/Modal';
import RichTextField from '../RichTextField';

type Props = {
  kavels: KavelPageType[],
};

export const Kavels = ({ kavels }: Props) => {

  const [modalContent, setModalContent] = useState<Element>();

  const [showModal, setShowModal] = useState(false);
  const handleKeyup = (e: KeyboardEvent) => e.keyCode === 27 && setShowModal(false);
  const toggleModal = (afbeelding: AssetType) => {

    const jsx = (
      <div
        onClick={() => setShowModal(false)}
        style={{
          backgroundImage: `url(${afbeelding.filename})`
        }}
        className='modal-image'
      >
      </div>
    );

    setModalContent(jsx as any);
    return setShowModal(!showModal);
  }

  useEffect(() => {
    if (showModal) window.addEventListener('keyup', handleKeyup);
    return () => window.removeEventListener('keyup', handleKeyup);
  });
 

  return (
    <>
      <div className='kavels'>
        {kavels.map((kavel, kavelNr) => (
          <div className='kavel' key={kavelNr}>
            <div className='kavel__poster'>
              {kavel.content && kavel.content.afbeeldingen.filter((e, index) => index === 0).map((afbeelding) => (
                <div className='kavel__poster__frame' key={afbeelding.id} onClick={() => toggleModal(afbeelding)}>
                  <img className='kavel__poster__frame--image' alt={`${afbeelding.name}`} src={`${afbeelding.filename}/m/512x0`} />
                </div>
              ))}
            </div>
            <div className='kavel__content'>
              <h3>{kavel.name}</h3>
              <RichTextField  data={ kavel.content.omschrijving} />
              <div className='thumbs'>
                {kavel.content && kavel.content.afbeeldingen.filter((e, index) => index > 0).map((afbeelding) => (
                  <div className='thumbs__frame' key={afbeelding.id} onClick={() => toggleModal(afbeelding)}>
                    <img className='thumbs__frame--image' alt={`${afbeelding.name}`} src={`${afbeelding.filename}/m/150x0`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {showModal && modalContent && <Modal>
        {modalContent as any}
      </Modal>}
    </>
  )

};