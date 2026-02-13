import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, GitFork, ExternalLink } from "lucide-react";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

const GITHUB_USERNAME = "your-github-username"; // Replace with actual username

const Projects = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setRepos(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto px-4 py-16 space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-foreground">Projects</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Public repositories from GitHub and featured work.
        </p>
      </motion.div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse border-none shadow-md">
              <CardContent className="p-6 space-y-3">
                <div className="h-5 w-2/3 rounded bg-muted" />
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-4 w-1/2 rounded bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : repos.length === 0 ? (
        <p className="text-muted-foreground">
          No repositories found. Update the GitHub username in the code to fetch your repos.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo, i) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                <Card className="h-full border-none shadow-md transition-all hover:shadow-lg hover:-translate-y-1">
                  <CardContent className="flex h-full flex-col justify-between p-6 space-y-3">
                    <div className="space-y-2">
                      <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                        {repo.name}
                        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {repo.description || "No description provided."}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      {repo.language && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-none text-xs">
                          {repo.language}
                        </Badge>
                      )}
                      <span className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5" /> {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="h-3.5 w-3.5" /> {repo.forks_count}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </a>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
