
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavBar from "@/components/NavBar";
import PageHeader from "@/components/PageHeader";
import TransactionCard from "@/components/TransactionCard";
import { mockTransactions } from "@/lib/mockData";

const History = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  
  const handleViewTransaction = (id: string) => {
    navigate(`/transaction/${id}`);
  };

  // Filter transactions based on their status
  const ongoingTransactions = mockTransactions.filter(
    (t) => t.status === "pending" || t.status === "in-progress"
  );
  
  const completedTransactions = mockTransactions.filter(
    (t) => t.status === "completed"
  );

  return (
    <div className="container max-w-md mx-auto pb-20">
      <div className="p-4">
        <PageHeader title="Historique des lavages" />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="all">Tout</TabsTrigger>
            <TabsTrigger value="ongoing">En cours</TabsTrigger>
            <TabsTrigger value="completed">Terminé</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-3">
            {mockTransactions.length > 0 ? (
              mockTransactions.map((transaction) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                  onSelect={handleViewTransaction}
                />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Aucun historique de lavage disponible
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="ongoing" className="space-y-3">
            {ongoingTransactions.length > 0 ? (
              ongoingTransactions.map((transaction) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                  onSelect={handleViewTransaction}
                />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Vous n'avez pas de lavage en cours
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-3">
            {completedTransactions.length > 0 ? (
              completedTransactions.map((transaction) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                  onSelect={handleViewTransaction}
                />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Aucun lavage terminé
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <NavBar />
    </div>
  );
};

export default History;
