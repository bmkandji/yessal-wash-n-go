
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import QRCode from "@/components/QRCode";
import { mockUser } from "@/lib/mockData";

const LoyaltyCard = () => {
  const loyaltyProgress = (mockUser.loyaltyPoints % 10) * 10; // Pourcentage de progression pour la prochaine récompense
  const nextRewardAt = 10 - (mockUser.loyaltyPoints % 10);
  const hasRewardAvailable = mockUser.loyaltyPoints % 10 === 0 && mockUser.loyaltyPoints > 0;

  return (
    <Card className="w-full overflow-hidden">
      <div className="yessal-gradient text-white p-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-white/10 backdrop-blur-sm opacity-50"></div>
        <div className="relative z-10">
          <h3 className="font-bold text-xl mb-1">Carte de Fidélité</h3>
          <p className="text-sm opacity-90 mb-4">Yessal Wash-N-Go</p>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs opacity-80">Client</p>
              <p className="font-semibold">{mockUser.name}</p>
            </div>
            <div>
              <p className="text-xs opacity-80">ID Client</p>
              <p className="font-semibold">{mockUser.id}</p>
            </div>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Lavages totaux</p>
            <p className="text-2xl font-bold">{mockUser.totalWashes}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Points actuels</p>
            <p className="text-2xl font-bold">{mockUser.loyaltyPoints}</p>
          </div>
        </div>
        
        {hasRewardAvailable ? (
          <div className="mb-4 bg-primary/10 p-3 rounded-lg border border-primary/20">
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"></path>
                <path d="M4 6v12c0 1.1.9 2 2 2h14v-4"></path>
                <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
              </svg>
              <span className="font-medium text-primary">Un lavage gratuit vous attend!</span>
            </div>
          </div>
        ) : (
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span>Progression récompense</span>
              <span className="font-medium">{mockUser.loyaltyPoints % 10}/10</span>
            </div>
            <Progress value={loyaltyProgress} className="h-2" />
            <p className="text-sm text-muted-foreground">
              Encore {nextRewardAt} lavage{nextRewardAt > 1 ? "s" : ""} pour obtenir un lavage gratuit de 6kg!
            </p>
          </div>
        )}
        
        <div className="flex flex-col items-center space-y-4">
          <QRCode value={`loyalty-card`} userId={mockUser.id} size={140} />
          <p className="text-sm text-center text-muted-foreground">
            Présentez ce code QR lors de votre visite
          </p>
          <Button variant="outline" className="w-full">
            Télécharger
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoyaltyCard;
