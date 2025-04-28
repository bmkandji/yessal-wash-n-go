
import { useState } from "react";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import PageHeader from "@/components/PageHeader";

const WebView = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="container max-w-md mx-auto pb-20 flex flex-col min-h-screen">
      <div className="p-4">
        <PageHeader
          title="Site web Yessal"
          showBackButton
        />
      </div>

      <div className="flex-1 flex flex-col">
        {loading && (
          <div className="flex flex-col items-center justify-center p-10 flex-1">
            <div className="w-12 h-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin mb-4"></div>
            <p className="text-muted-foreground">Chargement du site...</p>
          </div>
        )}

        <iframe
          src="https://yessal.sn"
          className={`w-full flex-1 ${loading ? "hidden" : "block"}`}
          onLoad={() => setLoading(false)}
          title="Site web Yessal"
        ></iframe>

        {!loading && (
          <div className="p-4 bg-background border-t">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.open("https://yessal.sn", "_blank")}
            >
              Ouvrir dans le navigateur
            </Button>
          </div>
        )}
      </div>

      <NavBar />
    </div>
  );
};

export default WebView;
