import { assets, footerLinks } from "../assets/assets";

const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-primary/10">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        <div className="max-w-[410px]">
          <img 
            className="w-32 md:w-36"
            src={assets.logo} 
            alt="NexBuy Logo" 
          />
          <p className="mt-6 text-gray-600">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum unde quaerat eveniet cumque accusamus atque qui error quo enim fugiat?
          </p>
        </div>
        
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {footerLinks.map((section, index) => (
            <div key={index} className="min-w-[120px]">  
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a 
                      href={link.url} 
                      className="text-gray-600 hover:text-primary hover:underline transition-colors"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      <div className="py-6 text-center">
        <p className="text-gray-500/80 text-sm md:text-base">
          Copyright © {new Date().getFullYear()} GreenGrocer. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;