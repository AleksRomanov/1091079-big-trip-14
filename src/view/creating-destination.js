import {getRandomArrayItem, generateDate, getRandomNumber, shuffle} from '../utils';
import {CITIES, DESCRIPTIONS, EVENT_TYPES, OFFERS} from '../mocks/data';

class CreateEventsState {
  constructor(props) {

    this._eventsCount = props[0];

    this._firstDate = generateDate(0, true);
  }

  generatePhotos (){
    const count = getRandomNumber(1, 6);

    return [...Array(count)].map(() => `http://picsum.photos/300/150?r=${Math.random()}`);
  }

  generateOffers (){
    const count = getRandomNumber(0, 6);

    return [...Array(count)].map((it, i) => OFFERS[i]);
  }

  generateDescription (descriptions){
    const count = getRandomNumber(1, 4);

    return shuffle(descriptions.slice())
      .slice(0, count)
      .join(' ');
  }

  generateEvent(index, resultArray) {
    const result = {
      type: getRandomArrayItem([...EVENT_TYPES.transfers, ...EVENT_TYPES.activities]),
      city: getRandomArrayItem(CITIES),
      photos: this.generatePhotos(),
      offers: this.generateOffers(),
      description: this.generateDescription(DESCRIPTIONS),
      price: getRandomNumber(10, 1000),
    };


    if (!index) {
      result.startDate = this._firstDate;
      result.endDate = generateDate(this._firstDate);
    } else {
      const startDate = resultArray[--index].endDate;
      result.startDate = startDate;
      result.endDate = generateDate(startDate);
    }

    return result;
  };

  generateEvents() {
    const result = [];
    for (let i = 0; i <= this._eventsCount; i++) {
      result.push(this.generateEvent(i, result));
    }
    // const result = [...Array(this._eventsCount)].map((item, index, resultArray) => this.generateEvent(item, index, resultArray));
    // console.log(result[0]);
    // console.log(result[1]);
    // console.log(result[2]);
    // console.log(result[20]);
    // console.log(result.length);
    return result;
  };

}


export {CreateEventsState};




// const getTitle = (events) => {
//   if (events.length > SHOWING_CITIES_COUNT) {
//     return `${events[0].city} &mdash; ... &mdash; ${events[events.length - 1].city}`;
//   } else {
//     return events
//       .map((event, index) => {
//         return `${event.city} ${index < events.length - 1 ? '-' : ''} `;
//       })
//       .join(' ');
//   }
// };

// const getDates = (startDate, endDate) => {
//   const month = new Date(startDate).toLocaleString('en-US', {month: 'short'});
//   const startDay = new Date(startDate).getDate();
//   const endDay = new Date(endDate).getDate();
//   return `${month} ${startDay} &nbsp;&mdash;&nbsp; ${endDay}`;
// };
