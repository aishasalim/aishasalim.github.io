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
                className="group inline-flex flex-wrap items-center gap-x-3 gap-y-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="underline decoration-2 underline-offset-4 group-hover:decoration-4">
                  {project.title}
                </span>
                <span className="inline-block rounded-sm border border-current px-1.5 py-0.5 text-[0.5em] tracking-widest opacity-70 transition-opacity group-hover:opacity-100">
                  {project.githubLink ? "GitHub" : "PDF"} &#8599;
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
