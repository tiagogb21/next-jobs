import styled from 'styled-components';

import { Card, Container, Dropdown, Segment } from 'semantic-ui-react';

import {mobile} from '../services/constants';

export const StyledForContainer = styled(Container)`
  ${mobile} {
    margin-left: 1em !important;
    margin-right: 1em !important;
  }
`;

export const StyledForHeader = styled(Segment)`
  ${mobile} {
    > * {
      margin-bottom: 1em !important;
    }
  }
`;

export const StyledForDropdown = styled(Dropdown)`
  margin-right: 20px;
`;

export const StyledForCards = styled(Card.Group)`
  ${mobile} {
    margin-left: 0 !important;
    margin-right: -2em !important;
    margin-top: -4px !important;
  }
`;

export const StyledForCard = styled(Card)`
  border: 1px solid #d4d4d5 !important;
  box-shadow: 0 30px 30px -30px rgba(0, 0, 0, 0.2) !important;
  ${mobile} {
    margin-top: 10px;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
`;
