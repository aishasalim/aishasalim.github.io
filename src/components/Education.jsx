import React from "react";
import content from "../content";

const educationData = content.education;

const Education = () => {
  const { schools, honorsHeading, honors } = educationData;

  return (
    <div className="max-w-2xl px-3 mx-auto text-gray-800">
      <div className="space-y-4">
        {schools.map((school, i) => (
          <div key={i}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-lg font-bold text-gray-800">
                {school.school}
                <span className="font-normal text-gray-600">
                  {" "}
                  | {school.location}
                </span>
              </h3>
              <span className="text-sm text-gray-500">{school.date}</span>
            </div>
            <p className="mt-0.5 text-gray-700">{school.degree}</p>
          </div>
        ))}
      </div>

      <h3 className="mt-8 text-lg font-bold text-gray-800">{honorsHeading}</h3>
      <div className="mt-2 space-y-1.5 text-gray-700">
        {honors.map((honor, i) => (
          <p key={i}>{honor}</p>
        ))}
      </div>
    </div>
  );
};

export default Education;
