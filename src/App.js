import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "./aws-exports";

import React, { useState, useEffect } from "react";

import WelcomePage from "./components/WelcomePage";
import {
 
  useTheme
} from '@aws-amplify/ui-react';
import CardList from "./components/CardList";

Amplify.configure(awsExports);
//   <WelcomePage tokens={tokens}   />
function App({ signOut, user }) {
  const { tokens } = useTheme();
  return (
    <div>
      
      <div>
       <CardList/>
     
      </div>

      <div>
        <button onClick={signOut}>Sign out</button>
        <div id="textarea"></div>
      </div>
    </div>
  );
}

export default withAuthenticator(App);
