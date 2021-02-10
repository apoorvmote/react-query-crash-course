import { Link, RouteComponentProps } from "@reach/router"
import { useEffect } from "react"
import useBlogList from "../hooks/useBlogList"

function List() {
  const { isLoading, data, isError, error } = useBlogList()

  if (isLoading) return <div>Loading...</div>

  if (isError) return <div>Something went wrong {error?.message}</div>

  if (!data || data.length === 0) return <div>No blog</div>

  return (
    <main className="grid grid-cols-3 gap-6">
      {data.map((item) => {
        return (
          <article key={item.id} className="px-6 py-6 bg-indigo-50 rounded-xl">
            <h1 className="pb-6">
              <Link to={`${item.id}`} className="text-3xl font-bold text-indigo-800 hover:underline">
                {item.title}
              </Link>
            </h1>
            <p className="pb-6">{item.preview}...</p>
            <Link to={`${item.id}`} className="px-4 py-2 text-white bg-indigo-800 rounded hover:bg-indigo-700">
              Read More -{">"}
            </Link>
          </article>
        )
      })}
    </main>
  )
}

type Props = RouteComponentProps

function BlogList(props: Props): JSX.Element {
  useEffect(() => {
    document.title = "Blog List | React Query"
  }, [])

  return (
    <div className="min-h-screen bg-indigo-100">
      <div className="mx-auto max-w-6xl">
        <header className="flex items-center justify-between py-10">
          <h1 className="text-6xl font-bold">Blog List</h1>
          <Link
            to="blog/new"
            className="px-6 py-3 text-indigo-900 border border-indigo-900 rounded-xl hover:underline hover:bg-indigo-200"
          >
            New Blog
          </Link>
        </header>
        <List />
      </div>
    </div>
  )
}

export default BlogList
