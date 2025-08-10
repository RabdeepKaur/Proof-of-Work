import ProjectCard from "../Componenets/ProjectCard";
import Card from "../Componenets/Card"

function Projects() {
     const projects = [
    {
      title: "Project 1",
      id:" ",
      description: "This is a brief description of Project 1.",
      imageUrl: "https://via.placeholder.com/300x200",
      techStack: ["React", "Tailwind", "Node.js"],
      link: "#",
    },
    {
      title: "Project 2",
      id:"",
      description: "This is a brief description of Project 2.",
      imageUrl: "https://via.placeholder.com/300x200",
      techStack: ["Next.js", "MongoDB", "Express"],
      link: "#",
    },
    {
      title: "Project 3",
      id:"",
      description: "This is a brief description of Project 3.",
      imageUrl: "https://via.placeholder.com/300x200",
      techStack: ["Three.js", "Blender", "GSAP"],
      link: "#",
    },
  ];
  const CardData=[  
    {
      title: "blog 1",
      description: "This is a brief description of Project 1.",
      imageUrl: "https://via.placeholder.com/300x200",
    },
    {
      title: "blog 2",
      description: "This is a brief description of Project 2.",
      imageUrl: "https://via.placeholder.com/300x200",
    },
    {
      title: "blog 3",
      description: "This is a brief description of Project 3.",
      imageUrl: "https://via.placeholder.com/300x200",
    },
  
    ];

    return (
        <>
     <div className="flex flex-col bg-black text-white p-8 m-10">
  <h1 className="text-4xl font-bold mb-4 px-4">PROJECTS</h1>

  <div className="flex flex-row gap-6 ">

    <div className="flex-1 flex-col flex-wrap gap-4 overflow-y-auto">
      {projects.map((project, index) => (
        <ProjectCard key={index} {...project} />
      ))}
    </div>

    
    <div className="h-1/3 flex flex-row gap-6  ">
      {CardData.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  </div>
</div>

        </>
    )
}
export default Projects;