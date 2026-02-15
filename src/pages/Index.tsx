import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Github, Download, FileText, Code2, ArrowLeft, ExternalLink, MapPin, GraduationCap, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Project categories
const categories = [
  { id: "all", label: "All Projects", color: "primary" },
  { id: "medical-devices", label: "Medical Devices", color: "secondary" },
  { id: "research", label: "Research", color: "accent" },
  { id: "ml-ai", label: "ML & AI", color: "primary" },
];

// Expanded projects data with visual elements
const projects = [
  {
    id: "giview",
    title: "GI View Solo Scope",
    subtitle: "FDA Class II Colonoscopy System",
    category: "medical-devices",
    discipline: "Product Engineering • Medical Devices • FDA Regulation",
    organization: "GI View Ltd., Israel",
    role: "Product Lead Engineer",
    duration: "2022-2024",
    image: "/assets/projects/giview-device.jpg", // You'll upload this
    shortDescription: "Led development of single-use colonoscopy systems from concept through FDA approval to market launch.",
    fullDescription: `Managed complete product lifecycle for three FDA Class II single-use colonoscopy devices. 
    Transformed automotive-grade cameras into medical imaging systems through custom CMOS sensor calibration, 
    achieving 90% improvement in visualization quality. Designed manufacturing automation tools that increased 
    production yield from 20% to 80%, enabling commercial scalability.`,
    challenge: "Transform off-the-shelf automotive cameras into medical-grade imaging systems for dark, LED-illuminated colonoscopy environments while meeting FDA Class II regulatory requirements.",
    approach: [
      "Developed custom CMOS sensor ISP calibration methodology for medical imaging",
      "Designed precision manufacturing automation tools using SolidWorks",
      "Led cross-functional teams: 4 external consultants + medical advisors",
      "Created complete product roadmap and UI specifications for 3 systems"
    ],
    outcomes: [
      "90% improvement in image visualization quality",
      "Production yield increased from 20% to 80%",
      "Successfully launched 3 FDA Class II approved devices",
      "Achieved 200° field of view (vs. 140° industry standard)"
    ],
    skills: ["CMOS Calibration", "Image Processing", "SolidWorks", "FDA 21 CFR 820", "ISO 13485", "Manufacturing Automation", "Product Management"],
    githubLink: null, // Add if you have code to share
    reportFiles: [
      { name: "Product Specification", url: "/assets/reports/giview-spec.pdf" },
      { name: "Technical Overview", url: "/assets/reports/giview-tech.pdf" }
    ],
    externalLink: "https://www.giview.com/advantages",
    images: [
      "/assets/projects/giview-device.jpg",
      "/assets/projects/giview-tools.jpg",
      "/assets/projects/giview-results.jpg"
    ]
  },
  {
    id: "lidar",
    title: "LiDAR Motion Analysis",
    subtitle: "Wearable Stability Assessment System",
    category: "research",
    discipline: "Biomechanics • Wearable Sensors • Clinical Research",
    organization: "Tel Aviv University & SitnStand",
    role: "Research Engineer",
    duration: "2023",
    image: "/assets/projects/lidar-device.jpg",
    shortDescription: "Designed wearable LiDAR system for real-time fall risk assessment in assistive medical devices.",
    fullDescription: `Developed novel wearable LiDAR-based motion capture system to validate safety of assistive 
    medical device for people with mobility challenges. Created MATLAB algorithms for real-time movement 
    classification and fall risk assessment. Conducted clinical testing across 12 subjects, generating 
    regulatory-grade safety data.`,
    challenge: "Quantify movement stability and fall risk during sit-to-stand transitions for regulatory approval of assistive mobility device.",
    approach: [
      "Designed custom wearable LiDAR sensor integration",
      "Developed MATLAB algorithms for real-time movement classification",
      "Built automated data pipeline: capture → process → analyze",
      "Designed clinical testing protocol for 12 subjects"
    ],
    outcomes: [
      "Successfully validated device safety across all test subjects",
      "Provided quantitative data for regulatory submissions",
      "Demonstrated novel LiDAR application in biomechanics",
      "Complete research report and poster delivered"
    ],
    skills: ["LiDAR Systems", "MATLAB", "Biomechanics", "Wearable Devices", "Signal Processing", "Clinical Research"],
    githubLink: "https://github.com/yourusername/lidar-motion-analysis", // Add your actual link
    reportFiles: [
      { name: "Research Report", url: "/assets/reports/lidar-full-report.pdf" },
      { name: "Research Poster", url: "/assets/reports/lidar-poster.pdf" }
    ],
    externalLink: null,
    images: [
      "/assets/projects/lidar-device.jpg",
      "/assets/projects/lidar-data.jpg",
      "/assets/projects/lidar-results.jpg"
    ]
  },
  {
    id: "ml-signals",
    title: "ML Signal Classification",
    subtitle: "Physiological State Detection",
    category: "ml-ai",
    discipline: "Machine Learning • Signal Processing • Mobile Health",
    organization: "Tel Aviv University Data Science Lab",
    role: "Data Science Researcher",
    duration: "2023",
    image: "/assets/projects/ml-signals.jpg",
    shortDescription: "Built ML models to classify gestures and daily burden from mobile sensor data.",
    fullDescription: `Developed machine learning pipeline to extract meaningful insights from multi-modal mobile 
    sensor data. Created models for hand gesture recognition and daily burden assessment using accelerometer, 
    gyroscope, and touch interaction data. Implemented automated feature engineering and model deployment.`,
    challenge: "Extract meaningful behavioral patterns from noisy multi-modal mobile sensor data without requiring explicit user input.",
    approach: [
      "Built Python ML pipeline with scikit-learn and TensorFlow",
      "Implemented automated time/frequency domain feature engineering",
      "Developed multi-modal sensor fusion algorithms",
      "Created gesture and burden classification models"
    ],
    outcomes: [
      "Successfully classified hand gestures from motion data",
      "Assessed daily burden levels from usage patterns",
      "Demonstrated biomedical signal processing expertise",
      "Complete Python codebase and documentation"
    ],
    skills: ["Python", "scikit-learn", "TensorFlow", "Feature Engineering", "Signal Processing", "Data Analysis"],
    githubLink: "https://github.com/yourusername/ml-signal-classification",
    reportFiles: [
      { name: "Technical Report", url: "/assets/reports/ml-signals-report.pdf" }
    ],
    externalLink: null,
    images: [
      "/assets/projects/ml-code.jpg",
      "/assets/projects/ml-results.jpg"
    ]
  },
  {
    id: "nxstage",
    title: "Hemodialysis System Analysis",
    subtitle: "Medical Device Validation",
    category: "medical-devices",
    discipline: "System Engineering • Regulatory Compliance • V&V",
    organization: "NxStage Medical (Fresenius)",
    role: "R&D System Engineer II",
    duration: "2025 (Current)",
    image: "/assets/projects/hemodialysis.jpg",
    shortDescription: "Root-cause analysis and validation testing for Class II home hemodialysis device.",
    fullDescription: `Conducting comprehensive investigation of on-market hemodialysis device following 
    regulatory-driven material changes. Designed multi-variable test protocols integrating mechanical, 
    hardware, and software validation. Ensuring continued device safety and MDR compliance.`,
    challenge: "Validate device performance after material substitution while maintaining regulatory compliance and patient safety.",
    approach: [
      "Multi-variable data analysis in MATLAB",
      "Designed 6 comprehensive system-level test protocols",
      "Integrated mechanical, hardware, software testing",
      "Cross-team collaboration (engineering, quality, regulatory)"
    ],
    outcomes: [
      "Successfully validated design modifications",
      "Maintained MDR compliance throughout",
      "Framework for future change evaluations",
      "Continued device reliability ensured"
    ],
    skills: ["MATLAB", "System Engineering", "Root-Cause Analysis", "V&V", "MDR", "21 CFR 820"],
    githubLink: null,
    reportFiles: [], // May not be shareable due to NDA
    externalLink: null,
    images: [
      "/assets/projects/hemodialysis.jpg"
    ]
  },
  // Add more projects here easily
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState("home");

  const filteredProjects = selectedCategory === "all" 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const openProject = (project) => {
    setSelectedProject(project);
  };

  const closeProject = () => {
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b bg-white">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Photo */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20">
                <img 
                  src="/assets/LinkedIn Profile.png" 
                  alt="Shahar Berger" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-semibold text-foreground mb-1">Shahar Berger</h1>
              <p className="text-lg text-muted-foreground mb-3">
                Product Engineer • Medical Devices • Bioengineering
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  <span>Boston, MA</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4" />
                  <span>M.S. Bioengineering, Northeastern (May 2026) • 4.0 GPA</span>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-foreground/80 mb-4 max-w-2xl">
                I develop medical devices from concept to market. My work spans product engineering, 
                FDA regulation, manufacturing automation, and technical leadership. Passionate about 
                building innovative healthcare solutions that improve patient outcomes.
              </p>

              <div className="flex flex-wrap gap-2">
                <a href="mailto:peretz.s@northeastern.edu">
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4 mr-1.5" />
                    Email
                  </Button>
                </a>
                <a href="https://linkedin.com/in/shahar-berger1" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">
                    <Linkedin className="h-4 w-4 mr-1.5" />
                    LinkedIn
                  </Button>
                </a>
                <a href="https://github.com/ShaharPeretz1" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">
                    <Github className="h-4 w-4 mr-1.5" />
                    GitHub
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8 max-w-6xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="home">Projects</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          {/* PROJECTS TAB */}
          <TabsContent value="home" className="space-y-6">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.id)}
                  className="rounded-full"
                >
                  {cat.label}
                </Button>
              ))}
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card 
                    className="overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 group"
                    onClick={() => openProject(project)}
                  >
                    {/* Project Image */}
                    <div className="h-48 bg-gradient-card relative overflow-hidden">
                      {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-primary">
                          <span className="text-white text-xl font-semibold">{project.title}</span>
                        </div>
                      )}
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-white/90 text-foreground">
                          {project.duration.split(" ")[0]}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-5">
                      <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-primary mb-2">{project.subtitle}</p>
                      <p className="text-xs text-muted-foreground mb-3">{project.discipline}</p>
                      <p className="text-sm text-foreground/80 line-clamp-2 mb-3">
                        {project.shortDescription}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {project.skills.slice(0, 3).map((skill, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {project.skills.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{project.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* EXPERIENCE TAB */}
          <TabsContent value="experience" className="space-y-8">
            <div className="relative space-y-8 border-l-2 border-primary/30 pl-8">
              {[
                {
                  role: "R&D System Engineer II",
                  company: "NxStage Medical (Fresenius Medical Care)",
                  period: "Jan 2025 – Present",
                  description: "Root-cause analysis and validation testing for Class II home hemodialysis device. Designed multi-variable test protocols integrating mechanical, hardware, and software validation.",
                  accomplishments: [
                    "Designed 6 comprehensive system-level test protocols",
                    "Multi-variable data analysis in MATLAB",
                    "Cross-team collaboration (engineering, quality, regulatory)",
                    "Maintaining MDR compliance throughout material changes",
                  ],
                  tags: ["MATLAB", "System Engineering", "V&V", "MDR", "21 CFR 820"],
                },
                {
                  role: "Product Lead Engineer",
                  company: "GI View Ltd.",
                  period: "2022 – 2024",
                  description: "Led end-to-end product development for three FDA Class II single-use colonoscopy devices. Managed cross-functional teams and drove products from concept through FDA approval to market launch.",
                  accomplishments: [
                    "90% improvement in image visualization quality via custom CMOS sensor calibration",
                    "Production yield increased from 20% to 80% through manufacturing automation",
                    "Successfully launched 3 FDA Class II approved devices",
                    "Led cross-functional team of 4 external consultants + medical advisors",
                  ],
                  tags: ["Product Management", "FDA Submissions", "CMOS Calibration", "SolidWorks"],
                },
                {
                  role: "R&D Engineer",
                  company: "GI View Ltd.",
                  period: "2020 – 2022",
                  description: "Designed and developed medical device components and subsystems. Conducted testing, verification, and validation activities per FDA design controls.",
                  accomplishments: [
                    "Developed new product features increasing device performance by 25%",
                    "Led design verification and validation testing",
                    "Authored technical documentation for regulatory submissions",
                    "Mentored junior engineers",
                  ],
                  tags: ["Design Controls", "Prototyping", "V&V Testing", "Risk Analysis"],
                },
              ].map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="relative"
                >
                  <div className="absolute -left-[calc(2rem+5px)] top-2 h-3 w-3 rounded-full border-2 border-primary bg-background" />
                  <Card className="border-none shadow-md">
                    <CardContent className="p-6 space-y-3">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">{exp.role}</h3>
                          <p className="text-sm text-muted-foreground">{exp.company}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">{exp.period}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{exp.description}</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-foreground/80">
                        {exp.accomplishments.map((a, j) => <li key={j}>{a}</li>)}
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

            {/* Education */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Education</h2>
              <div className="space-y-4">
                {[
                  { degree: "M.S. Bioengineering", school: "Northeastern University, Boston", year: "2024 – 2026", detail: "GPA: 4.0/4.0" },
                  { degree: "B.Sc. Biomedical Engineering", school: "Tel Aviv University, Israel", year: "2017 – 2020", detail: "" },
                ].map((edu, i) => (
                  <Card key={i} className="border-none shadow-sm">
                    <CardContent className="p-4 flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                        <p className="text-sm text-muted-foreground">{edu.school}</p>
                        {edu.detail && <p className="text-sm text-primary font-medium mt-1">{edu.detail}</p>}
                      </div>
                      <span className="text-sm text-muted-foreground">{edu.year}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* ABOUT TAB */}
          <TabsContent value="about" className="space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="max-w-3xl space-y-6">
                <h2 className="text-2xl font-bold text-foreground">About Me</h2>
                <p className="text-foreground/80 leading-relaxed">
                  I'm a bioengineering master's student at Northeastern University who moved to the U.S. with my husband
                  to pursue my passion for medical device development. My journey started with a bachelor's degree in 
                  biomedical engineering from Tel Aviv University, followed by hands-on R&D experience and product 
                  leadership at GI View, a medical device company specializing in colonoscopy systems. Now I'm combining 
                  my engineering background with advanced studies while working at NxStage Medical (Fresenius).
                </p>
                <p className="text-foreground/80 leading-relaxed">
                  I'm passionate about building innovative healthcare solutions that improve patient outcomes. 
                  I thrive at the intersection of engineering, regulation, and clinical need — turning complex 
                  technical challenges into products that make a real difference.
                </p>
              </div>
            </motion.div>

            {/* Skills */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Skills & Competencies</h2>
              <div className="flex flex-wrap gap-2">
                {["Product Engineering", "R&D Engineering", "Medical Devices", "Project Management",
                  "Cross-functional Leadership", "Design Controls", "Risk Management", "Agile/Scrum",
                  "FDA Regulations", "ISO 13485", "MATLAB", "Python", "SolidWorks", "Data Analysis",
                  "CMOS Calibration", "Signal Processing", "Manufacturing Automation"].map((skill) => (
                  <Badge key={skill} variant="secondary" className="bg-primary/10 text-primary border-none px-3 py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Resume Download */}
            <div className="flex gap-3">
              <a href="/resume.pdf" download>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Resume
                </Button>
              </a>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* PROJECT DETAIL MODAL */}
      <Dialog open={selectedProject !== null} onOpenChange={closeProject}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <div className="space-y-6">
              {/* Header */}
              <div>
                <DialogTitle className="text-2xl font-bold mb-2">{selectedProject.title}</DialogTitle>
                <p className="text-lg text-primary mb-1">{selectedProject.subtitle}</p>
                <p className="text-sm text-muted-foreground mb-4">{selectedProject.discipline}</p>
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                  <span className="font-medium">{selectedProject.role}</span>
                  <span>•</span>
                  <span>{selectedProject.organization}</span>
                  <span>•</span>
                  <span>{selectedProject.duration}</span>
                </div>
              </div>

              {/* Images Gallery */}
              {selectedProject.images && selectedProject.images.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                  {selectedProject.images.map((img, i) => (
                    <div key={i} className="aspect-video bg-muted rounded-lg overflow-hidden">
                      <img src={img} alt={`${selectedProject.title} ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}

              {/* Full Description */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">OVERVIEW</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedProject.fullDescription}
                </p>
              </div>

              {/* Challenge */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">CHALLENGE</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedProject.challenge}
                </p>
              </div>

              {/* Approach */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">APPROACH</h3>
                <ul className="space-y-2">
                  {selectedProject.approach.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Outcomes */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">OUTCOMES</h3>
                <ul className="space-y-2">
                  {selectedProject.outcomes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">SKILLS & TOOLS</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.skills.map((skill, i) => (
                    <Badge key={i} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>

              {/* Downloads & Links */}
              <div className="flex flex-wrap gap-3 pt-4 border-t">
                {selectedProject.githubLink && (
                  <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      <Code2 className="h-4 w-4 mr-2" />
                      View Code
                    </Button>
                  </a>
                )}
                {selectedProject.reportFiles && selectedProject.reportFiles.map((file, i) => (
                  <a key={i} href={file.url} download>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      {file.name}
                    </Button>
                  </a>
                ))}
                {selectedProject.externalLink && (
                  <a href={selectedProject.externalLink} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Learn More
                    </Button>
                  </a>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
