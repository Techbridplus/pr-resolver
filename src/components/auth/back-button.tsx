
import Link from "next/link";
import { Button
 } from "../ui/button";

interface BackButtonProps {
    lable: string;
    href: string;
};

export const BackButton = ({
    href,
    lable
}: BackButtonProps) => {
    return (
        <Button 
            variant={'link'}
            className="font-normal w-full hover:text-blue-700"
            size={'sm'}
            asChild
        >
            <Link href={href}>
                {lable}
            </Link>
        </Button>
    )
}