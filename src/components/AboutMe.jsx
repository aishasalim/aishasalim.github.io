import content from "../content";

const { about } = content;

const AboutMe = () => {
  return (
    <div className="mx-auto grid max-w-4xl grid-cols-1 items-start gap-10 px-5 text-gray-800 md:grid-cols-[1.15fr_1fr] md:gap-14">
      <div className="space-y-5 text-[18px] leading-7">
        {about.paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <img
        src={about.image}
        alt={about.imageAlt}
        className="w-full rounded-[20px] shadow-lg"
      />
    </div>
  );
};

export default AboutMe;
