import homeBase from './homeBase.js';
import heroSection from './hero.js';
import aboutSection from './about.js';
import experienceSection from './experience.js';
import portfolioSection from './portfolio.js';
import techStackSection from './techStack.js';
import educationSection from './education.js';
import contactSection from './contact.js';

async function HomePage() {
  try {
    // initialize common funtions, datas for the whole page
    await homeBase.init();

    // get contact data to display it in several sections
    const contactData = homeBase.getContact();

    // inititalize Hero section
    await heroSection.init(contactData.socials);

    // initialize About section
    await aboutSection.init(contactData.socials);

    // initialize Experience section
    await experienceSection.init();

    // initialize Portfolio section
    await portfolioSection.init();

    // initialize Tech Stack section
    await techStackSection.init();

    // initialize Education section
    await educationSection.init();

    // initialize Contact section
    await contactSection.init(contactData);
  } catch (err) {
    console.error(err);
  }
}

export default HomePage;
