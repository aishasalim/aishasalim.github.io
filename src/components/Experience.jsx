import React from 'react';
import { GraduationCap, Keyboard } from 'lucide-react';

const experienceData = [
  {
    title: "Software Engineering Fellow",
    company: "HeadStarter, Remote",
    date: "July 2024 - September 2024",
    description: "Developed 5 AI-powered applications utilizing React.js, Next.js, and OpenAI. Collaborated on SaaS and data extraction projects, enhancing user experience and performance for 500+ users.",
    tags: ["React.js", "Next.js", "OpenAI", "Firebase", "CI/CD"],
    icon: Keyboard,
  },
  {
    title: "Tutor",
    company: "The Tutoring Center, Katy, TX",
    date: "May 2023 – Now",
    description: "Developed an iOS app for tutoring management, improving data flow by 25%. Enhanced learning outcomes for 40+ K-12 students, with a focus on personalized education and special needs support.",
    tags: ["iOS", "XCode", "Tutoring"],
    icon: GraduationCap,
  },
];

const Experience = () => {
  return (
    <section id="experience" className="pb-10 pt-[6em] mt-5 max-w-2xl mx-auto">
      <h2 className="text-4xl font-bold mb-6 text-center">Experience</h2>
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute top-[1em] bottom-[15em] left-[3em] w-[2px] bg-gray-300 dark:bg-gray-700 md:block hidden" />

        {experienceData.map((experience, index) => (
          <div key={index} className="flex items-start mb-10 relative mx-4">
            {/* Icon */}
            <div className="mr-4 flex-shrink-0 md:block hidden m-3 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700">
              <div className="bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700">
                <experience.icon alt={`${experience.title} icon`} className="h-10 w-10 p-2" />
              </div>
            </div>

            {/* Content */}
            <div className="p-6 pl-3 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 flex-grow">
              <div className="flex">
                <div className="flex-shrink-0 mr-4 md:hidden">
                  <experience.icon alt={`${experience.title} icon`} className="h-10 w-10" />
                </div>
                <div className='md:mx-6 max-w-[30em]'>
                  <h3 className="text-2xl font-bold">{experience.title}</h3>
                  <p className="text-xl text-gray-500">{experience.company}</p>
                  <p className="text-sm text-gray-400">{experience.date}</p>
                  <p className="mt-4 text-gray-700 dark:text-gray-300">{experience.description}</p>
                  <div className="mt-2 flex flex-wrap">
                    {experience.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="hover:scale-110 transform transition-transform duration-200 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full px-4 py-1 text-sm mr-2 mb-2"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
