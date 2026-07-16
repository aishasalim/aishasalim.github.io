import React from "react";
import content from "../content";
import usePaperPile from "../hooks/usePaperPile";

const experienceData = content.experience;

/* One paper sheet per experience; sheets pile up as you scroll — see
   usePaperPile for the mechanics. */
const Experience = () => {
  const { wrapRef, spacerRef } = usePaperPile();

  return (
    <div ref={wrapRef} className="mx-auto max-w-6xl px-3 sm:px-5">
      {experienceData.map((experience, index) => (
        <article
          key={index}
          className={`paper-card ${index === 0 ? "" : "mt-16"}`}
        >
          <p className="text-sm text-gray-500">{experience.date}</p>
          <h3 className="mt-1 text-2xl font-bold">{experience.title}</h3>
          <p className="text-lg text-gray-600">{experience.company}</p>

          <ul className="mt-4 space-y-2 list-disc list-outside pl-5 text-gray-700">
            {experience.bullets.map((bullet, bi) => (
              <li key={bi}>{bullet}</li>
            ))}
          </ul>
        </article>
      ))}
      <div ref={spacerRef} aria-hidden="true" />
    </div>
  );
};

export default Experience;
