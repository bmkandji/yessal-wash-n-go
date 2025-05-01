
interface PriceDetails {
  basePrice: number;
  ironingPrice: number;
  expressPrice: number;
  totalPrice: number;
}

interface PriceSectionProps {
  priceDetails: PriceDetails;
  formula: string;
  options: {
    hasIroning: boolean;
    hasExpress: boolean;
  };
}

const PriceSection = ({ priceDetails, formula, options }: PriceSectionProps) => {
  return (
    <div className="pt-2">
      <div className="bg-muted p-3 rounded-md">
        <div className="flex justify-between mb-1">
          <span>Prix de base</span>
          <span>
            {formula === "basic" 
              ? "1000 CFA" 
              : "3600 CFA (6kg minimum)"}
          </span>
        </div>
        {options.hasIroning && formula === "basic" && (
          <div className="flex justify-between mb-1">
            <span>Option repassage</span>
            <span>500 CFA</span>
          </div>
        )}
        {options.hasExpress && (
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
  );
};

export default PriceSection;
