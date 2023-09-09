// import { useState } from "react"
import { QUERY_LISTING_COMMENTS } from "../../utils/queries";
import { useQuery } from "@apollo/client";

export default function CommentList({zID}) {

    const {data, loading, error} = useQuery(QUERY_LISTING_COMMENTS, {variables: { zID: zID }})
    const commentData = data?.listingComments || []
    console.log(zID)
    if (loading) return <div>loading...</div>
    if (error) return <div>error {error.message}</div>

    return(
        <div>
        {commentData && 
        commentData.map(({comment, authorName, dateCreated, _id}) => (
            <div key={_id}>
                <p>{comment}</p>
                <p>{authorName}</p>
                <p>{dateCreated}</p>
            </div>
        ))
        }
        </div>
    )
}
