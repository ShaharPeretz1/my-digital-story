import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Calendar } from "lucide-react";

const experiences = [
  {
    role: "Product Manager",
    company: "Medical Device Startup",
    period: "2022 – 2024",
    type: "Full-time",
    description:
      "Led end-to-end product development for innovative medical devices. Managed cross-functional teams including engineering, regulatory, and clinical affairs.",
    accomplishments: [
      "Drove product roadmap from concept to FDA submission",
      "Managed a $2M+ development budget",
      "Led a cross-functional team of 12 engineers and designers",
      "Reduced time-to-market by 30% through process improvements",
    ],
    tags: ["Product Strategy", "FDA Submissions", "Cross-functional Leadership"],
  },
  {
    role: "R&D Engineer",
    company: "Large Medical Device Company",
    period: "2020 – 2022",
    type: "Full-time",
    description:
      "Designed and developed medical device components and subsystems. Conducted testing, verification, and validation activities per FDA design controls.",
    accomplishments: [
      "Developed 3 new product features that increased device performance by 25%",
      "Led design verification and validation testing",
      "Authored technical documentation for regulatory submissions",
      "Mentored 2 junior engineers",
    ],
    tags: ["Design Controls", "Prototyping", "V&V Testing", "Risk Analysis"],
  },
];

const Experience = () => {
  return (
    <div className="container mx-auto px-4 py-16 space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-foreground">Experience</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          My professional journey in medical device development.
        </p>
      </motion.div>

      <div className="relative space-y-8 border-l-2 border-primary/30 pl-8">
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="relative"
          >
            {/* dot */}
            <div className="absolute -left-[calc(2rem+5px)] top-2 h-3 w-3 rounded-full border-2 border-primary bg-background" />
            <Card className="border-none shadow-md">
              <CardContent className="p-6 space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground">{exp.role}</h3>
                    <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Building2 className="h-4 w-4" /> {exp.company}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" /> {exp.period}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{exp.description}</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-foreground/80">
                  {exp.accomplishments.map((a, j) => (
                    <li key={j}>{a}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 pt-1">
                  {exp.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary border-none text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
