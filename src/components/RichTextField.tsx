import StoryblokClient from 'storyblok-js-client'
import { env } from "../env.mjs";
 
const Storyblok = new StoryblokClient({
  accessToken: env.NEXT_PUBLIC_SB_API_PREVIEW,
})
 
function createMarkup(storyblokHTML: any) {
  return {
    __html: Storyblok.richTextResolver.render(storyblokHTML),
  }
}
 
const RichTextField = ({ data }: any) => {
  const classes = [
    '[&_ul]:list-disc [&_ul]:list-inside',
    '[&_ol]:list-decimal [&_ol]:list-inside',
    '[&_ul_p]:inline-block',
    '[&_ol_p]:inline-block',
    '[&_ul]:mb-5 [&_ol]:mb-5',
    '[&_ul]:ml-4 [&_ol]:ml-4',
    '[&_ul_li]:mb-1 [&_ol_li]:mb-1',
    '[&_ul_li_p]:mb-1 [&_ul_li_p]:inline',
    '[&_ol_li_p]:mb-1 [&_ol_li_p]:inline',
    '[&_p]:mb-4 last:[&_p]:mb-0',
    '[&:not(.text-secondary-link)>a]:text-accent-0',
  ]



  return <div dangerouslySetInnerHTML={createMarkup(data)} className={classes.join(' ')} />
}
 
export default RichTextField