
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ServiceType } from "@/types";

interface FormulasSectionProps {
  formula: ServiceType;
  isPremium: boolean;
  onFormulaChange: (formula: ServiceType) => void;
}

const FormulasSection = ({
  formula,
  isPremium,
  onFormulaChange
}: FormulasSectionProps) => {
  return (
    <div className="border rounded-lg p-3">
      <Label className="mb-2 block font-medium">
        Formules {isPremium ? "(optionnel)" : ""}
      </Label>
      
      <RadioGroup
        value={formula}
        onValueChange={(value) => onFormulaChange(value as ServiceType)}
        className="flex flex-col space-y-3"
      >
        {/* For non-premium users, show the basic formula option */}
        {!isPremium && (
          <div className="flex items-start space-x-3">
            <RadioGroupItem value="basic" id="basic" className="mt-1" />
            <div className="flex-1">
              <Label htmlFor="basic" className="font-medium">Formule de base</Label>
              <p className="text-sm text-muted-foreground">Lavage simple dans nos machines</p>
            </div>
          </div>
        )}
        
        {/* All users can see the detailed formula option */}
        <div className="flex items-start space-x-3">
          <RadioGroupItem value="detailed" id="detailed" className="mt-1" />
          <div className="flex-1">
            <Label htmlFor="detailed" className="font-medium">Formule détaillée</Label>
            <p className="text-sm text-muted-foreground">600 F/kg, lavé, repassé et livré (minimum 6 kg)</p>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};

export default FormulasSection;
