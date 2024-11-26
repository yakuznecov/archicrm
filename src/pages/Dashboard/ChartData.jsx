// ChartData.js

export const series1 = [{
	data: [25, 66, 41, 89, 63, 25, 44, 20, 36, 40, 54]
}];
export const series2 = [70];
export const series3 = [80];
export const series4 = [65];

export const options1 = {
	fill: {
		colors: ['#5b73e8']
	},
	chart: {
		width: 70,
		sparkline: {
			enabled: !0
		}
	},
	plotOptions: {
		bar: {
			columnWidth: '50%'
		}
	},
	labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
	xaxis: {
		crosshairs: {
			width: 1
		},
	},
	tooltip: {
		fixed: {
			enabled: !1
		},
		x: {
			show: !1
		},
		y: {
			title: {
				formatter: function (seriesName) {
					return '';
				}
			}
		},
		marker: {
			show: !1
		}
	}
};

export const options2 = {
	fill: {
		colors: ['#34c38f']
	},
	chart: {
		sparkline: {
			enabled: !0
		}
	},
	dataLabels: {
		enabled: !1
	},
	plotOptions: {
		radialBar: {
			hollow: {
				margin: 0,
				size: '60%'
			},
			track: {
				margin: 0
			},
			dataLabels: {
				show: !1
			}
		}
	}
};

export const options3 = {
	fill: {
		colors: ['#5b73e8']
	},
	chart: {
		sparkline: {
			enabled: !0
		}
	},
	dataLabels: {
		enabled: !1
	},
	plotOptions: {
		radialBar: {
			hollow: {
				margin: 0,
				size: '60%'
			},
			track: {
				margin: 0
			},
			dataLabels: {
				show: !1
			}
		}
	}
};

export const options4 = {

	fill: {
		colors: ['#f1b44c']
	},
	chart: {
		sparkline: {
			enabled: !0
		}
	},
	dataLabels: {
		enabled: !1
	},
	plotOptions: {
		radialBar: {
			hollow: {
				margin: 0,
				size: '60%'
			},
			track: {
				margin: 0
			},
			dataLabels: {
				show: !1
			}
		}
	}
};