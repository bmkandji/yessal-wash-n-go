
import { useState, useEffect } from "react";
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
import { mockPickupRequests, mockUser } from "@/lib/mockData";
import { ServiceType } from "@/types";
import { MapPin, Clock, Calendar } from "lucide-react";

const PickupRequest = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("new");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  
  // Check if the user has a premium subscription
  const isPremium = mockUser.subscription === 'premium';

  const [formData, setFormData] = useState({
    address: mockUser.defaultLocation?.address || "",
    location: {
      latitude: mockUser.defaultLocation?.latitude || null,
      longitude: mockUser.defaultLocation?.longitude || null,
      useAsDefault: mockUser.defaultLocation?.useAsDefault || false
    },
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    notes: "",
    formula: isPremium ? "detailed" : "basic", // Only detailed formula for premium users
    options: {
      hasIroning: isPremium || false, // Auto-checked for detailed formula
      hasExpress: false,
    }
  });

  // Location methods
  const [hasLocation, setHasLocation] = useState(Boolean(formData.location.latitude && formData.location.longitude));
  
  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            location: {
              ...prev.location,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          }));
          setHasLocation(true);
          toast({
            title: "Localisation obtenue",
            description: "Vos coordonnées GPS ont été enregistrées avec succès.",
          });
        },
        (error) => {
          console.error("Erreur de géolocalisation:", error);
          toast({
            title: "Erreur de localisation",
            description: "Impossible d'obtenir votre position. Veuillez autoriser l'accès à votre localisation.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Géolocalisation non supportée",
        description: "Votre navigateur ne prend pas en charge la géolocalisation.",
        variant: "destructive",
      });
    }
  };

  // Request location on first visit if no location is saved
  useEffect(() => {
    const firstVisit = !mockUser.defaultLocation?.latitude;
    if (firstVisit && !hasLocation) {
      requestLocation();
    }
  }, []);

  // Filter to only show active pickup requests (not delivered or cancelled)
  const activePickupRequests = mockPickupRequests.filter(request => 
    !["delivered", "cancelled"].includes(request.status)
  );

  // Effect to automatically check ironing option when detailed formula is selected
  useEffect(() => {
    if (formData.formula === "detailed") {
      setFormData(prev => ({
        ...prev,
        options: {
          ...prev.options,
          hasIroning: true
        }
      }));
    }
  }, [formData.formula]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormulaChange = (value: string) => {
    setFormData({
      ...formData,
      formula: value,
    });
  };

  const handleOptionChange = (option: keyof typeof formData.options, checked: boolean) => {
    setFormData({
      ...formData,
      options: {
        ...formData.options,
        [option]: checked,
      }
    });
  };

  const handleLocationDefaultChange = (checked: boolean) => {
    setFormData({
      ...formData,
      location: {
        ...formData.location,
        useAsDefault: checked
      }
    });
  };

  const calculatePrice = () => {
    // Base price calculation
    let basePrice = 0;
    
    if (formData.formula === "basic") {
      // For basic formula, standard price
      basePrice = 1000;
    } else {
      // For detailed formula (per kg), minimum 6kg at 600F/kg
      basePrice = 6 * 600; // 3600 CFA
    }
    
    // Additional options
    const ironingPrice = formData.options.hasIroning && formData.formula === "basic" ? 500 : 0;
    const expressPrice = formData.options.hasExpress ? 1000 : 0;
    
    return {
      basePrice,
      ironingPrice,
      expressPrice,
      totalPrice: basePrice + ironingPrice + expressPrice
    };
  };

  const priceDetails = calculatePrice();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if location has been provided
    if (!hasLocation) {
      toast({
        title: "Localisation requise",
        description: "Veuillez autoriser l'accès à votre localisation pour continuer.",
        variant: "destructive",
      });
      requestLocation();
      return;
    }

    setIsSubmitting(true);

    // Simuler un appel API
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Demande envoyée",
        description: `Votre demande de collecte a été envoyée avec succès. Prix total: ${priceDetails.totalPrice} CFA`,
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
                  {/* Location Section */}
                  <div className="space-y-2">
                    <Label htmlFor="location" className="flex items-center gap-1">
                      <MapPin size={16} />
                      Localisation
                    </Label>
                    
                    <div className={`border rounded-lg p-3 ${!hasLocation ? 'border-red-300 bg-red-50' : ''}`}>
                      {hasLocation ? (
                        <div className="space-y-2">
                          <div onClick={requestLocation} className="flex gap-2 items-center cursor-pointer text-sm p-1 hover:bg-muted rounded">
                            <span className="text-muted-foreground">Coordonnées GPS:</span>
                            <span className="font-medium">
                              {formData.location.latitude?.toFixed(6)}, {formData.location.longitude?.toFixed(6)}
                            </span>
                            <span className="text-xs text-blue-600 ml-auto">Modifier</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 mt-2">
                            <Checkbox 
                              id="defaultLocation" 
                              checked={formData.location.useAsDefault}
                              onCheckedChange={(checked) => handleLocationDefaultChange(checked === true)}
                            />
                            <Label htmlFor="defaultLocation" className="text-sm">
                              Utiliser cette localisation par défaut
                            </Label>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <p className="text-sm text-red-600 mb-2">Veuillez autoriser l'accès à votre localisation</p>
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm" 
                            onClick={requestLocation}
                            className="w-full"
                          >
                            Partager ma localisation
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-1 mt-2">
                      <Label htmlFor="address" className="text-sm">Adresse (optionnel)</Label>
                      <Input
                        id="address"
                        name="address"
                        placeholder="123 Rue Principale, Thiès"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date" className="flex items-center gap-1">
                        <Calendar size={16} />
                        Date
                      </Label>
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
                      <Label htmlFor="time" className="flex items-center gap-1">
                        <Clock size={16} />
                        Heure
                      </Label>
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
                  
                  {/* Formules */}
                  <div className="border rounded-lg p-3">
                    <Label className="mb-2 block font-medium">Formules</Label>
                    <RadioGroup
                      value={formData.formula}
                      onValueChange={handleFormulaChange}
                      className="flex flex-col space-y-3"
                    >
                      {!isPremium && (
                        <div className="flex items-start space-x-3">
                          <RadioGroupItem value="basic" id="basic" className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor="basic" className="font-medium">Formule de base</Label>
                            <p className="text-sm text-muted-foreground">Lavage simple dans nos machines</p>
                          </div>
                        </div>
                      )}
                      <div className="flex items-start space-x-3">
                        <RadioGroupItem value="detailed" id="detailed" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="detailed" className="font-medium">Formule détaillée</Label>
                          <p className="text-sm text-muted-foreground">600 F/kg, lavé, repassé et livré (minimum 6 kg)</p>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  {/* Options supplémentaires */}
                  <div className="border rounded-lg p-3">
                    <Label className="mb-2 block font-medium">Options supplémentaires</Label>
                    <div className="space-y-3">
                      {formData.formula === "basic" && (
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="hasIroning" 
                            checked={formData.options.hasIroning}
                            onCheckedChange={(checked) => 
                              handleOptionChange("hasIroning", checked === true)
                            }
                          />
                          <div className="flex justify-between items-center w-full">
                            <Label htmlFor="hasIroning">
                              Option repassage (kg)
                            </Label>
                            <span className="text-sm font-medium">+500 CFA</span>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="hasExpress" 
                          checked={formData.options.hasExpress}
                          onCheckedChange={(checked) => 
                            handleOptionChange("hasExpress", checked === true)
                          }
                        />
                        <div className="flex justify-between items-center w-full">
                          <Label htmlFor="hasExpress">Service express (6h chrono)</Label>
                          <span className="text-sm font-medium">+1000 CFA</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="bg-muted p-3 rounded-md">
                      <div className="flex justify-between mb-1">
                        <span>Prix de base</span>
                        <span>
                          {formData.formula === "basic" 
                            ? "1000 CFA" 
                            : "3600 CFA (6kg minimum)"}
                        </span>
                      </div>
                      {formData.options.hasIroning && formData.formula === "basic" && (
                        <div className="flex justify-between mb-1">
                          <span>Option repassage</span>
                          <span>500 CFA</span>
                        </div>
                      )}
                      {formData.options.hasExpress && (
                        <div className="flex justify-between mb-1">
                          <span>Service express</span>
                          <span>1000 CFA</span>
                        </div>
                      )}
                      <div className="flex justify-between font-medium border-t border-border mt-2 pt-2">
                        <span>Total</span>
                        <span>{priceDetails.totalPrice} CFA</span>
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
