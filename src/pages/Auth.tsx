
import AuthForm from "@/components/AuthForm";

const Auth = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-background flex flex-col justify-center p-6">
      <div className="w-full max-w-md mx-auto mb-10 text-center">
        <div className="yessal-gradient inline-block rounded-full p-4 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 12h12c1 0 2-.6 2-2V5c0-1.4-1-3-3-3H7C5 2 4 3.6 4 5v5c0 1.4 1 2 2 2Z"/>
            <path d="M11.5 22h1c2.5 0 5-2.5 5-6 0-.3-.1-.5-.3-.7-.2-.2-.4-.3-.7-.3h-9c-.3 0-.5.1-.7.3-.2.2-.3.4-.3.7 0 3.5 2.5 6 5 6Z"/>
          </svg>
        </div>
        <h1 className="text-3xl font-bold">Yessal Wash-N-Go</h1>
        <p className="text-muted-foreground mt-2">
          Bienvenue sur l'application mobile des laveries automatiques Yessal
        </p>
      </div>
      
      <AuthForm />
      
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Yessal - Tous droits réservés
        </p>
        <p className="text-xs mt-1 text-muted-foreground">
          <a href="https://yessal.sn" className="hover:underline">yessal.sn</a>
        </p>
      </div>
    </div>
  );
};

export default Auth;
