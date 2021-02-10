import { RouteComponentProps, useNavigate } from "@reach/router"
import { Blog, BlogInput, MyError } from "MyTypes"
import { nanoid } from "nanoid"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"
import useNewBlog from "../hooks/useNewBlog"

type Props = RouteComponentProps

function NewBlog(props: Props): JSX.Element {
  const { register, handleSubmit } = useForm<BlogInput>()

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  //   const { mutate, isLoading } = useNewBlog();

  async function onSubmit(input: BlogInput) {
    const newBlog: Blog = {
      id: nanoid(),
      preview: input.content.substr(0, 70),
      ...input,
    }

    // mutate(newBlog);

    setIsLoading(true)

    try {
      await fetch("http://localhost:4000/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBlog),
      })

      setIsLoading(false)

      navigate("/")
    } catch (err) {
      console.log(err)

      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-indigo-200">
      <form onSubmit={handleSubmit(onSubmit)} className="grid max-w-6xl grid-cols-1 gap-6 px-6 py-6 mx-auto">
        <h1 className="pb-6 text-6xl font-bold">New Blog</h1>
        <div className="grid grid-cols-1 gap-6">
          <label htmlFor="title" className="text-xl font-bold">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="px-4 py-2 border-none rounded bg-indigo-50 focus:ring-2 focus:outline-none focus:ring-indigo-600"
            autoComplete="off"
            ref={register}
          />
        </div>
        <div className="grid grid-cols-1 gap-6">
          <label htmlFor="content" className="text-xl font-bold">
            Content
          </label>
          <textarea
            name="content"
            id="content"
            cols={30}
            rows={10}
            ref={register}
            className="px-4 py-2 border-none rounded bg-indigo-50 focus:ring-2 focus:outline-none focus:ring-indigo-600"
          />
        </div>
        <div className="flex">
          <button
            type="submit"
            className="px-4 py-2 mr-10 font-semibold text-white bg-indigo-800 rounded hover:bg-indigo-700"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            className="px-4 py-2 text-indigo-900 border border-indigo-900 rounded hover:underline"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  )
}

export default NewBlog
