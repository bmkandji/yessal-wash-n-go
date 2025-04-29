
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const NavBar = () => {
  const location = useLocation();
  
  const navItems = [
    {
      label: "Accueil",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      href: "/dashboard",
    },
    {
      label: "Historique",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <rect width="18" height="18" x="3" y="4" rx="2" />
          <path d="M3 10h18" />
        </svg>
      ),
      href: "/history",
    },
    {
      label: "Profil",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <circle cx="12" cy="8" r="5" />
          <path d="M20 21a8 8 0 1 0-16 0" />
        </svg>
      ),
      href: "/profile",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t flex justify-around items-center py-2 z-50">
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "flex flex-col items-center justify-center p-2 rounded-lg",
            location.pathname === item.href
              ? "text-primary"
              : "text-muted-foreground hover:text-primary"
          )}
        >
          {item.icon}
          <span className="text-xs mt-1">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default NavBar;
