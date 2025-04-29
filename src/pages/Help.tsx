
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import NavBar from "@/components/NavBar";
import PageHeader from "@/components/PageHeader";

const Help = () => {
  const navigate = useNavigate();

  return (
    <div className="container max-w-md mx-auto pb-20">
      <div className="p-4">
        <PageHeader title="Aide et support" />

        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Contactez-nous</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Pour toute question ou problème, vous pouvez nous contacter par téléphone ou par email:
            </p>
            
            <div className="space-y-4 pt-2">
              <a href="tel:+221771489622">
                <Button variant="outline" className="w-full justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  +221 77 148 96 22
                </Button>
              </a>
              
              <a href="mailto:contact@yessal.sn">
                <Button variant="outline" className="w-full justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  contact@yessal.sn
                </Button>
              </a>

              <Separator className="my-2" />
              
              <a href="https://yessal.sn/contact" target="_blank" rel="noopener noreferrer">
                <Button variant="default" className="w-full">
                  Formulaire de contact
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Questions fréquentes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Comment fonctionne la collecte ?</h3>
              <p className="text-sm text-muted-foreground">
                Vous pouvez demander une collecte à domicile via l'application. Choisissez l'heure et la date qui vous conviennent, et notre équipe viendra chercher votre linge.
              </p>
            </div>
            <Separator className="my-2" />
            <div className="space-y-2">
              <h3 className="font-medium">Comment fonctionnent les points de fidélité ?</h3>
              <p className="text-sm text-muted-foreground">
                Chaque lavage vous rapporte 1 point. Après 10 points, vous bénéficiez d'un lavage gratuit jusqu'à 6kg.
              </p>
            </div>
            <Separator className="my-2" />
            <div className="space-y-2">
              <h3 className="font-medium">Quelles sont les méthodes de paiement ?</h3>
              <p className="text-sm text-muted-foreground">
                Nous acceptons les paiements en espèces, par carte bancaire et via les solutions mobiles comme Wave et Orange Money.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <NavBar />
    </div>
  );
};

export default Help;
