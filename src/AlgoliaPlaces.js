import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function AlgoliaPlaces({
  placeholder = 'Type an address',
  placesRef = null,
  onCursorChanged = null,
  onSuggestions = null,
  onChange = null,
  onClear = null,
  onLocate = null,
  onLimit = null,
  onError = null,
  options = {},
  ...inputProps
}) {
  const autocompleteElem = useRef(null);
  const autocomplete = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line global-require
    const Places = (typeof window !== 'undefined') && require('places.js');
    if (!Places) return;

    autocomplete.current = Places({
      ...options,
      container: autocompleteElem.current,
    });

    if (placesRef) placesRef(autocomplete.current);

    const eventMap = [
      { prop: onSuggestions, eventName: 'suggestions' },
      { prop: onCursorChanged, eventName: 'cursorchanged' },
      { prop: onChange, eventName: 'change' },
      { prop: onClear, eventName: 'clear' },
      { prop: onLocate, eventName: 'locate' },
      { prop: onLimit, eventName: 'limit' },
      { prop: onError, eventName: 'error' },
    ];

    const activeEvents = eventMap.filter(({ prop }) => !!prop);

    activeEvents.forEach(({ prop, eventName }) => {
      autocomplete.current.on(eventName, prop);
    });

    // eslint-disable-next-line consistent-return
    return () => {
      activeEvents.forEach(({ eventName }) => {
        autocomplete.current.removeAllListeners(eventName);
      });
    };
  }, []);

  return (
    <div>
      <input
        type="text"
        aria-label={placeholder}
        ref={autocompleteElem}
        {...inputProps}
      />
    </div>
  );
}

AlgoliaPlaces.propTypes = {
  placeholder: PropTypes.string.isRequired,
  placesRef: PropTypes.func,
  onCursorChanged: PropTypes.func,
  onSuggestions: PropTypes.func,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  onLocate: PropTypes.func,
  onLimit: PropTypes.func,
  onError: PropTypes.func,
  options: PropTypes.shape({
    type: PropTypes.oneOf([
      'city',
      'country',
      'address',
      'busStop',
      'trainStation',
      'townhall',
      'airport',
    ]),
    countries: PropTypes.arrayOf(PropTypes.string),
    aroundLatLng: PropTypes.string,
    aroundLatLngViaIP: PropTypes.bool,
    aroundRadius: PropTypes.number,
    templates: PropTypes.shape({
      suggestion: PropTypes.func,
      value: PropTypes.func,
    }),
    style: PropTypes.bool,
    appId: PropTypes.string,
    apiKey: PropTypes.string,
    useDeviceLocation: PropTypes.bool,
    insideBoundingBox: PropTypes.string,
    insidePolygon: PropTypes.string,
  }),
};

export default AlgoliaPlaces;
