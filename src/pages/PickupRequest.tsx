
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavBar from "@/components/NavBar";
import PageHeader from "@/components/PageHeader";
import { mockPickupRequests, mockUser } from "@/lib/mockData";
import NewPickupForm from "@/components/pickup/NewPickupForm";
import ActivePickupRequests from "@/components/pickup/ActivePickupRequests";

const PickupRequest = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("new");
  
  // Check if the user has a premium subscription
  const isPremium = mockUser.subscription === 'premium';

  // Filter to only show active pickup requests (not delivered or cancelled)
  const activePickupRequests = mockPickupRequests.filter(request => 
    !["delivered", "cancelled"].includes(request.status)
  );

  const handleFormSuccess = () => {
    setActiveTab("active");
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
            <NewPickupForm 
              isPremium={isPremium}
              defaultLocation={mockUser.defaultLocation}
              onSuccess={handleFormSuccess}
            />
          </TabsContent>

          <TabsContent value="active" className="mt-0">
            <ActivePickupRequests 
              requests={activePickupRequests}
              onViewRequest={handleViewPickupRequest}
            />
            {activePickupRequests.length === 0 && (
              <Button onClick={() => setActiveTab("new")}>
                Nouvelle demande
              </Button>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <NavBar />
    </div>
  );
};

export default PickupRequest;
