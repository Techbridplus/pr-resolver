import { 
    Card,
    CardHeader,
    CardFooter,
    CardContent
 } from "../ui/card";
import { BackButton } from "./back-button";
import { Header } from "./header";
import { Social } from "./social";
interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
    };

export const CardWrapper: React.FC<CardWrapperProps> = ({ children, headerLabel, backButtonLabel, backButtonHref, showSocial }) => {
    return (
        <Card className="w-[500px] shadow-md">
            <CardHeader>
                <Header lable={headerLabel} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial && (
                <CardFooter>
                    <Social />
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