import React from 'react'
import { Box, Text, Anchor } from 'grommet'
import styled from 'styled-components'

const ResponsiveText = styled(Text)`
  font-size: 1.3vw;
`

const FooterBox = styled(Box)`
color: white;

min-height: 20vh;
width:100%;
min-width: 100%;
bottom: 0; left: 0; right: 0;
`

const FlexBox = styled(Box)`
display: flex;
justify-content: space-between;
align-items: center;
`

const Footer = () => (
  <FooterBox direction="row-responsive" background={{color: 'brand'}} justify="start" align="center">
    <FlexBox width="70vw" gap="large" margin={{ left: '15vw', right: '15vw' }}>
      <ResponsiveText responsive size="1.3vw">
                                Copyright &copy; 2019
        <Anchor color="white" fontWeight="300" label=" StoreApp. " />
                                All Rights reserved .
      </ResponsiveText>
    </FlexBox>
  </FooterBox>
)

Footer.propTypes = {

}

export default Footer
