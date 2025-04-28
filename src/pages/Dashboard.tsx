
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import NavBar from "@/components/NavBar";
import LoyaltyCard from "@/components/LoyaltyCard";
import TransactionCard from "@/components/TransactionCard";
import PickupRequestCard from "@/components/PickupRequestCard";
import TarifsCard from "@/components/TarifsCard";
import SitesCard from "@/components/SitesCard";
import { mockUser, mockTransactions, mockPickupRequests } from "@/lib/mockData";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("loyalty");
  
  const handleNewPickupRequest = () => {
    navigate("/pickup/new");
  };
  
  const handleViewTransaction = (id: string) => {
    navigate(`/transaction/${id}`);
  };
  
  const handleViewPickupRequest = (id: string) => {
    navigate(`/pickup/${id}`);
  };

  const handleTarifsClick = () => {
    navigate("/website?section=tarifs");
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-yessal-green to-yessal-blue p-6 pt-12 text-white">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Bonjour, {mockUser.name.split(' ')[0]}</h1>
            <p className="text-white/80">Bienvenue chez Yessal Wash-N-Go</p>
          </div>
          <Button 
            variant="outline" 
            className="bg-white/20 border-white/20 text-white hover:bg-white/30"
            onClick={() => navigate('/notifications')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
          </Button>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2">
          <Card 
            className="flex-shrink-0 bg-white/20 border-white/20 text-white w-32 cursor-pointer"
            onClick={handleTarifsClick}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 7h18" />
                <rect width="18" height="14" x="3" y="5" rx="2" />
                <path d="M7 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
                <path d="M15 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
                <path d="m11 9 5 2-5 2Z" />
              </svg>
              <p className="text-sm mt-1">Tarifs</p>
            </CardContent>
          </Card>
          
          <Card 
            className="flex-shrink-0 bg-white/20 border-white/20 text-white w-32 cursor-pointer"
            onClick={handleNewPickupRequest}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v4" />
                <path d="m4.93 10.93 1.41 1.41" />
                <path d="M2 18h2" />
                <path d="M20 18h2" />
                <path d="m19.07 10.93-1.41 1.41" />
                <path d="M22 22H2" />
                <path d="m8 22 4-10 4 10" />
                <path d="M12 6a4 4 0 0 0-4 4v10h8V10a4 4 0 0 0-4-4Z" />
              </svg>
              <p className="text-sm mt-1">Collecte</p>
            </CardContent>
          </Card>
          
          <Card 
            className="flex-shrink-0 bg-white/20 border-white/20 text-white w-32 cursor-pointer"
            onClick={() => navigate('/website?section=sites')}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <p className="text-sm mt-1">Nos sites</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Content */}
      <div className="px-4 py-6">
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="loyalty">Fidélité</TabsTrigger>
            <TabsTrigger value="activity">Activité</TabsTrigger>
            <TabsTrigger value="tarifs">Tarifs</TabsTrigger>
            <TabsTrigger value="sites">Sites</TabsTrigger>
          </TabsList>
          
          <TabsContent value="loyalty" className="mt-0">
            <LoyaltyCard />
            
            <div className="mt-6">
              <h3 className="font-medium text-lg mb-3">Récompenses disponibles</h3>
              
              <div className="space-y-3">
                <Card>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          <path d="M6 12h12c1 0 2-.6 2-2V5c0-1.4-1-3-3-3H7C5 2 4 3.6 4 5v5c0 1.4 1 2 2 2Z" />
                          <path d="M11.5 22h1c2.5 0 5-2.5 5-6 0-.3-.1-.5-.3-.7-.2-.2-.4-.3-.7-.3h-9c-.3 0-.5.1-.7.3-.2.2-.3.4-.3.7 0 3.5 2.5 6 5 6Z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Lavage gratuit 6kg</p>
                        <p className="text-sm text-muted-foreground">Après 10 lavages</p>
                      </div>
                    </div>
                    <Badge variant="outline">{mockUser.loyaltyPoints % 10}/10</Badge>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="activity" className="mt-0">
            <h3 className="font-medium text-lg mb-3">Lavages récents</h3>
            <div className="space-y-3">
              {mockTransactions.slice(0, 3).map((transaction) => (
                <TransactionCard 
                  key={transaction.id} 
                  transaction={transaction} 
                  onSelect={handleViewTransaction}
                />
              ))}
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/history')}
              >
                Voir tout l'historique
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="tarifs" className="mt-0">
            <TarifsCard />
          </TabsContent>

          <TabsContent value="sites" className="mt-0">
            <SitesCard />
          </TabsContent>
        </Tabs>
      </div>
      
      <NavBar />
    </div>
  );
};

export default Dashboard;
