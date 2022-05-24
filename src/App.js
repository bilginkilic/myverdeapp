import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "./aws-exports";

import React, { useState, useEffect } from "react";

import WelcomePage from "./components/WelcomePage";
import { useTheme } from "@aws-amplify/ui-react";
import {
  Card,
  Image,
  View,
  Heading,
  Flex,
  Badge,
  Text,
  Button,
} from "@aws-amplify/ui-react";
Amplify.configure(awsExports);
//   <WelcomePage tokens={tokens}
function App({ signOut, user }) {
  const { tokens } = useTheme();
  return (
    <div className="contentmain">
      <div>
        <WelcomePage tokens={tokens} />
      </div>
      <span id="content1buttn"></span>
      <div  align="center" margin="50px">
       
        <Button    variation="link"
  size="small" onClick={signOut}>
          Sign out
          </Button>
        <div id="textarea"> {user?.Email} </div>
      </div>
    </div>
  );
}

export default withAuthenticator(App);
