import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { DropButton, Button, Box, ResponsiveContext } from 'grommet';
import { Menu } from 'grommet-icons';

import { selectRouterPath } from 'containers/App/selectors';
import { navigate, navigatePage, navigateHome } from 'containers/App/actions';
import { MODULES, PAGES } from 'config';

import LocaleToggle from 'containers/LocaleToggle';

import { isMinSize, isMaxSize } from 'utils/responsive';

import commonMessages from 'messages';

import NavBar from './NavBar';

const MenuButton = styled(props => (
  <DropButton plain {...props} fill="vertical" />
))`
  text-align: center;
  background: black !important;
  width: 40px;
  min-width: 40px;
`;

const MenuOpen = styled(Menu)`
  transform: rotate(90deg);
`;

const NavSecondary = styled(props => (
  <Box {...props} direction="row" gap="small" align="center" fill="vertical" />
))``;
const NavPrimary = styled(props => (
  <Box {...props} direction="row" align="center" fill="vertical" />
))``;

// prettier-ignore
const Primary = styled(props => <Button {...props} plain fill="vertical" />)`
  font-family: 'wwfregular';
  letter-spacing: 0.05em;
  text-decoration: none;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.text.large.size};
  opacity: 1;
  color: ${({ theme, active }) =>
    theme.global.colors[active ? 'black' : 'white']};
  background: ${({ theme, active }) =>
    active ? theme.global.colors.light : 'transparent'};
  border-right: 1px solid;
  border-left: 1px solid;
  border-color: ${({ theme }) => theme.global.colors.light};
  &:hover {
    text-decoration: ${({ active }) => (active ? 'none' : 'underline')};
  }
  width: 50px;
  @media (min-width: ${({ theme }) => theme.sizes.medium.minpx}) {
    width: auto;
    min-width: 120px;
    padding: 0 ${({ theme }) => theme.global.edgeSize.small};
  }
  @media (min-width: ${({ theme }) => theme.sizes.large.minpx}) {
    min-width: 140px;
    padding: 0 ${({ theme }) => theme.global.edgeSize.ms};
  }
`;
// prettier-ignore
const Secondary = styled(props => <Button {...props} plain />)`
  font-size: ${({ theme }) => theme.text.medium.size};
  padding: ${({ theme }) => theme.global.edgeSize.small};
  color: ${({ theme }) => theme.global.colors.white};
  text-decoration: ${({ active }) => (active ? 'underline' : 'none')};
  background: transparent;
  &:hover {
    text-decoration: underline;
  }
  @media (min-width: ${({ theme }) => theme.sizes.large.minpx}) {
    font-size: ${({ theme }) => theme.text.large.size};
    font-family: 'wwfregular';
    letter-spacing: 0.05em;
    padding: 0 ${({ theme }) => theme.global.edgeSize.small};
    padding-right: ${({ theme, last }) =>
    last ? 0 : theme.global.edgeSize.small};
  }
`;

const Brand = styled(props => <Button {...props} plain fill="vertical" />)`
  font-family: 'wwfregular';
  text-transform: uppercase;
  letter-spacing: 0.05em;
  z-index: 3000;
  max-width: 85px;
  padding-right: ${({ theme }) => theme.global.edgeSize.xsmall};
  color: ${({ theme }) => theme.global.colors.white};
  font-size: ${({ theme }) => theme.text.small.size};
  @media (min-width: ${({ theme }) => theme.sizes.medium.minpx}) {
    max-width: 120px;
    font-size: ${({ theme }) => theme.text.large.size};
  }
`;
const BrandWWFWrap = styled(props => <Box {...props} />)`
  position: relative;
  width: 44px;
  @media (min-width: ${({ theme }) => theme.sizes.medium.minpx}) {
    width: 60px;
  }
`;
const BrandWWF = styled(props => <Button {...props} plain />)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3000;
  height: 50px;
  width: 44px;
  background: ${({ theme }) => theme.global.colors.white};
  @media (min-width: ${({ theme }) => theme.sizes.medium.minpx}) {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    height: 68px;
    width: 60px;
  }
`;

const toArray = obj =>
  Object.keys(obj).map(key => ({
    key,
    ...obj[key],
  }));

function Header({ nav, navPage, path, navHome }) {
  const [showMenu, setShowMenu] = useState(false);

  const paths = path.split('/');
  const route = path[0] === '/' ? paths[2] : paths[1];
  const pagesArray = toArray(PAGES);
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <>
          <NavBar
            justify={isMinSize(size, 'large') ? 'start' : 'between'}
            alignContent="end"
            pad={
              isMinSize(size, 'large')
                ? { horizontal: 'medium' }
                : { left: 'medium', right: 'small' }
            }
            gap="none"
          >
            <Box
              direction="row"
              fill
              gap="small"
              justify={isMinSize(size, 'medium') ? 'start' : 'between'}
            >
              {!window.wwfMpxInsideIframe && (
                <BrandWWFWrap>
                  <BrandWWF as="a" target="_blank" href="//wwf.de" />
                </BrandWWFWrap>
              )}
              <Brand
                onClick={() => navHome()}
                label={<FormattedMessage {...commonMessages.appTitle} />}
              />
              <NavPrimary
                margin={{
                  left: isMaxSize(size, 'small') ? 'auto' : '0',
                  right: isMaxSize(size, 'small') ? 'small' : '0',
                }}
              >
                {toArray(MODULES).map((m, index) => (
                  <Primary
                    key={m.key}
                    onClick={() => {
                      setShowMenu(false);
                      nav(m.path);
                    }}
                    active={route === m.path}
                    disabled={route === m.path}
                    last={index === Object.keys(PAGES).length - 1}
                  >
                    <Box
                      direction="row"
                      justify={isMinSize(size, 'medium') ? 'start' : 'center'}
                      align="center"
                      gap="ms"
                    >
                      {route === m.path ? m.iconActive : m.icon}
                      {isMinSize(size, 'medium') && (
                        <FormattedMessage
                          {...commonMessages[`module_${m.key}`]}
                        />
                      )}
                    </Box>
                  </Primary>
                ))}
              </NavPrimary>
            </Box>
            {isMinSize(size, 'medium') && (
              <Box
                fill="vertical"
                flex={{ grow: 1 }}
                pad={{ left: 'small' }}
                margin={{ left: 'auto' }}
              >
                <NavSecondary justify="end">
                  {isMinSize(size, 'large') &&
                    pagesArray.map((p, index) => (
                      <Secondary
                        key={p.key}
                        fill="vertical"
                        onClick={() => navPage(p.key)}
                        label={
                          <FormattedMessage
                            {...commonMessages[`page_${p.key}`]}
                          />
                        }
                        last={index === Object.keys(PAGES).length - 1}
                      />
                    ))}
                  <LocaleToggle />
                </NavSecondary>
              </Box>
            )}
            {isMaxSize(size, 'medium') && (
              <MenuButton
                plain
                onClose={() => setShowMenu(false)}
                onOpen={() => setShowMenu(true)}
                active={showMenu}
                label={
                  showMenu ? <MenuOpen color="white" /> : <Menu color="white" />
                }
                dropProps={{
                  align: { top: 'bottom', right: 'right' },
                  plain: true,
                }}
                dropContent={
                  <Box
                    background="black"
                    pad="none"
                    margin={{ top: 'xxsmall' }}
                    elevation="small"
                    style={{ minWidth: '120px' }}
                  >
                    {pagesArray.map(p => (
                      <Secondary
                        key={p.key}
                        onClick={() => {
                          setShowMenu(false);
                          navPage(p.key);
                        }}
                        label={
                          <FormattedMessage
                            {...commonMessages[`page_${p.key}`]}
                          />
                        }
                      />
                    ))}
                    {isMaxSize(size, 'small') && <LocaleToggle list />}
                  </Box>
                }
              />
            )}
          </NavBar>
        </>
      )}
    </ResponsiveContext.Consumer>
  );
}

Header.propTypes = {
  nav: PropTypes.func,
  navPage: PropTypes.func,
  navHome: PropTypes.func,
  path: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  path: state => selectRouterPath(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    nav: path => dispatch(navigate(path, { deleteSearchParams: ['info'] })),
    navPage: id => dispatch(navigatePage(id)),
    navHome: () => dispatch(navigateHome()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
