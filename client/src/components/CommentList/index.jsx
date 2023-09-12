import { Container, Typography, Stack, Card, CardHeader, CardContent } from '@mui/material'

export default function CommentList({data}) {


    return(

        <Container>
            <Typography variant="h6" gutterBottom>
                Comments:
            </Typography>
                <Stack spacing={3}>
                    {data &&
                        data.comments.map(({ comment, authorName, dateCreated}) => (
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
