import bodyParser from "body-parser";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ejsPath = `${__dirname}/view/`;
app.use(bodyParser.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

// Static blog array
let blogs = [
  {
    title: "Exploring the Mountains",
    author: "Alice",
    date: "July 19, 2025",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    summary:
      "Discover the beauty and tranquility of mountain adventures. Tips, stories, and breathtaking views await you in this journey to the peaks.",
    color: "primary",
  },
  {
    title: "Tech Trends 2025",
    author: "Bob",
    date: "July 18, 2025",
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    summary:
      "Stay ahead with the latest in technology. From AI to quantum computing, explore what's shaping our digital future in this tech roundup.",
    color: "success",
  },
  {
    title: "Culinary Delights",
    author: "Carol",
    date: "July 17, 2025",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
    summary:
      "A journey through flavors! Explore recipes, restaurant reviews, and food photography that will make your mouth water.",
    color: "danger",
  },
  {
    title: "Wanderlust Diaries",
    author: "Dave",
    date: "July 16, 2025",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    summary:
      "Travel the world from your screen! Stories, tips, and guides for the modern explorer looking for their next adventure.",
    color: "warning",
  },
  {
    title: "Mindful Living",
    author: "Eve",
    date: "July 15, 2025",
    image:
      "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80",
    summary:
      "Tips and inspiration for a balanced life. Mindfulness, wellness, and productivity hacks to help you thrive every day.",
    color: "info",
  },
];

app.get("/", (req, res) => {
  res.render(`${ejsPath}/displayblog.ejs`, {
    title: "Blog EJS Demo",
    blogs: blogs,
  });
});


app.get("/create", (req, res) => {
  res.render(`${ejsPath}/addBlog.ejs`, { blog: null, edit: false });
});

// Render edit blog form with prefilled values
app.get("/edit/:title", (req, res) => {
  const title = decodeURIComponent(req.params.title);
  const blog = blogs.find(blog => blog.title === title);
  if (blog) {
    res.render(`${ejsPath}/addBlog.ejs`, { blog, edit: true });
  } else {
    res.status(404).send("Blog not found.");
  }
});

app.post("/addBlog", (req, res) => {
  try {
    // Add date and color for new blog
    const newBlog = {
      ...req.body,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      color: "primary"
    };
    blogs.push(newBlog);
    console.log("Blog added successfully:", blogs);
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error adding blog. Please try again later.");
  }
});


// Support HTML form POST for delete (since forms can't send DELETE easily)
app.post("/deleteBlog/:title", (req, res) => {
  const title = decodeURIComponent(req.params.title);
  const index = blogs.findIndex(blog => blog.title === title);
  if (index !== -1) {
    blogs.splice(index, 1);
    console.log(`Blog titled "${title}" deleted successfully.`);
    res.redirect("/");
  } else {
    console.log(`Blog titled "${title}" not found.`);
    res.status(404).send("Blog not found.");
  }
});


// Support HTML form POST for delete (since forms can't send DELETE easily)
app.post("/editBlog/:title", (req, res) => {
  const title = decodeURIComponent(req.params.title);
  const index = blogs.findIndex(blog => blog.title === title);
  if (index !== -1) {
    const editBLog = {
      ...req.body,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      color: "primary"
    };
    blogs[index] = editBLog;
    console.log(`Blog titled "${title}" deleted successfully.`);
    res.redirect("/");
  } else {
    console.log(`Blog titled "${title}" not found.`);
    res.status(404).send("Blog not found.");
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
