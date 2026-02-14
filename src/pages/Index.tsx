import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Zap, Users, Code, Microscope, Cpu, ChevronRight, ExternalLink, Github, Linkedin, Mail, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Impact metrics
const metrics = [
  { value: "3", label: "FDA Class II Devices", icon: Award },
  { value: "90%", label: "Image Quality ↑", icon: Zap },
  { value: "80%", label: "Manufacturing Yield ↑", icon: Users },
  { value: "4.0", label: "GPA • MS Bioeng", icon: Code },
];

// Project data with visual elements
const projects = {
  giview: {
    title: "GI View: FDA Medical Devices",
    role: "Product Lead Engineer",
    duration: "2022-2024",
    problem: "Transform automotive cameras into medical-grade colonoscopy visualization",
    solution: "Developed CMOS sensor calibration & manufacturing automation",
    results: [
      { metric: "90%", label: "better image quality" },
      { metric: "80%", label: "manufacturing yield" },
      { metric: "3", label: "FDA devices launched" },
    ],
    skills: ["CMOS Sensors", "Image Processing", "CAD", "FDA Compliance", "Manufacturing"],
    proof: [
      "Calibrated ISP for dark LED environments (automotive → medical)",
      "Designed automation tools in SolidWorks (20% → 80% yield)",
      "Managed 4 consultants + medical advisors",
      "Wrote 10+ UI specs for engineering teams",
    ],
  },
  lidar: {
    title: "LiDAR Motion Analysis System",
    role: "Research Engineer",
    duration: "2023",
    problem: "Validate safety of assistive device for people with mobility challenges",
    solution: "Built wearable LiDAR system + MATLAB classification algorithms",
    results: [
      { metric: "12", label: "subjects tested" },
      { metric: "Real-time", label: "fall risk detection" },
      { metric: "Novel", label: "LiDAR application" },
    ],
    skills: ["LiDAR", "MATLAB", "Biomechanics", "Wearables", "Signal Processing"],
    proof: [
      "Designed wearable hardware from scratch",
      "Built MATLAB pipeline: capture → process → classify",
      "Generated regulatory safety data",
      "Full report + research poster delivered",
    ],
  },
  ml: {
    title: "ML Signal Classification",
    role: "Data Science Researcher",
    duration: "2023",
    problem: "Classify gestures & daily burden from phone sensor data",
    solution: "Python ML pipeline with automated feature engineering",
    results: [
      { metric: "Multi-modal", label: "sensor fusion" },
      { metric: "Automated", label: "feature extraction" },
      { metric: "Python", label: "ML pipeline" },
    ],
    skills: ["Python", "ML", "scikit-learn", "TensorFlow", "Feature Engineering"],
    proof: [
      "Classified hand gestures from accelerometer/gyro",
      "Assessed daily burden from usage patterns",
      "Built automated feature engineering pipeline",
      "Full Python codebase available",
    ],
  },
  nxstage: {
    title: "Hemodialysis System Analysis",
    role: "R&D System Engineer II",
    duration: "2025",
    problem: "Validate on-market device after material changes",
    solution: "Multi-variable MATLAB analysis + test protocol design",
    results: [
      { metric: "6", label: "test protocols" },
      { metric: "Multi-variable", label: "analysis" },
      { metric: "MDR", label: "compliance" },
    ],
    skills: ["MATLAB", "System Engineering", "V&V", "Regulatory", "Root-Cause Analysis"],
    proof: [
      "Designed 6 system-level test protocols",
      "Multi-variable data analysis in MATLAB",
      "Integrated mechanical + hardware + software testing",
      "Ensured regulatory compliance",
    ],
  },
};

// Background strengths
const strengths = [
  {
    icon: Microscope,
    title: "Dancer → Engineer",
    description: "Unique path from movement science to medical devices. I understand human physiology AND technology.",
  },
  {
    icon: Cpu,
    title: "Technical + Product",
    description: "I don't just build—I own products. From CMOS calibration to cross-functional leadership.",
  },
  {
    icon: Users,
    title: '"Can Do" Mindset',
    description: "Challenges drive me. While others wait, I optimize. I make things happen.",
  },
];

const Index = () => {
  const [selectedProject, setSelectedProject] = useState("giview");
  const currentProject = projects[selectedProject as keyof typeof projects];

  return (
    <div className="min-h-screen">
      {/* Compact Header with Quick Facts */}
      <section className="bg-gradient-to-br from-primary via-secondary to-accent py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-[2fr_1fr] items-center">
            {/* Left: Name + Title */}
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-3">Shahar Berger</h1>
              <p className="text-xl md:text-2xl font-semibold mb-2 text-white/95">
                Product Engineer • Medical Devices
              </p>
              <p className="text-lg text-white/90">
                M.S. Bioengineering • Northeastern University • Graduating May 2026
              </p>
            </div>

            {/* Right: Quick Contact */}
            <div className="flex flex-wrap gap-2 justify-start md:justify-end">
              <a href="mailto:peretz.s@northeastern.edu">
                <Button size="sm" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                  <Mail className="h-4 w-4 mr-1" /> Email
                </Button>
              </a>
              <a href="https://linkedin.com/in/shahar-berger1" target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                  <Linkedin className="h-4 w-4 mr-1" /> LinkedIn
                </Button>
              </a>
              <a href="https://github.com/ShaharPeretz1" target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                  <Github className="h-4 w-4 mr-1" /> GitHub
                </Button>
              </a>
            </div>
          </div>

          {/* Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
              >
                <div className="flex items-center gap-3">
                  <metric.icon className="h-5 w-5 text-white" />
                  <div>
                    <p className="text-2xl font-bold text-white">{metric.value}</p>
                    <p className="text-sm text-white/80">{metric.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content with Tabs */}
      <section className="container mx-auto px-4 py-12">
        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-8 h-auto p-1">
            <TabsTrigger value="projects" className="text-base py-3">
              <Award className="h-4 w-4 mr-2" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="background" className="text-base py-3">
              <Users className="h-4 w-4 mr-2" />
              Background
            </TabsTrigger>
            <TabsTrigger value="contact" className="text-base py-3">
              <Mail className="h-4 w-4 mr-2" />
              Hire Me
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: PROJECTS - Visual & Practical */}
          <TabsContent value="projects" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">Proven Work</h2>
              <p className="text-muted-foreground text-lg">
                Click each project to see details. This is what I've actually built.
              </p>
            </div>

            {/* Project Selector */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {Object.entries(projects).map(([key, project]) => (
                <Button
                  key={key}
                  variant={selectedProject === key ? "default" : "outline"}
                  onClick={() => setSelectedProject(key)}
                  className="h-auto py-4 px-3"
                >
                  <span className="text-sm font-semibold text-center leading-tight">
                    {project.title.split(":")[0]}
                  </span>
                </Button>
              ))}
            </div>

            {/* Selected Project Details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProject}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-2 border-primary/20">
                  <CardContent className="p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">{currentProject.title}</h3>
                        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                          <span className="font-semibold text-primary">{currentProject.role}</span>
                          <span>•</span>
                          <span>{currentProject.duration}</span>
                        </div>
                      </div>
                    </div>

                    {/* Problem → Solution → Results */}
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      <div>
                        <p className="text-sm font-semibold text-primary mb-2">PROBLEM</p>
                        <p className="text-sm">{currentProject.problem}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-secondary mb-2">SOLUTION</p>
                        <p className="text-sm">{currentProject.solution}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-accent mb-2">RESULTS</p>
                        <div className="space-y-1">
                          {currentProject.results.map((result, i) => (
                            <p key={i} className="text-sm">
                              <span className="font-bold text-accent">{result.metric}</span> {result.label}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Proof Points */}
                    <div className="mb-6">
                      <p className="text-sm font-semibold text-foreground mb-3">WHAT I ACTUALLY DID:</p>
                      <ul className="grid md:grid-cols-2 gap-2">
                        {currentProject.proof.map((point, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <ChevronRight className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Skills */}
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-3">SKILLS USED:</p>
                      <div className="flex flex-wrap gap-2">
                        {currentProject.skills.map((skill, i) => (
                          <Badge key={i} variant="secondary" className="px-3 py-1">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </TabsContent>

          {/* TAB 2: BACKGROUND - Who I Am & Why I'm Unique */}
          <TabsContent value="background" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">Why I'm Different</h2>
              <p className="text-muted-foreground text-lg">
                My unique path gives me perspectives most engineers don't have
              </p>
            </div>

            {/* Strengths Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {strengths.map((strength, i) => (
                <Card key={i} className="border-2 border-secondary/20">
                  <CardContent className="p-6">
                    <div className="rounded-lg bg-secondary/10 p-3 w-fit mb-4">
                      <strength.icon className="h-6 w-6 text-secondary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{strength.title}</h3>
                    <p className="text-muted-foreground">{strength.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Journey Timeline */}
            <Card className="border-2 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">My Journey</h3>
                <div className="space-y-6">
                  <div className="border-l-4 border-primary pl-6">
                    <p className="text-sm font-semibold text-primary mb-1">DANCER & PILATES INSTRUCTOR</p>
                    <p className="text-sm text-muted-foreground">
                      Learned human movement, anatomy, and how to adapt solutions to individual needs. 
                      Worked one-on-one with clients but wanted to impact thousands.
                    </p>
                  </div>
                  <div className="border-l-4 border-secondary pl-6">
                    <p className="text-sm font-semibold text-secondary mb-1">NATIONAL DEFENSE (2015-2017)</p>
                    <p className="text-sm text-muted-foreground">
                      High-stakes analytical work. Learned to work under pressure, synthesize complex data, 
                      and make strategic recommendations for senior leadership.
                    </p>
                  </div>
                  <div className="border-l-4 border-accent pl-6">
                    <p className="text-sm font-semibold text-accent mb-1">BIOMEDICAL ENGINEERING @ TAU</p>
                    <p className="text-sm text-muted-foreground">
                      Combined my passion for health with technical engineering. LiDAR research, ML projects, 
                      and understanding how to build devices that change lives.
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-6">
                    <p className="text-sm font-semibold text-primary mb-1">PRODUCT LEAD @ GI VIEW (2022-2024)</p>
                    <p className="text-sm text-muted-foreground">
                      Led 3 FDA Class II devices from concept to market. 90% image improvement, 80% yield increase. 
                      This is where technical depth met product ownership.
                    </p>
                  </div>
                  <div className="border-l-4 border-secondary pl-6">
                    <p className="text-sm font-semibold text-secondary mb-1">M.S. @ NORTHEASTERN + NXSTAGE (2024-2026)</p>
                    <p className="text-sm text-muted-foreground">
                      Moved to Boston for grad school. Co-op at large medical device company (NxStage/Fresenius). 
                      System engineering on life-saving hemodialysis devices.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What Drives Me */}
            <Card className="border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-secondary/5">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">What Drives Me</h3>
                <div className="space-y-3">
                  <p className="text-lg">
                    ✓ <span className="font-semibold">Challenges</span> - I love busy days and complex problems
                  </p>
                  <p className="text-lg">
                    ✓ <span className="font-semibold">Efficiency</span> - While others wait, I optimize workflows
                  </p>
                  <p className="text-lg">
                    ✓ <span className="font-semibold">Learning</span> - Top 1% Huberman Lab listener, always studying
                  </p>
                  <p className="text-lg">
                    ✓ <span className="font-semibold">Impact</span> - Building products that genuinely improve lives
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 3: HIRE ME - Clear CTA */}
          <TabsContent value="contact" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">Let's Work Together</h2>
              <p className="text-muted-foreground text-lg">
                Seeking Product Management / Technical Program Management roles
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* What I'm Looking For */}
              <Card className="border-2 border-primary/20">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-foreground mb-4">What I'm Seeking</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>PM/TPM roles</strong> bridging technical + product + business</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Full device lifecycle</strong> ownership (concept → market)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Challenging problems</strong> in healthcare/medical devices</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Open to industries/locations</strong> - challenge matters most</span>
                    </li>
                  </ul>
                  <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm font-semibold text-primary">Graduating May 2026</p>
                    <p className="text-sm text-muted-foreground">Available for full-time starting Summer 2026</p>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Options */}
              <Card className="border-2 border-secondary/20">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-foreground mb-4">Get In Touch</h3>
                  <div className="space-y-3">
                    <a href="mailto:peretz.s@northeastern.edu" className="block">
                      <Button variant="outline" className="w-full justify-start" size="lg">
                        <Mail className="h-5 w-5 mr-3" />
                        <div className="text-left">
                          <p className="font-semibold">Email Me</p>
                          <p className="text-xs text-muted-foreground">peretz.s@northeastern.edu</p>
                        </div>
                      </Button>
                    </a>
                    <a href="https://linkedin.com/in/shahar-berger1" target="_blank" rel="noopener noreferrer" className="block">
                      <Button variant="outline" className="w-full justify-start" size="lg">
                        <Linkedin className="h-5 w-5 mr-3" />
                        <div className="text-left">
                          <p className="font-semibold">LinkedIn</p>
                          <p className="text-xs text-muted-foreground">Connect & message</p>
                        </div>
                      </Button>
                    </a>
                    <a href="https://github.com/ShaharPeretz1" target="_blank" rel="noopener noreferrer" className="block">
                      <Button variant="outline" className="w-full justify-start" size="lg">
                        <Github className="h-5 w-5 mr-3" />
                        <div className="text-left">
                          <p className="font-semibold">GitHub</p>
                          <p className="text-xs text-muted-foreground">View my code</p>
                        </div>
                      </Button>
                    </a>
                    <div className="pt-4">
                      <Button className="w-full" size="lg">
                        <Download className="h-5 w-5 mr-2" />
                        Download Resume
                      </Button>
                    </div>
                    <div>
                      <Button variant="secondary" className="w-full" size="lg">
                        <Calendar className="h-5 w-5 mr-2" />
                        Schedule Coffee Chat
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default Index;
