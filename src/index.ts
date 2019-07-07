import app from './app'

const port = process.env.PORT || 4001

app.listen(port, (): void => {
  console.log(`Server started at http://localhost:${port}`)
})
