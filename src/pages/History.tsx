
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import TransactionCard from "@/components/TransactionCard";
import PageHeader from "@/components/PageHeader";
import { mockTransactions } from "@/lib/mockData";

const History = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"all" | "completed" | "pending" | "cancelled">("all");
  
  // Filter transactions based on the selected filter
  const filteredTransactions = mockTransactions.filter(transaction => {
    if (filter === "all") return true;
    return transaction.status === filter;
  });
  
  const handleViewTransaction = (id: string) => {
    navigate(`/transaction/${id}`);
  };

  return (
    <div className="container max-w-md mx-auto pb-20">
      <div className="p-4">
        <PageHeader title="Historique des lavages" />
        
        <div className="flex space-x-2 mb-4 overflow-x-auto py-1">
          <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
            Tous
          </FilterButton>
          <FilterButton active={filter === "completed"} onClick={() => setFilter("completed")}>
            Complétés
          </FilterButton>
          <FilterButton active={filter === "pending"} onClick={() => setFilter("pending")}>
            En cours
          </FilterButton>
          <FilterButton active={filter === "cancelled"} onClick={() => setFilter("cancelled")}>
            Annulés
          </FilterButton>
        </div>
        
        {filteredTransactions.length === 0 ? (
          <div className="text-center p-8">
            <p className="text-lg font-medium">Aucune transaction trouvée</p>
            <p className="text-muted-foreground">Vous n'avez pas encore de transactions {filter !== "all" ? "avec ce statut" : ""}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <TransactionCard 
                key={transaction.id}
                transaction={transaction}
                onClick={() => handleViewTransaction(transaction.id)}
              />
            ))}
          </div>
        )}
      </div>
      <NavBar />
    </div>
  );
};

const FilterButton = ({ children, active, onClick }: { children: React.ReactNode, active: boolean, onClick: () => void }) => (
  <button
    className={`px-4 py-1 rounded-full text-sm whitespace-nowrap ${
      active
        ? "bg-primary text-primary-foreground"
        : "bg-muted text-muted-foreground hover:bg-muted/80"
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default History;
