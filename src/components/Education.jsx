import React from 'react';

const educationData = [
  {
    degree: "Associate of Science in CS",
    school: "Houston Community College, Houston, TX",
    date: "February 2023 - December 2024",
    details: [
      "Achieved a GPA of 4.0",
      "Completed courses in Data Structures, CodePath Advanced Web Development, and CodePath iOS Development",
      "Honors & Awards: Recognized on HCC Honors/Dean's List, Elected Philosophy Club President, Served as Computer Science Association Officer",
    ],
  }
];

const Education = () => {
  return (
    <section className="py-10 mb-10 max-w-2xl px-3 mx-auto">
      <h2 className="text-4xl font-bold mb-8 text-center">Education</h2>
      <div className="space-y-6">
        {educationData.map((education, index) => (
          <div key={index} className="py-8 px-10 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-300 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">{education.degree}</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400">{education.school}</p>
              </div>
              <p className="mb-6 text-lg text-gray-500 dark:text-gray-400">{education.date}</p>
            </div>
            {education.details && (
              <ul className="mt-4 list-disc list-inside text-gray-700 dark:text-gray-300">
                {education.details.map((detail, detailIndex) => (
                  <li key={detailIndex}>{detail}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
