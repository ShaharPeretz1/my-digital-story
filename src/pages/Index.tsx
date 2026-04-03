import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Download, FileText, Code2, ExternalLink, MapPin, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

// Experience data
const experience = [
  {
    id: "nxstage-coop",
    title: "R&D System Engineer II",
    company: "NxStage Medical (Fresenius Medical Care)",
    location: "Lawrence, MA",
    duration: "Jan 2025 - Present",
    type: "Co-op",
    description: [
      "Conducting root-cause investigation for Class II home hemodialysis device",
      "Designing and executing system-level test protocols",
      "Multi-variable data analysis using MATLAB",
      "Ensuring regulatory compliance (MDR, 21 CFR 820)"
    ]
  },
  {
    id: "giview",
    title: "Product Lead Engineer",
    company: "GI View Ltd.",
    location: "Israel",
    duration: "2022 - 2024",
    type: "Full-time",
    description: [
      "Led end-to-end product development for 3 FDA Class II optical systems",
      "Managed cross-functional teams and external consultants",
      "Developed CMOS sensor calibration and image processing algorithms",
      "Designed manufacturing automation tools, increasing yield from 20% to 80%",
      "Authored UI specifications for 10+ features"
    ]
  },
  {
    id: "medtech-hackathon",
    title: "Product Team Member",
    company: "TAU MedTech Hackathon (Synergy Innovate)",
    location: "Tel Aviv, Israel",
    duration: "2021",
    type: "Event Organization",
    description: [
      "Organized healthcare innovation competition with 18 teams (~200 participants)",
      "Established partnerships with Amazon, Google, Microsoft, Philips, Teva, and IBM",
      "Translated clinical needs from medical institutions into actionable challenges",
      "Recruited 4 technical mentors and 1 medical judge",
      "Organized 4 educational workshops"
    ],
    highlights: ["Amazon", "Google", "Microsoft", "Philips", "Teva", "IBM"]
  },
  {
    id: "defense",
    title: "Program Analyst",
    company: "National Defense",
    location: "Israel",
    duration: "2015 - 2017",
    type: "Full-time",
    description: [
      "Led high-priority analytical projects in time-sensitive environments",
      "Synthesized complex data into strategic recommendations",
      "Prepared executive presentations for senior leadership"
    ]
  }
];

// Project categories
const categories = [
  { id: "all", label: "All Projects" },
  { id: "medical-devices", label: "Medical Devices" },
  { id: "research", label: "Research" },
  { id: "ml-ai", label: "ML & AI" },
];

// Projects data
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
    image: "/assets/giview.png",
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
    githubLink: null,
    reportFiles: [
      { name: "Product Specification", url: "/assets/reports/giview-spec.pdf" },
      { name: "Technical Overview", url: "/assets/reports/giview-tech.pdf" }
    ],
    externalLink: "https://www.giview.com/advantages",
    images: [
      "/assets/_one_pager.png",
      "/assets/geometric distorsion test setup from protocol.png",
      "/assets/image uniformity test setup.png"
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
      "Demonstrated novel LiDAR application in biomechanical assessment",
      "Complete research report and poster delivered"
    ],
    skills: ["LiDAR Systems", "MATLAB", "Biomechanics", "Wearable Devices", "Signal Processing", "Clinical Research"],
    githubLink: "https://github.com/yourusername/lidar-motion-analysis",
    reportFiles: [
      { name: "Research Report", url: "/projects/SnS/files/SnS final project - Shahar and Shani.pdf" },
      { name: "Research Poster", url: "/projects/SnS/files/__poster - SitnStand_for checking - 70X100 - ML.pptx.pdf" }
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
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

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
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20">
                <img 
                  src="/assets/LinkedIn Profile.png" 
                  alt="Shahar Berger" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-semibold text-foreground mb-1">Shahar Berger</h1>
              <p className="text-lg text-muted-foreground mb-3">
                Technical Product Manager • Medical Devices • Bioengineering
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  <span>Boston, MA</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4" />
                  <span>M.S. Bioengineering • 4.0 GPA</span>
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
        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          {/* PROJECTS TAB */}
          <TabsContent value="projects" className="space-y-6">
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
          <TabsContent value="experience" className="space-y-4">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {exp.company} • {exp.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{exp.duration}</p>
                        <Badge variant="outline" className="mt-1">{exp.type}</Badge>
                      </div>
                    </div>

                    {exp.highlights && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {exp.highlights.map((company, i) => (
                          <Badge key={i} variant="secondary" className="font-medium">
                            {company}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <ul className="space-y-1.5">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-1.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          {/* ABOUT ME TAB */}
          <TabsContent value="about">
            <Card>
              <CardContent className="p-8">
                <div className="prose prose-sm max-w-none space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Background</h3>
                    <p className="text-base leading-relaxed text-muted-foreground mb-4">
                      My path to biomedical engineering began with movement. As a dancer and Pilates instructor, 
                      I developed a deep understanding of human physiology and the importance of individualizing 
                      solutions to each person's needs. This foundation taught me the intersection of science and 
                      practice - how to translate knowledge into tangible impact.
                    </p>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      While I loved working one-on-one with clients, I wanted to scale that impact. I wanted to 
                      develop devices and treatments that could change thousands of lives. This drive led me to 
                      study biomedical engineering at Tel Aviv University, where I could merge my passion for 
                      health with technical engineering.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Professional Journey</h3>
                    <p className="text-base leading-relaxed text-muted-foreground mb-4">
                      After serving in national defense (2015-2017), where I led analytical projects in high-stakes 
                      environments, I joined GI View as a Product Lead Engineer. There, I managed the complete product 
                      lifecycle for FDA Class II colonoscopy systems - from early prototypes to commercial launch.
                    </p>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      In 2024, I moved to Boston for my M.S. in Bioengineering at Northeastern University. The co-op 
                      program was particularly attractive as it bridges academic learning with industry experience. 
                      Currently, I'm working at NxStage Medical (Fresenius), gaining exposure to large-scale medical 
                      device development for life-saving hemodialysis systems.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">What Drives Me</h3>
                    <p className="text-base leading-relaxed text-muted-foreground mb-4">
                      I'm motivated by complex challenges and the opportunity to continuously learn. Whether it's 
                      optimizing a manufacturing process, diving into new software tools, or understanding a novel 
                      technical domain, I approach problems with curiosity and persistence.
                    </p>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      Outside of work, I maintain a daily fitness practice (a non-negotiable habit from my dance 
                      background), enjoy hiking in New England, and spend time learning through podcasts and reading. 
                      I'm particularly interested in neuroscience and health - I'm in the top 1% of listeners for the 
                      Huberman Lab podcast.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Looking Forward</h3>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      I'm seeking roles where I can apply both technical depth and product thinking - positions that 
                      involve owning the full device lifecycle, leading cross-functional teams, and solving meaningful 
                      challenges in healthcare. I'm open to opportunities across industries and locations, with a focus 
                      on roles that offer genuine technical and leadership challenges.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* PROJECT DETAIL MODAL */}
      <Dialog open={selectedProject !== null} onOpenChange={closeProject}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <div className="space-y-6">
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

              {selectedProject.images && selectedProject.images.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                  {selectedProject.images.map((img, i) => (
                    <div key={i} className="aspect-video bg-muted rounded-lg overflow-hidden">
                      <img src={img} alt={`${selectedProject.title} ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}

              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">OVERVIEW</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedProject.fullDescription}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">CHALLENGE</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedProject.challenge}
                </p>
              </div>

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

              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">SKILLS & TOOLS</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.skills.map((skill, i) => (
                    <Badge key={i} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>

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
