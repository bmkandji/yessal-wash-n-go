
import AuthForm from "@/components/AuthForm";

const Auth = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-background flex flex-col justify-center p-6">
      <div className="w-full max-w-md mx-auto mb-10 text-center">
        <div className="bg-white inline-block rounded-full p-4 mb-4">
          <img 
            src="/lovable-uploads/98bed627-ff1c-476a-a488-38eb3a58cc04.png" 
            alt="Yessal Logo" 
            className="w-16 h-16 object-contain" 
          />
        </div>
        <h1 className="text-3xl font-bold">Yessal</h1>
        <p className="text-sm text-muted-foreground mt-2">
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
