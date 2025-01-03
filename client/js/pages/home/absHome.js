class AbstractHome {
  constructor() {
    if (this.constructor === AbstractHome)
      throw new Error(
        'This class is and abstract class and con not be instantiated'
      );

    if (this.init == undefined)
      throw new Error('<init> method must be implemented');
  }
}

export default AbstractHome;
