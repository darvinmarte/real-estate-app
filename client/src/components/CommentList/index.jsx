import { Container, Typography, Stack, Card, CardHeader, CardContent } from '@mui/material'

export default function CommentList({data}) {

    if (!data.comments) {
        return <Typography>Be the first to write something about this property! </Typography>
    }

    return(

        <>
            <Typography variant="h6" gutterBottom>
                Comments:
            </Typography>
                <Stack spacing={3}>
                    {data &&
                        data.comments.map(({ comment, authorName, dateCreated, _id}) => (
                            <Card key={_id} variant="outlined">

                                <CardHeader
                                    title={`Posted by: ${authorName}`}
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
  
        </>
    )
}
