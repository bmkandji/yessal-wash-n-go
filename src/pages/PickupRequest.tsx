
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavBar from "@/components/NavBar";
import PageHeader from "@/components/PageHeader";
import PickupRequestCard from "@/components/PickupRequestCard";
import { mockPickupRequests } from "@/lib/mockData";
import { ServiceType } from "@/types";

const PickupRequest = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("new");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    address: "",
    date: "",
    time: "",
    notes: "",
    type: "standard" as ServiceType,
    hasIroning: false,
  });

  // Filter to only show active pickup requests (not delivered or cancelled)
  const activePickupRequests = mockPickupRequests.filter(request => 
    !["delivered", "cancelled"].includes(request.status)
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRadioChange = (value: ServiceType) => {
    setFormData({
      ...formData,
      type: value,
    });
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({
      ...formData,
      hasIroning: checked,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Calculer le prix total
    const basePrice = formData.type === "standard" ? 1000 : 2000;
    const ironingPrice = formData.hasIroning ? 500 : 0;
    const totalPrice = basePrice + ironingPrice;

    // Simuler un appel API
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Demande envoyée",
        description: `Votre demande de collecte a été envoyée avec succès. Prix total: ${totalPrice} CFA`,
      });
      setActiveTab("active");
    }, 1500);
  };

  const handleViewPickupRequest = (id: string) => {
    navigate(`/pickup/${id}`);
  };

  return (
    <div className="container max-w-md mx-auto pb-20">
      <div className="p-4">
        <PageHeader title="Collecte de linge" />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="new">Nouvelle demande</TabsTrigger>
            <TabsTrigger value="active">Demandes actives</TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="mt-0">
            <Card>
              <CardContent className="pt-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse de collecte</Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="123 Rue Principale, Thiès"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Heure</Label>
                      <Input
                        id="time"
                        name="time"
                        type="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes supplémentaires</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      placeholder="Instructions spéciales pour la collecte..."
                      value={formData.notes}
                      onChange={handleChange}
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Type de service</Label>
                    <RadioGroup
                      value={formData.type}
                      onValueChange={handleRadioChange as (value: string) => void}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard" className="flex-1">
                          Standard (24-48h)
                        </Label>
                        <span className="text-sm font-medium">1000 CFA</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="express" id="express" />
                        <Label htmlFor="express" className="flex-1">
                          Express (12-24h)
                        </Label>
                        <span className="text-sm font-medium">2000 CFA</span>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="hasIroning" 
                      checked={formData.hasIroning} 
                      onCheckedChange={handleCheckboxChange}
                    />
                    <Label htmlFor="hasIroning" className="flex-1">
                      Option repassage
                    </Label>
                    <span className="text-sm font-medium">+500 CFA</span>
                  </div>

                  <div className="pt-2">
                    <div className="bg-muted p-3 rounded-md">
                      <div className="flex justify-between mb-1">
                        <span>Frais de collecte</span>
                        <span>{formData.type === "standard" ? "1000" : "2000"} CFA</span>
                      </div>
                      {formData.hasIroning && (
                        <div className="flex justify-between mb-1">
                          <span>Option repassage</span>
                          <span>500 CFA</span>
                        </div>
                      )}
                      <div className="flex justify-between font-medium border-t border-border mt-2 pt-2">
                        <span>Total</span>
                        <span>
                          {formData.type === "standard" ? 
                            (formData.hasIroning ? "1500" : "1000") : 
                            (formData.hasIroning ? "2500" : "2000")} CFA
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Envoi en cours...
                      </>
                    ) : (
                      "Envoyer la demande"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="active" className="mt-0">
            {activePickupRequests.length > 0 ? (
              <div className="space-y-3">
                {activePickupRequests.map((request) => (
                  <PickupRequestCard
                    key={request.id}
                    request={request}
                    onSelect={handleViewPickupRequest}
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
                    <path d="M12 2v4" />
                    <path d="m4.93 10.93 1.41 1.41" />
                    <path d="M2 18h2" />
                    <path d="M20 18h2" />
                    <path d="m19.07 10.93-1.41 1.41" />
                    <path d="M22 22H2" />
                    <path d="m8 22 4-10 4 10" />
                    <path d="M12 6a4 4 0 0 0-4 4v10h8V10a4 4 0 0 0-4-4Z" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg">Aucune collecte active</h3>
                <p className="text-muted-foreground mb-4">
                  Vous n'avez pas encore de demande de collecte en cours
                </p>
                <Button onClick={() => setActiveTab("new")}>
                  Nouvelle demande
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <NavBar />
    </div>
  );
};

export default PickupRequest;
