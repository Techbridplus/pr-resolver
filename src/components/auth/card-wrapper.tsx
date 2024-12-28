"use client";
import { 
    Card,
    CardHeader,
    CardFooter,
    CardContent
 } from "../ui/card";
import { BackButton } from "./back-button";
import { Header } from "./header";
import { Social } from "./social";
import { useState } from 'react';
interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
    };
export const CardWrapper: React.FC<CardWrapperProps> = ({ children, headerLabel, backButtonLabel, backButtonHref, showSocial }) => {
    const [error, setError] = useState<string | null>(null);

    const handleError = (message: string) => {
        console.log("Error in card-wrapper.tsx", message);
        setError(message);
    };
    return (
        <Card className="w-[500px] shadow-md">
            <CardHeader>
                <Header lable={headerLabel} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            
            {showSocial && (
                <CardFooter className="flex flex-col">
                    <div> <p className="text-red-500">{error}</p></div>
                    <Social onError={handleError}/>
                </CardFooter>
                )}
            <CardFooter>
                <BackButton 
                    lable={backButtonLabel}
                    href={backButtonHref}
                />
            </CardFooter>
        </Card>
    );
}

