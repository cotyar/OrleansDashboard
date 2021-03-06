var React = require("react");
var Chart = require("react-chartjs").Line;

// this control is a bit of a temporary hack, until I have a multi-series chart widget
module.exports = class TimeSeriesChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0
        };
        this.getWidth = this.getWidth.bind(this);
    }

    getWidth() {
        if (!this.refs.container) {
            return;
        }

        this.setState({ width: this.refs.container.offsetWidth });
    }

    renderChart() {
        if (this.state.width === 0) {
            return setTimeout(this.getWidth, 0);
        }

        var data = {
            labels: this.props.timepoints.map(timepoint => {
                if (timepoint) {
                    try {
                        if (new Date(timepoint).getSeconds() % 30 == 0) {
                            return new Date(timepoint).toLocaleTimeString();
                        }
                    } catch (e) {
                        // not a valid date string
                    }
                }

                return "";
            }),
            datasets: [
                {
                    label: "y2",
                    backgroundColor: `rgba(236,151,31,0)`,
                    borderColor: `rgba(236,151,31,0.8)`,
                    data: this.props.series[2],
                    pointRadius: 0,
                    yAxisID: "y2"
                },
                {
                    label: "y1",
                    backgroundColor: `rgba(246,31,31,0.8)`,
                    borderColor: `rgba(246,31,31,0)`,
                    data: this.props.series[0],
                    pointRadius: 0,
                    yAxisID: "y1"
                },
                {
                    label: "y1",
                    backgroundColor: `rgba(120,57,136,0.8)`,
                    borderColor: `rgba(120,57,136,0)`,
                    data: this.props.series[1],
                    pointRadius: 0,
                    yAxisID: "y1"
                }
            ],
        };

        var options = {
            legend: { display: false },
            maintainAspectRatio: false,
            animation: false,
            showTooltips: false,
            responsive: true,
            hoverMode: "label",
            stacked: false,
            scales: {
                xAxes: [
                    {
                        display: true,
                        gridLines: {
                            offsetGridLines: false,
                            drawOnChartArea: false
                        },
                        ticks: {
                            autoSkip: false,
                            maxRotation: 0,
                            minRotation: 0,
                            fontSize: 9
                        }
                    }
                ],
                yAxes: [
                    {
                        type: "linear",
                        display: true,
                        position: "left",
                        id: "y1",
                        gridLines: { drawOnChartArea: false },
                        ticks: { beginAtZero: true }
                    },
                    {
                        type: "linear",
                        display: true,
                        position: "right",
                        id: "y2",
                        gridLines: { drawOnChartArea: false },
                        ticks: { beginAtZero: true }
                    }
                ]
            }
        };

        return (
            <Chart
                data={data}
                options={options}
                width={this.state.width}
                height={180}
            />
        );
    }

    render() {
        return <div ref="container">{this.renderChart()}</div>;
    }
};
