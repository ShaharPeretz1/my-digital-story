import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

const Resume = () => {
  return (
    <div className="container mx-auto px-4 py-16 space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto text-center space-y-6"
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
          <FileText className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-foreground">Resume</h1>
        <p className="text-lg text-muted-foreground">
          Download my latest resume to learn more about my experience, skills, and education.
        </p>
        <Button size="lg" asChild>
          <a href="/resume.pdf" download>
            <Download className="mr-2 h-4 w-4" /> Download Resume (PDF)
          </a>
        </Button>
        <p className="text-sm text-muted-foreground">
          Upload your resume PDF to <code className="text-primary">public/resume.pdf</code> to enable this download.
        </p>
      </motion.div>
    </div>
  );
};

export default Resume;
