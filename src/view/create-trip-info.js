import {getFormattedDate} from '../utils';

class CreateTripInfo {
  getEventsSum(state) {
    return state.reduce((accumulator, current) => {
      return accumulator + current.price;
    }, 0);
  }

  getSecondDestination(state) {
    const destinationSeparator = '...';
    return state.length > 1 ? destinationSeparator : state[1].city;
  }

  getElement(state) {
    const firstCity = state[0]['city'];
    const finalCity = state[state.length - 1]['city'];
    const firstDate = getFormattedDate(state[0]['startDate'], 'MMM-DD');
    const finalDate = getFormattedDate(state[state.length - 1]['endDate'], 'DD');
    const totalCost = this.getEventsSum(state);

    return `
     <section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
          <h1 class="trip-info__title">${firstCity} &mdash; ${this.getSecondDestination(state)} &mdash; ${finalCity}</h1>

          <p class="trip-info__dates">${firstDate}
              &nbsp;&mdash;&nbsp;
              ${finalDate}
             </p>
        </div>
        <p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
        </p>
    </section>
    `;
  }
}

export {CreateTripInfo};
