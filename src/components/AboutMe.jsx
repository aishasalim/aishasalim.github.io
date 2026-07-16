import content from "../content";

const { about } = content;

const AboutMe = () => {
  return (
    <div className="mx-auto grid max-w-4xl grid-cols-1 items-start gap-6 px-5 text-gray-800 sm:gap-10 md:grid-cols-[1.15fr_1fr] md:gap-14">
      <div className="space-y-5 text-[18px] leading-7">
        {about.paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <img
        src={about.image}
        alt={about.imageAlt}
        className="w-full max-h-48 rounded-[20px] object-cover shadow-lg sm:max-h-none"
      />
    </div>
  );
};

export default AboutMe;
