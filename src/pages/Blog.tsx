import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "My Journey from R&D to Product Management",
    date: "2025-01-15",
    preview: "How I transitioned from hands-on engineering to leading product strategy at a medical device startup...",
  },
  {
    id: 2,
    title: "What I Learned in My First Year of Grad School",
    date: "2025-03-10",
    preview: "Reflections on pursuing a master's in bioengineering and balancing academics with career goals...",
  },
];

const Blog = () => {
  return (
    <div className="container mx-auto px-4 py-16 space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-foreground">Blog</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Thoughts on bioengineering, product management, and career growth.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {blogPosts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Card className="h-full cursor-pointer border-none shadow-md transition-all hover:shadow-lg hover:-translate-y-1">
              <CardContent className="p-6 space-y-3">
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground">{post.preview}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Dynamic blog powered by Lovable Cloud coming soon.
      </p>
    </div>
  );
};

export default Blog;
