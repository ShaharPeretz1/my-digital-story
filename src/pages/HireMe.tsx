import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Rocket, Target, Sparkles, GraduationCap, ArrowRight } from "lucide-react";

const strengths = [
  {
    icon: Target,
    title: "Cross-functional Leadership",
    description: "Led teams of engineers, designers, and regulatory specialists to deliver medical devices on time and within budget.",
  },
  {
    icon: Rocket,
    title: "Technical Product Vision",
    description: "Bridging the gap between engineering feasibility and market needs, with deep understanding of both sides.",
  },
  {
    icon: Sparkles,
    title: "Regulatory & Quality Expertise",
    description: "Hands-on experience with FDA design controls, risk management, and quality management systems.",
  },
];

const HireMe = () => {
  return (
    <div className="container mx-auto px-4 py-16 space-y-16">
      <motion.section
        className="max-w-3xl space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-foreground">Hire Me</h1>
        <div className="flex items-center gap-2 text-primary">
          <GraduationCap className="h-5 w-5" />
          <p className="text-sm font-semibold">Graduating May 2026 · Seeking full-time roles</p>
        </div>
        <p className="text-lg text-muted-foreground leading-relaxed">
          I'm a bioengineering master's student graduating in May 2026 and actively seeking
          full-time roles in <strong className="text-foreground">product/project management within medtech</strong>.
          I bring a unique combination of R&D engineering depth and product management
          experience that allows me to lead technical teams and deliver results.
        </p>
      </motion.section>

      {/* Strengths */}
      <motion.section
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold text-foreground">What I Bring</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {strengths.map((s, i) => (
            <Card key={i} className="border-none shadow-md">
              <CardContent className="p-6 space-y-3">
                <div className="rounded-lg bg-primary/10 p-2.5 w-fit">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        className="rounded-2xl bg-primary/5 border border-primary/10 p-8 text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-foreground">Let's Connect</h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          I'd love to chat about how I can contribute to your team. Feel free to reach out!
        </p>
        <Link to="/contact">
          <Button size="lg">
            Get in Touch <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </motion.section>
    </div>
  );
};

export default HireMe;
