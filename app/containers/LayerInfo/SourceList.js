/**
 *
 * SourceList
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { intlShape, injectIntl } from 'react-intl';

import { POLICY_LAYERS } from 'config';
import { useInjectSaga } from 'utils/injectSaga';
import { getSourcesFromCountryFeaturesWithPosition } from 'utils/positions';

import saga from 'containers/Map/saga';
import { selectLayerByKey } from 'containers/Map/selectors';
import { loadLayer } from 'containers/Map/actions';

import coreMessages from 'messages';

import FeatureList from './FeatureList';

export function SourceList({ onLoadLayer, config, layer, intl }) {
  useInjectSaga({ key: 'map', saga });

  useEffect(() => {
    // kick off loading of page content
    if (config && POLICY_LAYERS.indexOf(config.id) > -1) {
      onLoadLayer(config.id, config);
    }
  }, [config]);

  // const { locale } = intl;

  if (
    !config ||
    POLICY_LAYERS.indexOf(config.id) === -1 ||
    !layer ||
    !layer.data ||
    !layer.data.features
  ) {
    return null;
  }

  const sources = getSourcesFromCountryFeaturesWithPosition(
    config,
    layer.data.features,
  );

  return sources ? (
    <FeatureList
      title={intl.formatMessage(coreMessages.sources, {
        count: Object.keys(sources).length,
      })}
      layerId={config.id}
      items={Object.values(sources)}
      config={config}
      searchable
    />
  ) : null;
}

SourceList.propTypes = {
  onLoadLayer: PropTypes.func.isRequired,
  config: PropTypes.object,
  layer: PropTypes.object,
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  layer: (state, { config }) => {
    if (config && POLICY_LAYERS.indexOf(config.id) > -1) {
      return selectLayerByKey(state, config.id);
    }
    return null;
  },
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadLayer: (id, config) => {
      dispatch(loadLayer(id, config));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(SourceList));
