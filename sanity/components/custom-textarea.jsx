import React from 'react';
import { Stack, Text } from '@sanity/ui';
import styled from 'styled-components';

export function CustomTextarea(props) {
  return (
    <Stack space={3}>
      <Container id={'PTE-height-container'}>
        {props.renderDefault({
          ...props,
          // remove the need to activate the PTE
          initialActive: true
        })}
      </Container>
    </Stack>
  );
}

// add a specific height to the PTE without losing the ability to resize it
const Container = styled.div`
  [data-testid='pt-editor'][data-fullscreen='false'] {
    height: 140px;
  }
`;
