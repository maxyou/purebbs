import React from 'react'
import styled from 'styled-components'
import AvatarImg from './avatar-img'

const StyledDivAvatarName = styled.div`
  height: ${props=>props.size};
  width: ${props=>props.size};
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
//   background-color: green;
  `
  const StyledDivName = styled.div`
  font-size: ${props=>props.size};
  height: 15px;
  color: #4F4F4F;
//   background-color: red;
`

export default function AvatarName(props) {
    const {src, name, size, radius} = props
    console.log('AvatarName')
    console.log(name)
    console.log(src)

    function size2Width(size){
        switch(size){
            case 'small':
                // console.log('size2Width(size) 45px')
                return '50px'
            case 'medium':
                // console.log('size2Width(size) 55px')
                return '60px'
        }
    }
        
    function size2ImgWidth(size){
        switch(size){
            case 'small':
            // console.log('size2ImgWidth(size) 35px')
            return '35px'
            case 'medium':
            // console.log('size2ImgWidth(size) 45px')
            return '45px'
        }
    }

    function calcRadius(radius){
        switch(radius){
            case 'small':
                // console.log('calcRadius(size) 5px')
                return '5px'
            case 'half':
                // console.log('calcRadius(size) 22.5px')
                return '22.5px'
            default:
                return '22.5px'
            }
        }

    function size2FontSize(size){
        switch(size){
            case 'small':
                return 'xx-small'
            case 'medium':
                return 'x-small'
        }
    }

    return (
        <div>
            <StyledDivAvatarName size={size2Width(size)}>
                <AvatarImg src={src} width={size2ImgWidth(size)} radius={calcRadius(radius)}></AvatarImg>
                <StyledDivName size={size2FontSize(size)}>{name}</StyledDivName>
            </StyledDivAvatarName>
        </div>
    )
}