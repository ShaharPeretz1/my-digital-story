import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Heart, MapPin } from "lucide-react";

const skills = [
  "Product Management", "R&D Engineering", "Medical Devices", "Project Management",
  "Cross-functional Leadership", "Design Controls", "Risk Management", "Agile/Scrum",
  "Stakeholder Management", "FDA Regulations", "Prototyping", "Data Analysis",
];

const hobbies = ["Hiking", "Cooking", "Reading", "Traveling", "Photography"];

const timeline = [
  { year: "2020", title: "B.Sc. Biomedical Engineering", description: "Graduated with a bachelor's degree in biomedical engineering." },
  { year: "2020–2022", title: "R&D Engineer", description: "Worked at a large medical device company developing innovative products." },
  { year: "2022–2024", title: "Product Manager", description: "Led product strategy at a medical device startup." },
  { year: "2024–Present", title: "M.S. Bioengineering", description: "Pursuing a master's degree in bioengineering, focusing on medical device development." },
];

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const About = () => {
  return (
    <div className="container mx-auto px-4 py-16 space-y-16">
      {/* Intro */}
      <motion.section className="max-w-3xl space-y-6" {...fade}>
        <h1 className="text-4xl font-bold text-foreground">About Me</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          I'm a bioengineering master's student who moved to the U.S. with my husband
          to pursue my passion for medical device development. My journey started with
          a bachelor's degree in biomedical engineering, followed by hands-on R&D
          experience at a leading medical device company, and then transitioning into
          product management at a startup.
        </p>
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-primary" /> United States</span>
          <span className="flex items-center gap-1"><GraduationCap className="h-4 w-4 text-primary" /> M.S. Bioengineering (2026)</span>
        </div>
      </motion.section>

      {/* Skills */}
      <motion.section className="space-y-4" {...fade} transition={{ duration: 0.5, delay: 0.1 }}>
        <h2 className="text-2xl font-bold text-foreground">Skills & Competencies</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="bg-primary/10 text-primary border-none px-3 py-1">
              {skill}
            </Badge>
          ))}
        </div>
      </motion.section>

      {/* Hobbies */}
      <motion.section className="space-y-4" {...fade} transition={{ duration: 0.5, delay: 0.15 }}>
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" /> Hobbies & Interests
        </h2>
        <div className="flex flex-wrap gap-2">
          {hobbies.map((hobby) => (
            <Badge key={hobby} variant="outline" className="px-3 py-1">
              {hobby}
            </Badge>
          ))}
        </div>
      </motion.section>

      {/* Timeline */}
      <motion.section className="space-y-6" {...fade} transition={{ duration: 0.5, delay: 0.2 }}>
        <h2 className="text-2xl font-bold text-foreground">My Journey</h2>
        <div className="relative space-y-6 border-l-2 border-primary/30 pl-6">
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="border-none shadow-sm">
                <CardContent className="p-4">
                  <p className="text-xs font-semibold text-primary">{item.year}</p>
                  <h3 className="font-display text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default About;
