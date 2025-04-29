
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavBar from "@/components/NavBar";
import PageHeader from "@/components/PageHeader";
import TransactionCard from "@/components/TransactionCard";
import { mockTransactions } from "@/lib/mockData";

const History = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch = searchQuery
      ? transaction.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.id.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "completed" && transaction.status === "completed") ||
      (activeTab === "pending" && transaction.status === "pending") ||
      (activeTab === "in-progress" && transaction.status === "in-progress");

    return matchesSearch && matchesTab;
  });

  const handleViewTransaction = (id: string) => {
    navigate(`/transaction/${id}`);
  };

  // Get only in-progress transactions
  const inProgressTransactions = mockTransactions.filter(
    (transaction) => transaction.status === "in-progress"
  );

  return (
    <div className="container max-w-md mx-auto pb-20">
      <div className="p-4">
        <PageHeader title="Historique des lavages" />

        <div className="mb-6">
          <Input
            type="search"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="all">Tout</TabsTrigger>
            <TabsTrigger value="completed">Terminés</TabsTrigger>
            <TabsTrigger value="in-progress">En cours</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            {filteredTransactions.length > 0 ? (
              <div className="space-y-3">
                {filteredTransactions.map((transaction) => (
                  <TransactionCard
                    key={transaction.id}
                    transaction={transaction}
                    onSelect={handleViewTransaction}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 7h18" />
                    <rect width="18" height="14" x="3" y="5" rx="2" />
                    <path d="M7 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
                    <path d="M15 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
                    <path d="m11 9 5 2-5 2Z" />
                  </svg>
                </div>
                {activeTab === "in-progress" ? (
                  <h3 className="font-medium text-lg">Vous n'avez pas de lavage en cours</h3>
                ) : (
                  <h3 className="font-medium text-lg">Aucun résultat</h3>
                )}
                <p className="text-muted-foreground">
                  {activeTab === "in-progress"
                    ? "Toutes vos commandes en cours apparaîtront ici"
                    : "Aucune transaction ne correspond à votre recherche"}
                </p>
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
