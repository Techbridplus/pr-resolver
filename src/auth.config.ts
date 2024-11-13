import { Session } from "inspector/promises";
import GitHub from "next-auth/providers/github"

const authConfig = {
    providers: [GitHub],
    callbacks: {
      Session:{
        strategy:'jwt',
      }
    },
  };
  
  export default authConfig;