import HomeBase from './HomeBase.js';
import Hero from './Hero.js';
import About from './About.js';
import Experience from './Experience.js';
import Portfolio from './Portfolio.js';
import TechStack from './TechStack.js';
import Education from './Education.js';
import Contact from './Contact.js';

class HomePage {
  async init() {
    try {
      // initialize common funtions, datas for the whole page
      const homeBase = new HomeBase();
      await homeBase.init();

      // get contact data to display it in several sections
      const contactData = homeBase.getContact();

      // inititalize Hero section
      const heroSection = new Hero();
      await heroSection.init(contactData.socials);

      // initialize About section
      const aboutSection = new About();
      await aboutSection.init(contactData.socials);

      // initialize Experience section
      const experienceSection = new Experience();
      await experienceSection.init();

      // initialize Portfolio section
      const portfolioSection = new Portfolio();
      await portfolioSection.init();

      // initialize Tech Stack section
      const techStackSection = new TechStack();
      await techStackSection.init();

      // initialize Education section
      const educationSection = new Education();
      await educationSection.init();

      // initialize Contact section
      const contactSection = new Contact();
      await contactSection.init(contactData);
    } catch (err) {
      console.error(err);
    }
  }
}

export default HomePage;
