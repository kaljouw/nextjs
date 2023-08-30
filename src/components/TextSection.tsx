import { TextSectionType } from "./Interfaces";
import RichTextField from "./RichTextField";

interface TextSectionProps {
  blok: TextSectionType
}

export const TextSection = ({blok}: TextSectionProps) => {


if(blok.image?.filename){
  return (
    <div className="flex flex-col md:flex-row my-16 gap-8">
      <div className="md:w-1/2 pr-8"><RichTextField data={blok.text} /></div>
      <div  className="md:w-1/2"><img src={blok.image.filename} /></div>
    </div>
  )
}

return (
  <div className="my-16">
    <div><RichTextField data={blok.text} /></div>
</div>
)

  

};
