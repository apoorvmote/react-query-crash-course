import { Router } from "@reach/router"
import BlogList from "./BlogList"
import BlogSingle from "./BlogSingle"
import NewBlog from "./NewBlog"
import NotFound from "./NotFound"

function App(): JSX.Element {
  return (
    <Router>
      <BlogList path="/" />
      <BlogSingle path=":id" />
      <NewBlog path="blog/new" />
      <NotFound default />
    </Router>
  )
}

export default App
