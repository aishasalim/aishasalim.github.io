import React from "react";
import content from "../content";
import usePaperPile from "../hooks/usePaperPile";

const projectData = content.projects;

/* One paper sheet per project; sheets pile up as you scroll — see
   usePaperPile for the mechanics. */
const Projects = () => {
  const { wrapRef, spacerRef } = usePaperPile();

  return (
    <div ref={wrapRef} className="mx-auto max-w-6xl px-3 sm:px-5">
      {projectData.map((project, index) => (
        <article
          key={index}
          className={`paper-card ${index === 0 ? "" : "mt-16"}`}
        >
          {project.badge && (
            <p className="text-sm text-gray-500">{project.badge}</p>
          )}
          <h3 className="mt-1 text-2xl font-bold">
            {project.githubLink || project.viewLink ? (
              <a
                href={project.githubLink ?? project.viewLink}
                className="group inline-flex items-center underline-offset-4 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.title}
                <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">
                  &rarr;
                </span>
              </a>
            ) : (
              project.title
            )}
          </h3>

          <ul className="mt-4 space-y-2 list-disc list-outside pl-5 text-gray-700">
            {project.bullets.map((b, bi) => (
              <li key={bi}>{b}</li>
            ))}
          </ul>
        </article>
      ))}
      <div ref={spacerRef} aria-hidden="true" />
    </div>
  );
};

export default Projects;
