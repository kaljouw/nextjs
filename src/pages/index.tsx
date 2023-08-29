import { ISbStoriesParams, StoryblokComponent, getStoryblokApi, useStoryblokState } from "@storyblok/react";
import { useEffect, useState } from "react";
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

  if (isPresenting) {
    return <Present kavels={story.content.kavels} isActive={isPresenting} />
  }


  return (
    <>
         <h1>
          { story ? story.name : 'My Site' }
        </h1>
      <div className='App'>
        <div className='header'>
          <img src='/musk_logo.svg' alt='Muskathlon logo' />
        </div>
        <div className='wrapper'>
          <Intro></Intro>
          <h2 className="my-4">Kavels</h2>
          <Kavels kavels={story.content.kavels} />
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
  // home is the default slug for the homepage in Storyblok
  const slug = "home";
 
  // load the draft version
  const sbParams : ISbStoriesParams = {
    version: "draft", // or 'published'
    resolve_relations: 'page.kavels'
  };
 
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
 
  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
    },
    revalidate: 3600 * 24, // revalidate every hour
  };
}