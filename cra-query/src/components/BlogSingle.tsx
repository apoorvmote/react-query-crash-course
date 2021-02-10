import { Link, RouteComponentProps } from "@reach/router"
import { Fragment } from "react"
import { useIsFetching } from "react-query"
import useBlogSingle from "../hooks/useBlogSingle"

interface Props extends RouteComponentProps {
  id?: string
}

function BlogSingle(props: Props): JSX.Element {
  const { data, isLoading, isError, error, isFetching } = useBlogSingle(props.id)

  // const isFetching = useIsFetching()

  function RenderBlog() {
    if (isLoading) return <h3>Loading...</h3>

    if (error) console.log(Object.values(error))

    if (isError) return <div>Something went wrong {error?.message}</div>

    if (!data) return <h3>Blog not found or does not exist</h3>

    return (
      <Fragment>
        <h1 className="my-6 text-5xl font-bold">{data.title}</h1>
        <p>{data.content}</p>
      </Fragment>
    )
  }

  return (
    <main className="min-h-screen bg-indigo-50">
      <article className="max-w-6xl px-6 py-6 mx-auto">
        <nav className="my-6">
          <Link to="/" className="px-4 py-2 text-indigo-900 border border-indigo-900 rounded">
            &#8592;Back to List
          </Link>
        </nav>
        {isFetching ? <h3>Syncing...</h3> : null}
        <RenderBlog />
      </article>
    </main>
  )
}

export default BlogSingle
