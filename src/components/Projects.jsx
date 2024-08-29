import React from 'react';
import girllobby from "../assets/girl-loby.png";
import coolCards from "../assets/coolcardsphoto.png";
import ratemyprofessor from "../assets/ratemyprofessor.png";
import {Github, ExternalLink} from 'lucide-react';

const projectData = [
  {
    title: "RateMyProfessorAI",
    description: "RateMyProfessorAI is an ultimate guide to navigating the world of professors. Chatbot can read and summarize links from Rate My Professor, recommend other professors, and evaluate which professor fits best with your schedule. 🧠📚",
    imgSrc: ratemyprofessor,
    imgAlt: "RateMyProfessorAI",
    githubLink: "https://github.com/aishasalim/rmp-assistant",
    hostingLink: "https://ratemyprofessorai.vercel.app/",
    skills: ["NextJS", "TypeScript", "Firebase", "openAI", "Pinecone", "MUI", "WebScrapping"]
  },
  {
    title: "CoolCardsAI",
    description: "SaaS platform that generates personalized flashcards on any topic using OpenAI. Integrated Stripe API to implement custom pricing plans and a secure payment gateway.",
    imgSrc: coolCards,
    imgAlt: "CoolCardsAI",
    githubLink: "https://github.com/aishasalim/flashcard-saas",
    hostingLink: "https://coolcards-ai.vercel.app/",
    skills: ["NextJS", "Clerk", "Firebase", "openAI", "StripeAPI", "MUI"]
  },
  {
    title: "Girl lobby forum site",
    description: "Forum application, using React.js and Supabase API for both backend and frontend operations.",
    imgSrc: girllobby,
    imgAlt: "Girl lobby forum site",
    githubLink: "https://github.com/aishasalim/girl-lobby-forum",
    hostingLink: "https://lambent-flan-5d68f6.netlify.app/",
    skills: ["React.js", "Supabase", "GoogleOAuth"]
  },
];

const Projects = () => {
  return (
    <section id="portfolio" className="pt-[8em] mt-18 max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold mb-6 text-center">Portfolio</h2>
      <p className="mx-5 text-center mb-10">
        Below are some of my projects ranging from a variety of topics from scripts to full-stack apps.
      </p>
      {projectData.map((project, index) => (
        <div key={index} className="flex flex-col md:flex-row items-center mx-5 mb-16">
          <div className="md:w-1/2">
            <img src={project.imgSrc} alt={project.imgAlt} className="rounded-lg shadow-lg w-full" />
          </div>
          <div className="md:w-1/2 md:pl-10 mt-6 md:mt-0">
            <h3 className="text-2xl font-bold mb-2">Project {index + 1}: {project.title}</h3>

            <div className="flex mb-4">
              <a href={project.githubLink} className="text-default dark:text-dark flex items-center group">
                <Github className="mr-1" /> 
                View Github 
                <span className="ml-2 transition-transform transform group-hover:translate-x-3 duration-200">&gt;</span>
              </a>
            </div>
            <div className="flex mb-4">
              <a href={project.hostingLink} className="text-default dark:text-dark flex items-center group">
                <ExternalLink className="mr-1" /> 
                View Live 
                <span className="ml-2 transition-transform transform group-hover:translate-x-3 duration-200">&gt;</span>
              </a>
            </div>
        
            <div className="mb-4 dark:text-gray-300">
              <h4 className="font-semibold">Description:</h4>
              <p>{project.description}</p>
            </div>
            <div className="flex flex-wrap">
              {project.skills.map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className="hover:scale-110 transform transition-transform duration-200 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full px-4 py-1 text-sm mr-2 mb-2"
                >
                  {skill}
                </span>
              ))}
              
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Projects;