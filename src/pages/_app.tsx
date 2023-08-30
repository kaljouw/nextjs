import { type AppType } from "next/dist/shared/lib/utils";
import "@fontsource/josefin-sans";
import "@fontsource/epilogue";
import "~/styles/globals.css";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import { env } from "../env.mjs";
import { Kavels } from "~/components/Kavels/Kavels";
import { TextSection } from "~/components/TextSection";
import { Spacer } from "~/components/Spacer";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

const components = {
  kavels: Kavels,
  TextSection: TextSection,
  Spacer: Spacer,
};
 
storyblokInit({
  accessToken: env.NEXT_PUBLIC_SB_API_PREVIEW,
  use: [apiPlugin],
  components,
});

export default MyApp;
