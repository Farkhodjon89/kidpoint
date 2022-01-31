import PropTypes from 'prop-types';
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider';
import React, { useState } from 'react';
import s from './shop-price.module.scss';
import { formatPrice } from '../../utils/functions';

const railOuterStyle = {
  position: 'absolute',
  width: '100%',
  height: 42,
  borderRadius: 7,
  cursor: 'pointer',
};

const railInnerStyle = {
  position: 'absolute',
  width: '100%',
  height: 2,
  transform: 'translate(0%, -50%)',
  pointerEvents: 'none',
  backgroundColor: 'rgb(212,212,212)',
};

const SliderRail = ({ getRailProps }) => {
  return (
    <>
      <div style={railOuterStyle} {...getRailProps()} />
      <div style={railInnerStyle} />
    </>
  );
};

const Handle = ({
  domain: [min, max],
  handle: { id, value, percent },
  disabled = false,
  getHandleProps,
}) => {
  return (
    <>
      <div
        style={{
          left: `${percent}%`,
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          WebkitTapHighlightColor: 'rgba(0,0,0,0)',
          zIndex: 5,
          width: 16,
          height: 16,
          cursor: 'pointer',
          backgroundColor: '#5E697B',
          borderRadius: '50%',
        }}
        {...getHandleProps(id)}
      />
      <div
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        style={{
          left: `${percent}%`,
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          width: 16,
          height: 16,
          borderRadius: '50%',
          boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.3)',
          backgroundColor: disabled ? '#666' : '#fff',
        }}
      />
    </>
  );
};

const Track = ({ source, target, getTrackProps, disabled = false }) => {
  return (
    <div
      style={{
        position: 'absolute',
        transform: 'translate(0%, -50%)',
        height: 2,
        zIndex: 1,
        backgroundColor: disabled ? '#FF5E1A' : '#5E697B',
        borderRadius: 7,
        cursor: 'pointer',
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      {...getTrackProps()}
    />
  );
};

const Tick = ({ tick, count, format = d => d }) => {
  return (
    <div>
      <div
        style={{
          position: 'absolute',
          marginTop: 14,
          width: 1,
          height: 5,
          backgroundColor: 'rgb(200,200,200)',
          left: `${tick.percent}%`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          marginTop: 22,
          fontSize: 10,
          textAlign: 'center',
          marginLeft: `${-(100 / count) / 2}%`,
          width: `${100 / count}%`,
          left: `${tick.percent}%`,
        }}
      >
        {format(tick.value)}
      </div>
    </div>
  );
};

const ShopPrice = ({ minPrice, maxPrice, getFilterParams, filterValues }) => {
  const [minPriceValue, setMinPriceValue] = useState(minPrice);
  const [maxPriceValue, setMaxPriceValue] = useState(maxPrice);

  return (
    <div className="sidebar-widget mt-4 mt-md-5">
      <h4 className={s.priceTitle}>
        {'Цена'}
        {minPriceValue !== minPrice || maxPriceValue !== maxPrice
          ? `: ${formatPrice(minPriceValue)} - ${formatPrice(
              maxPriceValue
            )} UZS`
          : ''}
      </h4>
      <div className={s.priceTablets}>
        <div>{formatPrice(minPrice)} UZS</div>
        <div>{formatPrice(maxPrice)} UZS</div>
      </div>

      <Slider
        mode={2}
        step={1}
        domain={[minPrice, maxPrice]}
        reversed={false}
        rootStyle={{ width: '100%', position: 'relative' }}
        onChange={values => {
          const [min, max] = values;
          setMinPriceValue(min);
          setMaxPriceValue(max);
          filterValues('price', values);
        }}
        values={[minPrice, maxPrice]}
      >
        <Rail>
          {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
        </Rail>

        <Handles>
          {({ handles, getHandleProps }) => (
            <div className="slider-handles">
              {handles.map(handle => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  domain={[minPrice, maxPrice]}
                  getHandleProps={getHandleProps}
                />
              ))}
            </div>
          )}
        </Handles>

        <Tracks left={false} right={false}>
          {({ tracks, getTrackProps }) => (
            <div className="slider-tracks">
              {tracks.map(({ id, source, target }) => (
                <Track
                  key={id}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
                />
              ))}
            </div>
          )}
        </Tracks>

        {/*<Ticks count={10}>*/}
        {/*  {({ ticks }) => (*/}
        {/*    <div className="slider-ticks">*/}
        {/*      {ticks.map(tick => (*/}
        {/*        <Tick key={tick.id} tick={tick} count={ticks.length} />*/}
        {/*      ))}*/}
        {/*    </div>*/}
        {/*  )}*/}
        {/*</Ticks>*/}
      </Slider>


    </div>
  );
};

ShopPrice.propTypes = {
  minPrice: PropTypes.number,
  maxPrice: PropTypes.number,
  filterValues: PropTypes.func,
};

export default ShopPrice;
