import ProjectCard from "../Componenets/ProjectCard";
import Card from "../Componenets/Card"
import landingpage from "../assets/landingpage.png";
import lockme from "../assets/lockme.png";

function Projects() {
     const projects = [
    {
      title: "RejectMe (80+ views and 36 on peerlist )",
      id:"1 ",
      description: "RejectMe is a AI based application that solves the growing problem of candidate ghosting in the recruitment process. Instead of leaving candidates in the dark, companies can generate thoughtful, personalized rejection emails in just one click.",
       imageUrl: landingpage,
      techStack: ["Next.js","Gemini AI API","Shadcn","Rest API","Tailwind CSS"],
      link: "https://reject-me.vercel.app/",
    },
    {
      title: "Lock me In (5 + users) ",
      id:"2",
      description: "Lock-me-in is a Chrome extension that locks you into one website until your timer ends. If you try to leave? Boom — you're redirected right back. Annoying , I know , but you got to do what you got to do man. Stay focused. finish your work .",
      imageUrl: lockme,
      techStack: ["chrome-Extesion","JavaScript"," Chrome API","CSS","HTML"],
      link: "https://github.com/RabdeepKaur/Lock-me-in",
    },
    {
      title: "Influencer",
      id:"3",
      description: "A comprehensive analytics dashboard for Instagram Reels that provides detailed insights, engagement metrics, sentiment analysis, and spam detection. ",
      imageUrl: "https://via.placeholder.com/300x200",
      techStack: ["Next.js ", "TypeScript", "MongoDB", "Tailwind CSS", "Prisma","Apify SDK "],
      link: "https://reel-olive.vercel.app/",
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