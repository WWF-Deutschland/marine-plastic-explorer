/**
 *
 * LayerInfo
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Text, Box, Button, Heading } from 'grommet';
import { Back } from 'components/Icons';
// import { Back } from 'components/Icons';
import Markdown from 'react-remarkable';
import anchorme from 'anchorme';

import { DEFAULT_LOCALE } from 'i18n';

import { PROJECT_CONFIG } from 'config';

import { selectLocale } from 'containers/App/selectors';
import { setLayerInfo } from 'containers/App/actions';
import messages from './messages';

const Styled = styled.div`
  margin-top: 5px;
`;

const SupTitle = styled(p => <Button {...p} plain />)`
  text-transform: uppercase;
  font-weight: bold;
`;

const BackButton = styled(p => <Button {...p} plain />)`
  padding: 15px;
  border-radius: 99999px;
  background: ${({ theme }) => theme.global.colors.white};
  height: 40px;
  &:hover {
    background: ${({ theme }) => theme.global.colors.light};
  }
  @media (min-width: ${({ theme }) => theme.sizes.medium.minpx}) {
    height: 50px;
  }
`;

const ButtonExternal = styled(p => <Button as="a" {...p} plain />)`
  background: ${({ theme }) => theme.global.colors.brand};
  color: ${({ theme }) => theme.global.colors.white};
  border-radius: 99999px;
  padding: 13px 20px;
  font-family: 'wwfregular';
  text-transform: uppercase;
  font-size: 18px;
  line-height: 1;
  &:hover {
    background: ${({ theme }) => theme.global.colors.brandDark};
  }
`;

const Title = styled(p => <Heading level={1} {...p} />)`
  font-weight: bold;
  font-size: 1.8em;
  line-height: 1.2;
  text-align: center;
`;

const exists = str => str && str.trim().length > 0;

export function ProjectLocationContent({
  location,
  project,
  locale,
  onSetLayerInfo,
}) {
  if (!location || !project) return null;
  const title =
    location.properties[`location_title_${locale}`] ||
    location.properties[`location_title_${DEFAULT_LOCALE}`];
  const projectTitle =
    project[`project_title_${locale}`] ||
    project[`project_title_${DEFAULT_LOCALE}`];
  const locationInfo =
    location.properties[`location_info_${locale}`] ||
    location.properties[`location_info_${DEFAULT_LOCALE}`];
  const imageAttribution =
    location[`image_attribution_${locale}`] ||
    location[`image_attribution_${DEFAULT_LOCALE}`];
  const projectLink =
    location[`location_link_${locale}`] ||
    location[`location_link_${DEFAULT_LOCALE}`] ||
    project[`project_link_${locale}`] ||
    project[`project_link_${DEFAULT_LOCALE}`];
  const projectId = `${PROJECT_CONFIG.id}-${project.project_id}`;
  return (
    <Styled>
      <Box
        direction="row"
        align="top"
        gap="xsmall"
        margin={{ right: 'xlarge', bottom: 'xlarge', left: '-12px' }}
      >
        <BackButton
          plain
          onClick={() => onSetLayerInfo(projectId)}
          icon={<Back />}
        />
        <SupTitle
          onClick={() => onSetLayerInfo(projectId)}
          label={<Text size="small">{projectTitle}</Text>}
        />
      </Box>
      <Title>{title}</Title>
      {exists(location.image_url) && (
        <div>
          <figure className="mpx-figure">
            <div className="mpx-image-wrap">
              <img
                className="mpx-img"
                src={location.image_url}
                alt={imageAttribution}
              />
            </div>
            {exists(imageAttribution) && (
              <figcaption className="mpx-figcaption">
                {imageAttribution}
              </figcaption>
            )}
          </figure>
        </div>
      )}
      <div className="mpx-content">
        <Markdown
          options={{
            html: true,
          }}
          source={anchorme({
            input: locationInfo,
            options: {
              truncate: 40,
              attributes: {
                target: '_blank',
                class: 'mpx-content-link',
              },
            },
          })
            .split(' __ ')
            .map(i => i.trim())
            .join('\n\n ')}
        />
      </div>
      {exists(projectLink) && (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <ButtonExternal
            href={projectLink}
            target="_blank"
            label={
              <Box margin={{ top: '-4px' }}>
                <FormattedMessage {...messages.projectLinkExternal} />
              </Box>
            }
          />
        </div>
      )}
    </Styled>
  );
}

ProjectLocationContent.propTypes = {
  onSetLayerInfo: PropTypes.func.isRequired,
  project: PropTypes.object,
  location: PropTypes.object,
  locale: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  locale: state => selectLocale(state),
});

function mapDispatchToProps(dispatch) {
  return {
    onSetLayerInfo: id => {
      dispatch(setLayerInfo(id));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ProjectLocationContent);
