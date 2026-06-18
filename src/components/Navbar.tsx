import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut } from "lucide-react";
import logo from "@/assets/logo.png";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const publicLinks = [
  { to: "/", label: "Home" },
  { to: "/schemes", label: "Schemes" },
  { to: "/fd-planner", label: "FD Planner" },
  { to: "/insurance", label: "Insurance" },
  { to: "/eligibility", label: "Eligibility" },
  { to: "/contact", label: "Contact" },
];

const authLinks = [
  { to: "/apply", label: "Loans" },
  { to: "/ai-advisor", label: "AI Advisor" },
  { to: "/profile", label: "Profile" },
];

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const allLinks = [...publicLinks, ...(user ? authLinks : [])];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="FinAssist AI" className="h-6 w-6" />
          <span className="text-sm font-bold tracking-tight">FinAssist AI</span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {allLinks.map((l) => (
            <Link key={l.to} to={l.to} className="text-xs px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              {l.label}
            </Link>
          ))}
          <ThemeToggle />
          {user ? (
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-xs">
              <LogOut className="h-3.5 w-3.5 mr-1" /> Sign Out
            </Button>
          ) : (
            <Button size="sm" onClick={() => navigate("/auth")} className="text-xs">Get Started</Button>
          )}
        </div>

        {/* Mobile */}
        <button className="lg:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background p-4 space-y-1 max-h-[70vh] overflow-y-auto">
          {allLinks.map((l) => (
            <Link key={l.to} to={l.to} className="block text-sm py-2 px-3 rounded-md hover:bg-muted transition-colors" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          {user ? (
            <Button variant="ghost" size="sm" className="w-full justify-start mt-2" onClick={() => { handleSignOut(); setOpen(false); }}>
              <LogOut className="h-3.5 w-3.5 mr-1" /> Sign Out
            </Button>
          ) : (
            <Button size="sm" className="w-full mt-2" onClick={() => { navigate("/auth"); setOpen(false); }}>Get Started</Button>
          )}
        </div>
      )}
    </nav>
  );
}
