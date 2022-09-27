import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { ConvexProviderWithAuth0 } from "convex/react-auth0";
import { ConvexReactClient } from 'convex/react'

import convexConfig from "../convex.json";
import clientConfig from "../convex/_generated/clientConfig";
import {Login} from "./index";

const convex = new ConvexReactClient(clientConfig);
const authInfo = convexConfig.authInfo[0];

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConvexProviderWithAuth0
      client={convex}
      authInfo={authInfo}
      loggedOut={<Login/>}
    >
      <Component {...pageProps} />
    </ConvexProviderWithAuth0>
  )
}

export default MyApp
