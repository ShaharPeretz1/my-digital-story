import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, ExternalLink, MapPin, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Projects data - expanded with more projects
const projects = [
  {
    id: "giview",
    title: "GI View Solo Scope - FDA Class II Colonoscopy System",
    organization: "GI View Ltd., Israel",
    role: "Product Lead Engineer",
    duration: "2022-2024",
    description: "Led product development for single-use colonoscopy systems from concept through FDA approval and commercialization.",
    challenges: "Transform off-the-shelf automotive cameras into medical-grade imaging systems capable of operating in dark, LED-illuminated environments while meeting FDA Class II requirements.",
    approach: [
      "Developed CMOS sensor ISP calibration methodology specifically for medical imaging",
      "Designed precision manufacturing automation tools using SolidWorks",
      "Managed cross-functional teams including external consultants and medical advisors",
      "Created UI specifications and product roadmap for 3 optical systems"
    ],
    outcomes: [
      "90% improvement in visualization quality compared to initial prototypes",
      "Increased manufacturing yield from 20% to 80% through automation",
      "Successfully launched 3 FDA Class II devices",
      "Achieved 200° field of view vs. 140° industry standard"
    ],
    skills: ["CMOS Sensor Calibration", "Image Processing", "SolidWorks", "FDA 21 CFR 820", "ISO 13485", "Manufacturing Automation", "Cross-functional Leadership"],
    link: "https://www.giview.com/advantages"
  },
  {
    id: "lidar",
    title: "LiDAR-Based Motion Stability Analysis System",
    organization: "Tel Aviv University & SitnStand",
    role: "Research Engineer",
    duration: "2023",
    description: "Designed wearable LiDAR system to validate user stability for assistive medical device used by people with mobility challenges.",
    challenges: "Quantify fall risk and movement stability during sit-to-stand transitions for regulatory approval of the SitnStand assistive device.",
    approach: [
      "Designed and built wearable LiDAR sensor integration from scratch",
      "Developed MATLAB algorithms for real-time movement classification",
      "Created automated data pipeline from sensor capture to analysis",
      "Designed clinical testing protocol for 12 subjects"
    ],
    outcomes: [
      "Successfully validated device safety across 12 test subjects",
      "Provided quantitative data for regulatory submissions",
      "Demonstrated novel application of LiDAR in biomechanical assessment",
      "Delivered complete research report and poster presentation"
    ],
    skills: ["LiDAR Systems", "MATLAB", "Biomechanics", "Wearable Devices", "Signal Processing", "Clinical Testing", "Research Design"]
  },
  {
    id: "ml",
    title: "Physiological Signal Classification Using Machine Learning",
    organization: "Tel Aviv University Data Science Lab",
    role: "Data Science Researcher",
    duration: "2023",
    description: "Developed ML models to classify hand gestures and daily burden levels from mobile phone sensor data.",
    challenges: "Extract meaningful patterns from multi-modal mobile sensor data (accelerometer, gyroscope, touch) to assess user state without explicit input.",
    approach: [
      "Built Python ML pipeline with scikit-learn and TensorFlow",
      "Implemented automated feature engineering for time and frequency domain",
      "Developed multi-modal sensor fusion algorithms",
      "Created gesture classification and burden assessment models"
    ],
    outcomes: [
      "Successfully classified distinct hand gestures from motion data",
      "Assessed daily burden levels based on phone usage patterns",
      "Demonstrated expertise in biomedical signal processing",
      "Complete Python codebase and documentation"
    ],
    skills: ["Python", "Machine Learning", "scikit-learn", "TensorFlow", "Feature Engineering", "Signal Processing", "Mobile Sensors"]
  },
  {
    id: "nxstage",
    title: "Home Hemodialysis Device Investigation",
    organization: "NxStage Medical (Fresenius Medical Care)",
    role: "R&D System Engineer II",
    duration: "2025 (Current)",
    description: "Root-cause investigation and validation testing for on-market Class II home hemodialysis device following regulatory-driven material changes.",
    challenges: "Ensure device performance and safety remained within specifications after material substitution while maintaining MDR compliance.",
    approach: [
      "Conducted multi-variable data analysis in MATLAB",
      "Designed 6 comprehensive system-level test protocols",
      "Integrated mechanical, hardware, and software performance testing",
      "Collaborated across engineering, quality, and regulatory teams"
    ],
    outcomes: [
      "Successfully validated design modifications",
      "Maintained MDR compliance throughout investigation",
      "Established framework for future material change evaluations",
      "Ensured continued device reliability for patients"
    ],
    skills: ["MATLAB", "System Engineering", "Root-Cause Analysis", "V&V", "MDR Compliance", "21 CFR 820"]
  }
];

// Experience data - separated from projects
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

const Index = () => {
  const [selectedProject, setSelectedProject] = useState("giview");
  const currentProject = projects.find(p => p.id === selectedProject);

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Photo and Brief Intro */}
      <section className="border-b bg-white">
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Profile Photo */}
            <div className="flex-shrink-0">
              <div className="w-40 h-40 rounded-full bg-muted flex items-center justify-center border-2 border-primary/20 overflow-hidden">
                <img 
                  src="/assets/LinkedIn Profile.png" 
                  alt="Shahar Berger" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-semibold text-foreground mb-2">Shahar Berger</h1>
              <p className="text-lg text-muted-foreground mb-4">
                Product Engineer • Medical Devices • Bioengineering
              </p>
              
              <div className="space-y-2 mb-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Boston, MA</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>M.S. Bioengineering, Northeastern University (Expected May 2026) • GPA: 4.0</span>
                </div>
              </div>

              <p className="text-base leading-relaxed text-foreground/90 mb-6">
                I work at the intersection of product development, engineering, and medical technology. 
                My background spans from movement science to biomedical engineering, giving me a unique 
                perspective on human-centered medical device design. I'm particularly interested in 
                FDA-regulated systems, manufacturing optimization, and bringing innovative medical 
                devices from concept to market.
              </p>

              <div className="flex flex-wrap gap-3">
                <a href="mailto:peretz.s@northeastern.edu">
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                </a>
                <a href="https://linkedin.com/in/shahar-berger1" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Button>
                </a>
                <a href="https://github.com/ShaharPeretz1" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="container mx-auto px-4 py-8 max-w-5xl">
        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="about">About Me</TabsTrigger>
          </TabsList>

          {/* PROJECTS TAB */}
          <TabsContent value="projects" className="space-y-6">
            {/* Project Selector */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {projects.map((project) => (
                <Button
                  key={project.id}
                  variant={selectedProject === project.id ? "default" : "outline"}
                  onClick={() => setSelectedProject(project.id)}
                  className="h-auto py-4 px-4 text-left justify-start"
                >
                  <div className="text-left">
                    <p className="font-semibold text-sm">{project.title}</p>
                    <p className="text-xs opacity-80">{project.organization}</p>
                  </div>
                </Button>
              ))}
            </div>

            {/* Selected Project Details */}
            {currentProject && (
              <motion.div
                key={currentProject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      {/* Header */}
                      <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-2">
                          {currentProject.title}
                        </h2>
                        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-4">
                          <span className="font-medium">{currentProject.role}</span>
                          <span>•</span>
                          <span>{currentProject.organization}</span>
                          <span>•</span>
                          <span>{currentProject.duration}</span>
                        </div>
                        <p className="text-base leading-relaxed">{currentProject.description}</p>
                      </div>

                      {/* Challenge */}
                      <div>
                        <h3 className="text-sm font-semibold text-primary mb-2">CHALLENGE</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {currentProject.challenges}
                        </p>
                      </div>

                      {/* Approach */}
                      <div>
                        <h3 className="text-sm font-semibold text-primary mb-2">APPROACH</h3>
                        <ul className="space-y-2">
                          {currentProject.approach.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="text-primary mt-1.5">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Outcomes */}
                      <div>
                        <h3 className="text-sm font-semibold text-primary mb-2">OUTCOMES</h3>
                        <ul className="space-y-2">
                          {currentProject.outcomes.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="text-primary mt-1.5">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Skills */}
                      <div>
                        <h3 className="text-sm font-semibold text-primary mb-3">SKILLS & TOOLS</h3>
                        <div className="flex flex-wrap gap-2">
                          {currentProject.skills.map((skill, i) => (
                            <Badge key={i} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Link if available */}
                      {currentProject.link && (
                        <div className="pt-2">
                          <a href={currentProject.link} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm">
                              Learn More <ExternalLink className="ml-2 h-3 w-3" />
                            </Button>
                          </a>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
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
                    <p className="text-base leading-relaxed text-muted-foreground">
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
                    <p className="text-base leading-relaxed text-muted-foreground">
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
                    <p className="text-base leading-relaxed text-muted-foreground">
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
    </div>
  );
};

export default Index;
