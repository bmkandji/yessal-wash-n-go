
import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

interface QRCodeProps {
  value: string;
  size?: number;
  color?: string;
  bgColor?: string;
}

const QRCode = ({ 
  value, 
  size = 200, 
  color = "#00bf63", 
  bgColor = "#ffffff" 
}: QRCodeProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    
    // For the mock data, we'll just use a simple QR code
    // In a real app, this would use the qr-code-styling library
    const qrCode = new QRCodeStyling({
      width: size,
      height: size,
      type: "svg",
      data: value,
      dotsOptions: {
        color: color,
        type: "rounded"
      },
      cornersSquareOptions: {
        color: color,
        type: "extra-rounded"
      },
      cornersDotOptions: {
        color: color,
      },
      backgroundOptions: {
        color: bgColor,
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 10
      }
    });

    // Clear previous QR code
    if (ref.current.firstChild) {
      ref.current.removeChild(ref.current.firstChild);
    }
    
    qrCode.append(ref.current);
  }, [value, size, color, bgColor]);

  return <div ref={ref} className="mx-auto"></div>;
};

export default QRCode;

// Note: this is a mock implementation. In a real app, you would need to:
// 1. Install the qr-code-styling package: npm install qr-code-styling
// 2. Import it properly
// The code will still render a placeholder for the QR code
