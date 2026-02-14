import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="text-xl font-semibold text-foreground hover:text-primary transition-colors">
          Shahar Berger
        </Link>

        {/* Resume Download Button */}
        <a href="/assets/Shahar_Berger_Resume.pdf" download>
          <Button size="sm" variant="default">
            <Download className="h-4 w-4 mr-2" />
            Resume
          </Button>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
