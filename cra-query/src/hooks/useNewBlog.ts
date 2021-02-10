import { useNavigate } from "@reach/router"
import { Blog, MyError } from "MyTypes"
import { useMutation, UseMutationResult, useQueryClient } from "react-query"

export default function useNewBlog(): UseMutationResult<Blog, MyError, Blog, unknown> {
  const client = useQueryClient()

  const navigate = useNavigate()

  return useMutation<Blog, MyError, Blog>(
    (blog: Blog) =>
      fetch("http://localhost:4000/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blog),
      }).then((res) => res.json()),
    {
      //   onSuccess: (res) => {
      //     client.setQueryData("blogs", (old: Blog[] | undefined) => {
      //       if (!old) return [];

      //       const stuff = [...old];

      //       stuff.push(res);

      //       return stuff;
      //     });

      //     navigate("/");
      //   },
      onMutate: (blog) => {
        const oldData = client.getQueryData<Blog[]>("blogs")

        if (oldData) {
          const stuff = [...oldData]

          stuff.push(blog)

          client.setQueryData("blogs", stuff)

          navigate("/")
        }

        return { oldData }
      },
      onSettled: () => {
        client.invalidateQueries("blogs", { exact: true })
      },
    }
  )
}
