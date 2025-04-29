
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import NavBar from "@/components/NavBar";
import PageHeader from "@/components/PageHeader";
import { mockTransactions } from "@/lib/mockData";
import { formatCurrency, formatDate } from "@/lib/utils";

const TransactionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const transaction = mockTransactions.find(t => t.id === id);
  
  if (!transaction) {
    return (
      <div className="container max-w-md mx-auto p-4">
        <PageHeader title="Transaction non trouvée" showBackButton />
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            Cette transaction n'existe pas ou a été supprimée.
          </p>
          <Button className="mt-4" onClick={() => navigate("/history")}>
            Retour à l'historique
          </Button>
        </div>
      </div>
    );
  }
  
  const statusColors: Record<string, string> = {
    "pending": "bg-yellow-100 text-yellow-800",
    "in-progress": "bg-blue-100 text-blue-800",
    "completed": "bg-green-100 text-green-800",
    "cancelled": "bg-red-100 text-red-800",
  };
  
  const statusLabels: Record<string, string> = {
    "pending": "En attente",
    "in-progress": "En cours",
    "completed": "Terminé",
    "cancelled": "Annulé",
  };

  const handleDownloadInvoice = () => {
    // This would be replaced with actual PDF generation
    toast({
      title: "Téléchargement de la facture",
      description: "Votre facture PDF est en cours de téléchargement."
    });

    // Create invoice content
    const invoiceContent = `
      YESSAL WASH-N-GO
      FACTURE #${transaction.id.slice(-5)}
      Date: ${formatDate(transaction.date)}
      
      Site: ${transaction.location}
      Poids total: ${transaction.totalWeight} kg
      Machine: ${transaction.machines[0]?.name || "N/A"}
      ${transaction.hasIroning ? "Repassage: Oui" : ""}
      ${transaction.hasDelivery ? "Livraison: Oui" : ""}
      
      TOTAL: ${formatCurrency(transaction.totalPrice)} CFA
    `;
    
    // Generate PDF using a simple approach
    const element = document.createElement('div');
    element.innerHTML = `
      <style>
        body {font-family: sans-serif; padding: 20px;}
        h1 {color: #00bf63;}
        .header {text-align: center; margin-bottom: 30px;}
        .details {margin-top: 20px;}
        .total {margin-top: 30px; font-weight: bold; font-size: 18px;}
      </style>
      <div class="header">
        <h1>YESSAL WASH-N-GO</h1>
        <h2>FACTURE #${transaction.id.slice(-5)}</h2>
        <p>Date: ${formatDate(transaction.date)}</p>
      </div>
      <div class="details">
        <p>Site: ${transaction.location}</p>
        <p>Poids total: ${transaction.totalWeight} kg</p>
        <p>Machine: ${transaction.machines[0]?.name || "N/A"}</p>
        ${transaction.hasIroning ? "<p>Repassage: Oui</p>" : ""}
        ${transaction.hasDelivery ? "<p>Livraison: Oui</p>" : ""}
      </div>
      <div class="total">
        TOTAL: ${formatCurrency(transaction.totalPrice)} CFA
      </div>
    `;
    
    setTimeout(() => {
      const printWindow = window.open('', '', 'height=600,width=800');
      if (printWindow) {
        printWindow.document.write('<html><head><title>Facture Yessal</title>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(element.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        
        // Print and save as PDF
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 500);
      }
      
      toast({
        title: "Facture prête",
        description: "Votre facture a été générée. Veuillez l'enregistrer au format PDF."
      });
    }, 1000);
  };

  return (
    <div className="container max-w-md mx-auto pb-20">
      <div className="p-4">
        <PageHeader 
          title={`Transaction #${transaction.id.slice(-5)}`} 
          showBackButton
        />
        
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-medium">
                    {formatCurrency(transaction.totalPrice)} CFA
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(transaction.date)}
                  </p>
                </div>
                <Badge className={statusColors[transaction.status]}>
                  {statusLabels[transaction.status]}
                </Badge>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Site</span>
                  <span className="font-medium">{transaction.location}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Poids total</span>
                  <span className="font-medium">{transaction.totalWeight} kg</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Machine</span>
                  <span className="font-medium">
                    {transaction.machines[0]?.name || "N/A"}
                  </span>
                </div>
                
                {transaction.hasIroning && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Repassage</span>
                    <span className="font-medium">Oui</span>
                  </div>
                )}
                
                {transaction.hasDelivery && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Livraison</span>
                    <span className="font-medium">Oui</span>
                  </div>
                )}
                
                {transaction.discounts.length > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Réduction</span>
                    <span className="font-medium">
                      {transaction.discounts
                        .map(d => `${d.name} (${d.percentage}%)`)
                        .join(", ")}
                    </span>
                  </div>
                )}
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">Total</span>
                <span className="text-lg font-bold text-primary">
                  {formatCurrency(transaction.totalPrice)} CFA
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Télécharger votre reçu</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Vous pouvez télécharger une copie de votre reçu pour vos dossiers.
              </p>
              <Button variant="outline" className="w-full" onClick={handleDownloadInvoice}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                Télécharger la facture
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Besoin d'aide?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Si vous avez des questions concernant cette transaction, contactez-nous.
              </p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/help')}
              >
                Contacter le support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <NavBar />
    </div>
  );
};

export default TransactionDetail;
