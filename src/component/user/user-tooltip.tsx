import React from 'react'
import styled from 'styled-components'
import AvatarImg from './avatar-img'

const StyledSpanAvatarTooltip = styled.span<{top:string, left:string}>`
  position: absolute;
  z-index:1;

  top: ${props=>props.top};
  left: ${props=>props.left}; 
  
  width: 250px;
  background-color: #9f9;  
  visibility: hidden;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  font-size: small;
//   margin-left: 10px;
  padding-left: 10px;
`
const StyledDivAvatarInTooltip = styled.div`
//   padding-left: 10px;
  display:flex;
  justify-content: flex-start;
  align-items: center;
`
const StyledDivAvatarInTooltipText = styled.div`
  padding-left: 10px;
  display:flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
`

const UserTip = (props:any) => {

    const { avatarPath, name, intro, topLeft } = props

    return (
        <StyledSpanAvatarTooltip top={topLeft.top} left={topLeft.left}>
            <StyledDivAvatarInTooltip>
                <AvatarImg src={avatarPath} width='40px' radius='20px' />
                <StyledDivAvatarInTooltipText>
                    <div>{name}</div>
                    <div>{intro}</div>
                </StyledDivAvatarInTooltipText>
            </StyledDivAvatarInTooltip>
        </StyledSpanAvatarTooltip>
    )
}

export default UserTip