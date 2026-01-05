import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from '@emotion/css';

interface Props extends PanelProps<SimpleOptions> {}

const getStyles = () => {
  return {
    wrapper: css`
      font-family: Open Sans;
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
};

export const SimplePanel: React.FC<Props> = ({ options, data, width, height, fieldConfig, id, eventBus }) => {
  const styles = getStyles();


  const series = data.series[0];
  const field = series?.fields.find((f) => f.type === 'number');
  const lastValue = field ? field.values.get(field.values.length - 1) : 50;
  
  
  const radius = (Math.max(10, Math.min(lastValue, 100)) / 100) * (Math.min(width, height) / 2.5);

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      
      <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', zIndex: 10 }}>
        <h1 style={{ color: 'orange', margin: 0 }}>Developed by Sudem Dincsoy</h1>
        <p style={{ margin: 0 }}>MIS 233 Final Project</p>
      </div>

      
      <svg
        className={styles.svg}
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`-${width / 2} -${height / 2} ${width} ${height}`}
      >
        <g>
          <circle 
            data-testid="simple-panel-circle" 
            style={{ fill: options.circleColor, transition: 'r 0.5s' }}
            r={radius} 
            cx={0} 
            cy={0} 
          />
        </g>
      </svg>

      {/* Alt Bilgi Kutusu */}
      <div className={styles.textBox}>
        {options.showSeriesCount && (
          <div data-testid="simple-panel-series-counter">Number of series: {data.series.length}</div>
        )}
        <div>Text option value: {options.text}</div>
      </div>
    </div>
  );
};
