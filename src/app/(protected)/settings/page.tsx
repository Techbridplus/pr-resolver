"use client";
import React, { useEffect, useState } from "react";
import { getSession, signOut } from "next-auth/react";
import { Session } from "next-auth";

const MyComponent = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getSessionData = async () => {
      try {
        const sessionData = await getSession();
        if (sessionData) {
          setSession(sessionData);
        }
      } catch (err) {
        console.error("Error fetching session:", err);
        setError("Failed to fetch session data.");
      }
    };

    getSessionData();
  }, []);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : session ? (
        <div>
            
          {JSON.stringify(session)}
          <form action={async ()=>{
                await signOut();
          }}>
               <button type="submit">
                    Sign Out                
                </button> 
            </form>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MyComponent;