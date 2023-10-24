import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from 'rebass';
import styled from 'styled-components';
import { JSONTree } from 'react-json-tree';

const PanelHeader = styled.div`
  background: blue;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  color: #fff;
  margin-top: 10px;
  padding: 10px;
`;

const CallbackPanel = styled.div`
  color: blue;
  margin-top: 20px;
`;

function FiredCallbacks({ callbacks }) {
  return (
    <>
      <Heading fontSize={3}>Fired callbacks:</Heading>
      {callbacks.map((cb, index, arr) => (
        <CallbackPanel key={(arr.length - index).toString()}>
          <PanelHeader>
            {cb.name}
          </PanelHeader>
          {cb.args && (
            <JSONTree
              data={cb.args}
              shouldExpandNode={() => true}
            />
          )}
        </CallbackPanel>
      ))}
    </>
  );
}

FiredCallbacks.propTypes = {
  callbacks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      args: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
      ]),
    }),
  ).isRequired,
};

export default FiredCallbacks;
