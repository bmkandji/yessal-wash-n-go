
import { Transaction } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatCurrency, formatDate } from "@/lib/utils";

interface TransactionCardProps {
  transaction: Transaction;
  onSelect?: (id: string) => void;
}

const TransactionCard = ({ transaction, onSelect }: TransactionCardProps) => {
  const statusColors: Record<string, string> = {
    "pending": "bg-yellow-100 text-yellow-800",
    "in-progress": "bg-blue-100 text-blue-800",
    "completed": "bg-green-100 text-green-800",
    "cancelled": "bg-red-100 text-red-800",
  };

  const handleClick = () => {
    if (onSelect) {
      onSelect(transaction.id);
    }
  };

  return (
    <Card 
      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div className="truncate pr-2 max-w-[65%]">
            <CardTitle className="text-lg font-medium truncate">
              {formatCurrency(transaction.totalPrice)} CFA
            </CardTitle>
            <CardDescription className="truncate">
              {formatDate(transaction.date)}
            </CardDescription>
          </div>
          <Badge className={`${statusColors[transaction.status]} whitespace-nowrap`}>
            {transaction.status === "completed" ? "Terminé" : 
             transaction.status === "in-progress" ? "En cours" :
             transaction.status === "pending" ? "En attente" : "Annulé"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Poids total</span>
            <span className="truncate ml-2 font-medium">{transaction.totalWeight} kg</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Machine</span>
            <span className="truncate ml-2 font-medium max-w-[60%] text-right">{transaction.machines[0]?.name || "N/A"}</span>
          </div>
          
          <Separator className="my-2" />
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Site</span>
            <span className="truncate ml-2 font-medium max-w-[60%] text-right">{transaction.location}</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {transaction.hasIroning && (
              <Badge variant="outline" className="text-xs">Repassage</Badge>
            )}
            {transaction.hasDelivery && (
              <Badge variant="outline" className="text-xs">Livraison</Badge>
            )}
            {transaction.discounts.length > 0 && (
              <Badge variant="outline" className="text-xs">Réduction</Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionCard;
