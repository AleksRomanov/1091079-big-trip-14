export default class Data {
  constructor() {
    this._offers = new Map();
    this._offersTypes = [];
    this._destinations = [];
  }

  getOffers() {
    return this._offers;
  }

  getOffersTypes() {
    return this._offersTypes;
  }

  getDestinations() {
    return this._destinations;
  }

  getDestinationsByName(destinationName) {
    return this._destinations.find((destination) => {
      return destination.name === destinationName;
    });
  }

  setOffers(offers) {
    offers.forEach((offer) => this._offers.set(offer.type, offer.offers));
    this.setOffersTypes(this._offers.keys());
  }

  setDestinations(destinations) {
    this._destinations = destinations.slice();
  }

  setOffersTypes(offers) {
    for (const element of offers) {
      this._offersTypes.push(element);
    }
  }
}
