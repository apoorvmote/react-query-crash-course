import { useNavigate } from "@reach/router"
import { Blog, MyError } from "MyTypes"
import { useMutation, UseMutationResult, useQueryClient } from "react-query"

export default function useNewBlog(): UseMutationResult<Blog, MyError, Blog, unknown> {
  const client = useQueryClient()

  const navigate = useNavigate()

  return useMutation<Blog, MyError, Blog>(
    (blog: Blog) =>
      fetch("http://localhost:4000/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blog),
      })
        .then((res) => {
          if (!res.ok) throw Error(res.statusText)

          return res.json()
        })
        .then((res) => {
          return new Promise<Blog>((resolve) => {
            setTimeout(() => {
              resolve(res)
            }, 4000)
          })
        }),
    {
      // onSuccess: (res) => {
      //   client.setQueryData("blogs", (old: Blog[] | undefined) => {
      //     if (!old) return [res]

      //     const stuff = [...old]

      //     stuff.push(res)

      //     return stuff
      //   })

      //   navigate("/")
      // },
      onMutate: async (blog) => {
        await client.cancelQueries("blogs")

        const oldData = client.getQueryData<Blog[]>("blogs")

        if (oldData) {
          const stuff = [...oldData]

          stuff.push(blog)

          client.setQueryData("blogs", stuff)
        } else {
          client.setQueryData("blogs", [blog])
        }

        navigate("/")

        return { oldData }
      },
      onError: (error: MyError, variables: Blog, context: any) => {
        client.setQueryData("blogs", context.oldData)
      },
      onSettled: () => {
        // client.invalidateQueries("blogs")
        client.invalidateQueries("blogs", { exact: true })
      },
    }
  )
}
