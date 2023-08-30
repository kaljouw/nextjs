import { ISbStoriesParams, StoryblokComponent, getStoryblokApi, useStoryblokState } from "@storyblok/react";
import { useEffect, useState } from "react";
import { BlockUnion, BlockUnionSchema, BlockUnionType, TextSectionSchema, TextSectionType } from "~/components/Interfaces";
import { Intro } from "~/components/Intro/Intro";
import { Kavels } from "~/components/Kavels/Kavels";
import { Present } from "~/components/Present/Present";

export default function Home(props: any) {
  const [isPresenting, setIsPresenting] = useState<boolean>(false);

  const handleKeyup = (e: KeyboardEvent) => e.ctrlKey && e.key === 'x' && setIsPresenting(!isPresenting);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup);
    return () => window.removeEventListener('keyup', handleKeyup);
  });

  const story = useStoryblokState(props.story) as any;

  if(!props.story){
    return <></>
  }

  if (isPresenting && story.content.kavels) {
    return <Present kavels={story.content.kavels} isActive={isPresenting} />
  }

  const textBlocks = story.content.blocks.map((blok: BlockUnionType) => BlockUnionSchema.parse(blok))

  return (
    <>
      <div className='App'>
        <div className='header'>
          <img src='/musk_logo.svg' alt='Muskathlon logo' />
        </div>
        <div className='wrapper'>
          {textBlocks.map((block: BlockUnionType) => <StoryblokComponent blok={block} key={block._uid} />)}
          <h2 className="my-4">Kavels</h2>
          {story.content.kavels && <Kavels kavels={story.content.kavels} />}
        </div>
        <div className='footer'>
          <div className='footer__copyright'>
            Copyright ©{new Date().getFullYear()} All rights reserved&nbsp;
            <button onClick={() => setIsPresenting(!isPresenting)}>P</button>
          </div>

        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const slug = "home";
 
  const sbParams : ISbStoriesParams = {
    version: "published", // or 'published'
    resolve_relations: 'page.kavels'
  };
 
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
 
  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
    },
  };
}