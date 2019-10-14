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
const GQL_POSTS = gql`
  query Posts($id: String!, $length: Int!){
    posts(id:$id, length:$length){
      title
      postId
    }
  } 
`;

const lastPostsLength = 30 //显示用户最后30条post
const postlist: React.FC<IProps> = function ({ id }: IProps) {

    //显示最近50条post
    console.log('==========postlist user.id')
    console.log(id)

    if (!id) {
        return null
    }

    const { loading, error, data, networkStatus } = useQuery(GQL_POSTS, {
        variables: {
            id: id,
            length: lastPostsLength
        }
    });
    // const [getDog, { loading, data }] = useLazyQuery(GQL_BOOKS);

    if (loading) return <p>Loading...</p>;
    if (error) {
        console.log('userQuery error:')
        console.log(JSON.stringify(error))
        return <p>Error :(</p>;
    }

    console.log('userQuery data:')
    console.log(data)

    return (

        <fieldset>
            <legend>{lastPostsLength}</legend>
            {
                data.posts.map(({ title, postId }) => (
                    <div key={postId}>
                        <p>
                            {postId}: {title}
                        </p>
                    </div>
                ))
            }
        </fieldset>
    )

}

interface IProps extends RouteComponentProps<any> {
    id: string,
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