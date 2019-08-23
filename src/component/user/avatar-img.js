import React from 'react'
import styled from 'styled-components'

const StyledImg = styled.img`
    width: ${props => props.width};
    height: ${props => props.height?props.height:props.width};
    border-radius: ${props => props.radius};
    // border:1px solid #dede00;
`

export default function AvatarImg({src, width, height, radius}) {
    // console.log('AvatarImg')
    // console.log(src)
    // console.log(width)
    // return (<StyledDiv style={{ backgroundImage: 'url(' + props.url + ')' }}></StyledDiv>)    
    return (<StyledImg width={width} height={height} src={src} radius={radius} alt="avatar"/>)
}