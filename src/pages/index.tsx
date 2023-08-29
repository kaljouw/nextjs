import { ISbStoriesParams, StoryblokComponent, getStoryblokApi, useStoryblokState } from "@storyblok/react";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Kavel } from "~/components/Interfaces";
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


  // if (isPresenting) {
  //   return <Present kavels={kavels} isActive={isPresenting} />
  // }


  if(!props.story){
    return <></>
  }

  const story = useStoryblokState(props.story) as any;


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
  let slug = "home";
 
  // load the draft version
  let sbParams : ISbStoriesParams = {
    version: "draft", // or 'published'
    resolve_relations: 'page.kavels'
  };
 
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
 
  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
    },
    revalidate: 3600 * 24, // revalidate every hour
  };
}