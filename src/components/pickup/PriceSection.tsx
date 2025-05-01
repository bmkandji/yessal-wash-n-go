
interface PriceDetails {
  basePrice: number;
  ironingPrice: number;
  expressPrice: number;
  subtotal: number;
  discountAmount: number;
  hasStudentDiscount: boolean;
  totalPrice: number;
}

interface PriceSectionProps {
  priceDetails: PriceDetails;
  formula: string;
  options: {
    hasIroning: boolean;
    hasExpress: boolean;
  };
  isStudent?: boolean;
}

const PriceSection = ({ priceDetails, formula, options, isStudent }: PriceSectionProps) => {
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
        
        {priceDetails.subtotal !== priceDetails.totalPrice && (
          <>
            <div className="flex justify-between mb-1 pt-1 border-t border-border">
              <span>Sous-total</span>
              <span>{priceDetails.subtotal} CFA</span>
            </div>
            {isStudent && priceDetails.discountAmount > 0 && (
              <div className="flex justify-between mb-1 text-green-600">
                <span>Réduction étudiant (10%)</span>
                <span>-{priceDetails.discountAmount} CFA</span>
              </div>
            )}
          </>
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
