import StoryblokClient from 'storyblok-js-client'
import { env } from "../env.mjs";
 
let Storyblok = new StoryblokClient({
  accessToken: env.NEXT_PUBLIC_SB_API_PREVIEW,
})
 
function createMarkup(storyblokHTML: any) {
  return {
    __html: Storyblok.richTextResolver.render(storyblokHTML),
  }
}
 
const RichTextField = ({ data }: any) => {
  return <div dangerouslySetInnerHTML={createMarkup(data)} />
}
 
export default RichTextField