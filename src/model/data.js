export default class Data {
  constructor() {
    this._offers = new Map();
    this._destinations = [];
  }

  getOffers() {
    return this._offers;
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
  }

  setDestinations(destinations) {
    this._destinations = destinations.slice();
  }

  // _adaptDestinationsToClient(destinations) {
  //
  //   const adaptedEvent = {
  //     ...event,
  //     price: event.base_price,
  //     startDate: event.date_from,
  //     endDate: event.date_to,
  //     destination: {
  //       photos: event.destination.pictures,
  //       city: event.destination.name,
  //       description: event.destination.description,
  //     },
  //     favorite: event.is_favorite,
  //   };
  //   return adaptedEvent;
  // }
}
