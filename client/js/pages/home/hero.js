import HeroApi from '../../api/HeroApi.js';

class HeroError extends Error {
  constructor(message) {
    super(message);
    this.name = 'HeroError';
  }
}

class Hero {
  #data = null;
  #heroApi;
  constructor(titleClass, subtitleClass, ctaBtnId, imgClass) {
    this.titleEl = document.querySelector(titleClass);
    this.subtitleEl = document.querySelector(subtitleClass);
    this.btnCtaEl = document.querySelector(ctaBtnId);
    this.imgEl = document.querySelector(imgClass);

    this.#heroApi = new HeroApi();

    this.#fetchData();
    console.log(this.#data);

    this.render();
  }

  async #fetchData() {
    // this.#heroApi
    //   .getAll()
    //   .then((response) => {
    //     if (!response.ok)
    //       throw new Error(`API responded with status: ${response.status}`);

    //     const data = response.json();
    //     return data;
    //   })
    //   .then((data) => {
    //     this.#data = data[0];
    //   })
    //   .catch((err) => {
    //     const customError = new HeroError(err.message);
    //     console.error(customError);
    //   });
    let finalData;
    try {
      const response = await this.#heroApi.getAll();

      if (!response.ok)
        throw new Error(`API responded with status: ${response.status}`);

      const data = await response.json();
      finalData = data[0];
    } catch (err) {
      const customError = new HeroError(err.message);
      console.error(customError);
    }

    return finalData;
  }

  async #updateDom() {
    let parsedSubtitle = '';

    this.#data?.keywords?.forEach((kWord, index) => {
      const parsedKword = `<strong class="strong">${kWord}</strong>`;
      parsedSubtitle = this.#data.subtitle.replace(`{${index}}`, parsedKword);
    });

    const parsedTitle = this.#data.title.replace(/\\n/g, '<br>');

    this.titleEl.innerHTML = parsedTitle;
    this.subtitleEl.innerHTML = parsedSubtitle;
    this.btnCtaEl.innerText = this.#data.ctaText;
    this.btnCtaEl.href = this.#data.ctaLink;
    this.imgEl.src = this.#data.image;
    // console.log(this.#data);
  }

  render() {
    this.#updateDom();
  }
}

export default Hero;
