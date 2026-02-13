import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Download, Briefcase, FlaskConical, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const highlights = [
  {
    icon: FlaskConical,
    title: "R&D Engineering",
    description: "Hands-on experience developing medical devices at a leading company.",
  },
  {
    icon: Briefcase,
    title: "Product Management",
    description: "Led cross-functional teams at a medical device startup.",
  },
  {
    icon: Lightbulb,
    title: "Bioengineering",
    description: "Master's student focusing on medical device development.",
  },
];

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="flex flex-col items-center gap-12 md:flex-row">
          <motion.div
            className="flex-1 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Bioengineering × Product Management
            </p>
            <h1 className="text-4xl font-bold leading-tight text-foreground md:text-6xl">
              Building the Future of{" "}
              <span className="text-primary">Medical Technology</span>
            </h1>
            <p className="max-w-lg text-lg text-muted-foreground">
              Master's student in bioengineering with product management and R&D
              experience, passionate about bringing innovative medical devices to
              life.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/projects">
                <Button size="lg">
                  View Projects <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/resume">
                <Button variant="outline" size="lg">
                  <Download className="mr-1 h-4 w-4" /> Download Resume
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Avatar className="h-56 w-56 border-4 border-primary/20 shadow-xl md:h-72 md:w-72">
              <AvatarFallback className="bg-primary/10 text-4xl font-display text-primary">
                YN
              </AvatarFallback>
            </Avatar>
          </motion.div>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-muted/40 py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-3">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              >
                <Card className="h-full border-none bg-card shadow-md transition-shadow hover:shadow-lg">
                  <CardContent className="flex flex-col items-start gap-3 p-6">
                    <div className="rounded-lg bg-primary/10 p-2.5">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
