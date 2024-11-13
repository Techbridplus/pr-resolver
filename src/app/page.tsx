import { Button } from "@/components/ui/button";
import LoginButton from "@/components/auth/login-button";

export default function Home() {
  return (
    <main className="flex w-full min-h-screen flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 items-center justify-center ">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-200 shadow-lime-950">
          Auth page
        </h1>
        <LoginButton>
          <Button>
            Click me
          </Button>
        </LoginButton>
      </div>
    </main>
  );
}