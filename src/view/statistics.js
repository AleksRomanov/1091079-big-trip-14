import Smart from './smart';
import {mapDurationByType, mapEventsByType, mapSpendingByType, sortMapByValues} from '../utils/statistics';
import {STATISTICS_SETTINGS} from '../const';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
import {humanizeDuration} from '../utils/dates';

export const StatisticsTitles = {
  TYPE: 'TYPE',
  MONEY: 'MONEY',
  TIME_SPENT: 'TIME-SPENT',
};

const formatLabelName = (value) => value.toUpperCase();

const formatMoneyValue = (value) => `€ ${value}`;

const formatTypeCount = (value) => `${value}x`;

const formatDuration = (value) => transformDuration(value);

const transformDuration = (duration) => {
  return humanizeDuration(dayjs.duration(duration, 'minutes').$d);
};

const renderChart = (canvas, labels, data, dataFormatter, labelsFormatter, chartTitle) => {
  canvas.height = data.length * STATISTICS_SETTINGS.barHeight;

  return new Chart(canvas, {
    plugins: [ChartDataLabels],
    type: STATISTICS_SETTINGS.type,
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: STATISTICS_SETTINGS.backgroundColor,
        hoverBackgroundColor: STATISTICS_SETTINGS.hoverBackgroundColor,
        anchor: STATISTICS_SETTINGS.dataAnchor,
        barThickness: STATISTICS_SETTINGS.barThickness,
        minBarLength: STATISTICS_SETTINGS.minBarLength,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: STATISTICS_SETTINGS.basicFontSize,
          },
          color: STATISTICS_SETTINGS.datalabelsColor,
          anchor: STATISTICS_SETTINGS.datalabelsAnchor,
          align: STATISTICS_SETTINGS.datalabelsAlign,
          formatter: dataFormatter,
        },
      },
      title: {
        display: true,
        text: chartTitle,
        fontColor: STATISTICS_SETTINGS.fontColor,
        fontSize: STATISTICS_SETTINGS.titleFontSize,
        position: STATISTICS_SETTINGS.titlePosition,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: STATISTICS_SETTINGS.fontColor,
            padding: STATISTICS_SETTINGS.padding,
            fontSize: STATISTICS_SETTINGS.basicFontSize,
            callback: labelsFormatter,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createStatisticsTemplate = () => {

  return `<section class="statistics visually-hidden">
            <h2 class="visually-hidden">Trip statistics</h2>

            <div class="statistics__item statistics__item--money">
              <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
            </div>

            <div class="statistics__item statistics__item--transport">
              <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
            </div>

            <div class="statistics__item statistics__item--time-spend">
              <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
            </div>

          </section>`;
};

export default class Statistics extends Smart {
  constructor(events) {
    super();
    this._state = events;
    this._moneyChart = null;
    this._typeChart = null;
    this._timeChart = null;
    this._setCharts();
  }

  getTemplate() {
    return createStatisticsTemplate(this._state);
  }

  _setCharts() {
    if (this._moneyChart !== null || this._typeChart !== null || this._timeChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeChart = null;
    }

    const moneyCanvas = this.getElement().querySelector('.statistics__chart--money');
    const typeCanvas = this.getElement().querySelector('.statistics__chart--transport');
    const timeCanvas = this.getElement().querySelector('.statistics__chart--time');

    const sortedSpendingByType = sortMapByValues(mapSpendingByType(this._state));
    const sortedEventTypesCount = sortMapByValues(mapEventsByType(this._state));
    const sortedDurationByType = sortMapByValues(mapDurationByType(this._state));

    this._moneyChart = renderChart(
      moneyCanvas,
      [...sortedSpendingByType.keys()],
      [...sortedSpendingByType.values()],
      formatMoneyValue,
      formatLabelName,
      StatisticsTitles.MONEY,
    );

    this._typeChart = renderChart(
      typeCanvas,
      [...sortedEventTypesCount.keys()],
      [...sortedEventTypesCount.values()],
      formatTypeCount,
      formatLabelName,
      StatisticsTitles.TYPE,
    );

    this._timeChart = renderChart(
      timeCanvas,
      [...sortedDurationByType.keys()],
      [...sortedDurationByType.values()],
      formatDuration,
      formatLabelName,
      StatisticsTitles.TIME_SPENT,
    );
  }
}
