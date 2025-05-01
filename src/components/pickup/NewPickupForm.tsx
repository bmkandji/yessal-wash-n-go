
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import LocationSection from "./LocationSection";
import DateTimeSection from "./DateTimeSection";
import FormulasSection from "./FormulasSection";
import OptionsSection from "./OptionsSection";
import PriceSection from "./PriceSection";
import NotesSection from "./NotesSection";
import { ServiceType, Location } from "@/types";

interface NewPickupFormProps {
  isPremium: boolean;
  defaultLocation?: Location | null;
  onSuccess: () => void;
}

const NewPickupForm = ({ isPremium, defaultLocation, onSuccess }: NewPickupFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    address: defaultLocation?.address || "",
    location: {
      latitude: defaultLocation?.latitude || null,
      longitude: defaultLocation?.longitude || null,
      useAsDefault: defaultLocation?.useAsDefault || false
    },
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    notes: "",
    formula: isPremium ? "detailed" as ServiceType : "basic" as ServiceType,
    options: {
      hasIroning: isPremium || false,
      hasExpress: false,
    }
  });

  // Location methods
  const [hasLocation, setHasLocation] = useState(Boolean(formData.location.latitude && formData.location.longitude));
  
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

  // Request location on first visit if no location is saved
  useEffect(() => {
    const firstVisit = !defaultLocation?.latitude;
    if (firstVisit && !hasLocation) {
      requestLocation();
    }
  }, []);

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

  const handleAddressChange = (address: string) => {
    setFormData({
      ...formData,
      address
    });
  };

  const handleLocationChange = (location: Location) => {
    setFormData({
      ...formData,
      location
    });
  };

  const handleDefaultLocationChange = (useAsDefault: boolean) => {
    setFormData({
      ...formData,
      location: {
        ...formData.location,
        useAsDefault
      }
    });
  };

  const handleDateChange = (date: string) => {
    setFormData({
      ...formData,
      date
    });
  };

  const handleTimeChange = (time: string) => {
    setFormData({
      ...formData,
      time
    });
  };

  const handleNotesChange = (notes: string) => {
    setFormData({
      ...formData,
      notes
    });
  };

  const handleFormulaChange = (formula: ServiceType) => {
    setFormData({
      ...formData,
      formula
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
      onSuccess();
    }, 1500);
  };

  return (
    <Card>
      <CardContent className="pt-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <LocationSection 
            address={formData.address}
            location={formData.location}
            hasLocation={hasLocation}
            onLocationChange={handleLocationChange}
            onAddressChange={handleAddressChange}
            onDefaultLocationChange={handleDefaultLocationChange}
            onLocationStatusChange={setHasLocation}
          />

          <DateTimeSection 
            date={formData.date}
            time={formData.time}
            onDateChange={handleDateChange}
            onTimeChange={handleTimeChange}
          />

          <NotesSection 
            notes={formData.notes}
            onNotesChange={handleNotesChange}
          />
          
          <FormulasSection 
            formula={formData.formula}
            isPremium={isPremium}
            onFormulaChange={handleFormulaChange}
          />
          
          <OptionsSection 
            options={formData.options}
            formula={formData.formula}
            onOptionChange={handleOptionChange}
          />

          <PriceSection 
            priceDetails={priceDetails}
            formula={formData.formula}
            options={formData.options}
          />

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
  );
};

export default NewPickupForm;
