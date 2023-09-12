// import { useState } from "react"
import { QUERY_LISTING_COMMENTS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { TextField, Button, FormGroup, Container, Typography, Stack, Card, CardHeader, CardContent } from '@mui/material'

export default function CommentList({zID}) {

        // useEffect(() => {
        
        // }, [data])


    const {data, loading, error} = useQuery
        (QUERY_LISTING_COMMENTS, { variables: { zillowID: zID }})

    const commentData = data?.listingComments || [];

    if (loading) return <div>loading...</div>
    if (error) return <div>error {error.message}</div>

    return(

        <Container>
            <Typography variant="h6" gutterBottom>
                Comments:
            </Typography>
                <Stack spacing={3}>
                    {commentData &&
                        commentData.comments.map(({ comment, authorName, dateCreated}) => (
                            <Card key={dateCreated} variant="outlined">

                                <CardHeader
                                    title={authorName}
                                    subheader={dateCreated}
                                >
                                </CardHeader>

                                <CardContent>
                                    <Typography variant="paragraph">
                                        {comment}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                </Stack>
  
        </Container>
    )
}
