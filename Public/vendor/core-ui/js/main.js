"use strict";

/* eslint-disable object-shorthand */

/* global Chart, CustomTooltips, getStyle, hexToRgba */

/**
 * --------------------------------------------------------------------------
 * CoreUI Free Boostrap Admin Template (v2.1.15): main.js
 * Licensed under MIT (https://coreui.io/license)
 * --------------------------------------------------------------------------
 */

/* eslint-disable no-magic-numbers */
// Disable the on-canvas tooltip
Chart.defaults.global.pointHitDetectionRadius = 1;
Chart.defaults.global.tooltips.enabled = false;
Chart.defaults.global.tooltips.mode = "index";
Chart.defaults.global.tooltips.position = "nearest";
Chart.defaults.global.tooltips.custom = CustomTooltips;
Chart.defaults.global.tooltips.intersect = true;

Chart.defaults.global.tooltips.callbacks.labelColor = function(
  tooltipItem,
  chart
) {
  return {
    backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor
  };
}; // eslint-disable-next-line no-unused-vars

var brandBoxChartLabels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July"
];
var brandBoxChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        display: false
      }
    ],
    yAxes: [
      {
        display: false
      }
    ]
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3
    }
  } // eslint-disable-next-line no-unused-vars
};

//# sourceMappingURL=main.js.map
