class Store {
  #pageNumber;
  #progressInterval;
  #subscribed;
  constructor() {
    this.#pageNumber = 0;
    this.#subscribed = [];
    this.setPage = function (pagenumber) {
      this.#pageNumber = pagenumber;
    };
    this.getPage = function () {
      return this.#pageNumber;
    };
    this.setProgressInterval = function (setInterval) {
      this.#progressInterval = setInterval;
    };
    this.getProgressInterval = function () {
      return this.#progressInterval;
    };
    this.clearProgressInterval = function () {
      clearInterval(this.#progressInterval);
    };
    this.setSubscribed = function (id) {
      console.log(id);
      this.#subscribed.push(id);
    };
    this.getSubscribed = function () {
      return this.#subscribed;
    };
  }
}

const Stores = new Store();

export default Stores;
