/*
 * LayerInfo Messages
 *
 * This contains all the text for the LayerInfo container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.LayerInfo';

export default defineMessages({
  titleReference: {
    id: `${scope}.titleReference`,
    defaultMessage: 'Reference',
  },
  multiplePositions: {
    id: `${scope}.multiplePositions`,
    defaultMessage: 'Multiple Positions',
  },
  position: {
    id: `${scope}.position`,
    defaultMessage: 'Position',
  },
  source: {
    id: `${scope}.source`,
    defaultMessage: 'Source',
  },
  sourceLinkExternal: {
    id: `${scope}.sourceLinkExternal`,
    defaultMessage: 'Go to source',
  },
});
