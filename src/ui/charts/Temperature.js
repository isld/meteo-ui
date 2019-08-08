import React from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Paper} from '@material-ui/core';

import {
    getDomain,
    getTicks,
} from './helpers';

import styles from './styles.module.scss';

const POINT = {
    SMALL: 250,
    LARGE: 300,
};

const initialHeight = 200;
const initialWidth = 300;

const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
};

const xField = 'dateutc';
const yField = 'tempf';

export default class Temperature extends React.PureComponent {
    static propTypes = {
        efficientFrontier: PropTypes.array,
        manualAllocation: PropTypes.object,
        onSelect: PropTypes.func,
    };

    _container = React.createRef();

    _svg = React.createRef();

    _chart = React.createRef();

    _line = React.createRef();

    _xAxis = React.createRef();

    _xGrid = React.createRef();

    _xRuler = React.createRef();

    _yAxis = React.createRef();

    _yGrid = React.createRef();

    _yRuler = React.createRef();

    state = {
        height: 0,
        width: 0,
        domain: {x: null, y: [0, 0]},
        xScale: null,
        yScale: null,
        lineGenerator: d3.line(),
        pointGenerator: d3.symbol().type(d3.symbolCircle),
    };

    static getXDomain(data) {
        return [
            Date.parse(data[0].dateutc),
            Date.parse(data[data.length - 1].dateutc),
        ];
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const {data} = nextProps;
        const {xScale, yScale} = prevState;

        if (!data || !xScale || !yScale) return null;

        const {lineGenerator} = prevState;
        const domain = getDomain(data, xField, yField);

        let xDomain = Temperature.getXDomain(data);
        lineGenerator.x(d => xScale.domain(xDomain)(Date.parse(d[xField])));
        lineGenerator.y(d => yScale.domain(domain.y)(d[yField]));

        const line = lineGenerator(data);

        return {
            line,
            domain,
            xScale,
            yScale,
        };
    }

    componentDidMount() {
        this.updateDimensions();

        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevState.line) {
            const line = d3.select(this._line.current);
            const totalLength = line.node().getTotalLength();

            line
                .attr('stroke-dasharray', totalLength + ' ' + totalLength)
                .attr('stroke-dashoffset', totalLength)
                .transition()
                .duration(800)
                .ease(d3.easeCubic)
                .attr('stroke-dashoffset', 0);
        }
    }

    updateDimensions = () => {
        const {data} = this.props;
        const {lineGenerator, domain} = this.state;

        const element = this._container.current;
        const width = element.clientWidth;
        const height = element.clientHeight;

        console.log(width);

        const xScale = d3.scaleTime().range([margin.left, width - margin.left - margin.right]);
        const yScale = d3.scaleLinear().range([height - margin.top - margin.bottom, margin.bottom]);

        let line = null;

        if (data) {
            let xDomain = Temperature.getXDomain(data);
            lineGenerator.x(d => xScale.domain(xDomain)(Date.parse(d[xField])));
            lineGenerator.y(d => yScale.domain(domain.y)(d[yField]));

            line = lineGenerator(data);
        }

        console.log(line);
        this.setState({width, height, xScale, yScale, line});
    };

    render() {
        const {line, height, width} = this.state;

        return (
            <Paper>
                <div className={styles.container} ref={this._container}>
                    <svg ref={this._svg} width={width} height={400}>
                        <filter id="fe-shadow" x={-2} y={-2} width={100} height={100}>
                            <feDropShadow
                                dx={1}
                                dy={1}
                                stdDeviation={4}
                                className={styles.shadow}
                            />
                        </filter>
                        <g ref={this._xAxis}/>
                        <g ref={this._yAxis}/>
                        <g ref={this._xGrid}/>
                        <g ref={this._yGrid}/>
                        <g ref={this._chart} className={styles.chart}>
                            <line
                                ref={this._xRuler}
                                className={styles.ruler}
                                x1={-1}
                                x2={-1}
                                y1={margin.top}
                                y2={height + margin.top}
                            />
                            <line
                                ref={this._yRuler}
                                className={styles.ruler}
                                x1={margin.left}
                                x2={width + margin.left}
                                y1={-1}
                                y2={-1}
                            />
                            <path
                                d={line}
                                ref={this._line}
                                className={classNames(styles.line, styles.outside)}
                            />
                        </g>
                    </svg>
                </div>
            </Paper>
        );
    }
}
