import React from "react";

/* Tall white footer: gives the page enough scroll room past the folder stack
   for every folder tab to reach the pin line, so the trapezoids align on the
   same level at the end of the scroll. */
const Footer = ({ links }) => {
  return (
    <footer className="bg-white text-gray-800 min-h-[70vh] flex flex-col justify-end">
      <div className="max-w-6xl mx-auto px-4 w-full py-6 flex justify-between items-center border-t border-gray-200">
        <div className="text-left">
          <h3 className="text-sm font-bold">Aisha Salimgereyeva</h3>
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()}
          </p>
        </div>

        <div className="flex space-x-4">foo
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              className="text-gray-600 hover:text-gray-900"
            >
              <link.icon alt={`${link.href} icon`} className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
