import { type AppType } from "next/dist/shared/lib/utils";
import "@fontsource/josefin-sans";
import "@fontsource/epilogue";
import "~/styles/globals.css";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import { env } from "../env.mjs";
import { Kavels } from "~/components/Kavels/Kavels";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

const components = {
  // feature: Feature,
  kavels: Kavels,
  // grid: Grid,
  // teaser: Teaser,
  // page: Page,
};
 
storyblokInit({
  accessToken: env.NEXT_PUBLIC_SB_API_PREVIEW,
  use: [apiPlugin],
  components,
});

export default MyApp;
