import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { AvatarImg } from '@/component/user'
import { time } from '@/tool'
import { sys } from '@/tool'
import { Dispatch } from 'redux';
import { user as actionUser } from '@/redux/action'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const StyledDivCard = styled.div`
    width:100%;
    height:150px;
    // background-color: #c2c456;
    `

const GQL_BOOKS = gql`
  {
    book{
      title
      author{
        name
      }
    }
  } 
`;
const GQL_POSTS = gql`
  {
    posts{
      title
      id
    }
  } 
`;

const postlist: React.FC<IProps> = function ({ user }: IProps) {

    //显示最近50条post

    const { loading, error, data, networkStatus } = useQuery(GQL_POSTS);
    // const [getDog, { loading, data }] = useLazyQuery(GQL_BOOKS);

    if (loading) return <p>Loading...</p>;
    if (error) {
        console.log('userQuery error:')
        console.log(JSON.stringify(error))
        return <p>Error :(</p>;
    }

    console.log('userQuery data:')
    console.log(data)
    return data.posts.map(({ title, id }) => (
        <div key={id}>
            <p>
                {id}: {title}
            </p>
        </div>
    ));

    // return (
    //     <StyledDivCard>
    //         <button onClick={() => getDog()}>
    //             Click me!
    //         </button>
    //         {JSON.stringify(user)}
    //     </StyledDivCard>
    // );
}

interface IProps extends RouteComponentProps<any> {
    user: any,
}
interface IRouterProp {
    history: any,
    match: any,
}
interface IState2Prop {
    words: any,
}
interface IDispatch2Prop {

}
const mapStateToProps: { (arg0: any): IState2Prop } = state => ({
    words: state.locale.words,
})

const mapDispatchToProps: { (dispatch: Dispatch): IDispatch2Prop } = (dispatch: Dispatch) => ({

})

export default withRouter<IProps, any>(
    (connect(
        mapStateToProps,
        mapDispatchToProps
    ) as any)(postlist)
)