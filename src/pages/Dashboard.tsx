
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import NavBar from "@/components/NavBar";
import LoyaltyCard from "@/components/LoyaltyCard";
import TransactionCard from "@/components/TransactionCard";
import { mockUser, mockTransactions } from "@/lib/mockData";
import { useIsMobile } from "@/hooks/use-mobile";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("loyalty");
  const isMobile = useIsMobile();
  
  const handleViewTransaction = (id: string) => {
    navigate(`/transaction/${id}`);
  };

  return (
    <div className="pb-20 max-w-md mx-auto w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-yessal-green to-yessal-blue p-4 pt-8 text-white">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl font-bold">Bonjour, {mockUser.name.split(' ')[0]}</h1>
            <p className="text-white/80 text-sm">Bienvenue chez Yessal Wash-N-Go</p>
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
      </div>
      
      {/* Content */}
      <div className="px-4 py-4">
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 mb-4 w-full">
            <TabsTrigger value="loyalty">Fidélité</TabsTrigger>
            <TabsTrigger value="activity">Activité</TabsTrigger>
          </TabsList>
          
          <TabsContent value="loyalty" className="mt-0">
            <LoyaltyCard />
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
        </Tabs>
      </div>
      
      <NavBar />
    </div>
  );
};

export default Dashboard;
