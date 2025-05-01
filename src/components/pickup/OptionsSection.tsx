
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ServiceType } from "@/types";

interface PickupOptions {
  hasIroning: boolean;
  hasExpress: boolean;
}

interface OptionsSectionProps {
  options: PickupOptions;
  formula: ServiceType;
  onOptionChange: (option: keyof PickupOptions, value: boolean) => void;
}

const OptionsSection = ({
  options,
  formula,
  onOptionChange
}: OptionsSectionProps) => {
  return (
    <div className="border rounded-lg p-3">
      <Label className="mb-2 block font-medium">Options supplémentaires</Label>
      <div className="space-y-3">
        {formula === "basic" && (
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="hasIroning" 
              checked={options.hasIroning}
              onCheckedChange={(checked) => 
                onOptionChange("hasIroning", checked === true)
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
            checked={options.hasExpress}
            onCheckedChange={(checked) => 
              onOptionChange("hasExpress", checked === true)
            }
          />
          <div className="flex justify-between items-center w-full">
            <Label htmlFor="hasExpress">Service express (6h chrono)</Label>
            <span className="text-sm font-medium">+1000 CFA</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionsSection;
