
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Connexion réussie",
        description: "Bienvenue chez Yessal Wash-N-Go",
      });
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-primary/10 p-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary w-8 h-8">
              <path d="M6 12h12c1 0 2-.6 2-2V5c0-1.4-1-3-3-3H7C5 2 4 3.6 4 5v5c0 1.4 1 2 2 2Z"/>
              <path d="M11.5 22h1c2.5 0 5-2.5 5-6 0-.3-.1-.5-.3-.7-.2-.2-.4-.3-.7-.3h-9c-.3 0-.5.1-.7.3-.2.2-.3.4-.3.7 0 3.5 2.5 6 5 6Z"/>
            </svg>
          </div>
        </div>
        <CardTitle className="text-2xl text-center">Yessal Wash-N-Go</CardTitle>
        <CardDescription className="text-center">
          Connectez-vous pour accéder à votre compte
        </CardDescription>
      </CardHeader>
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Connexion</TabsTrigger>
          <TabsTrigger value="register">Inscription</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="exemple@email.com" required />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Mot de passe</Label>
                  <a href="#" className="text-sm text-primary hover:underline">
                    Mot de passe oublié?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connexion en cours...
                  </>
                ) : (
                  "Se connecter"
                )}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
        <TabsContent value="register">
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">Nom complet</Label>
                <Input id="register-name" placeholder="Amadou Diop" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input id="register-email" type="email" placeholder="exemple@email.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-phone">Téléphone</Label>
                <Input id="register-phone" type="tel" placeholder="+221 XX XXX XX XX" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Mot de passe</Label>
                <Input id="register-password" type="password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-confirm">Confirmez le mot de passe</Label>
                <Input id="register-confirm" type="password" required />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Création du compte..." : "Créer un compte"}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default AuthForm;
