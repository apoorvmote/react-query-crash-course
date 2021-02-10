import { Blog, MyError } from "MyTypes"
import { useEffect, useState } from "react"
import { QueryObserverResult, useQuery } from "react-query"

// interface BlogResult {
//   isLoading: boolean
//   data: Blog[]
//   isError: boolean
//   error: MyError | null
// }

// export default function useBlogList(): BlogResult {
//   const [isLoading, setIsLoading] = useState(false)

//   const [isError, setIsError] = useState(false)

//   const [error, setError] = useState<MyError | null>(null)

//   const [blogs, setBlogs] = useState<Blog[]>([])

//   useEffect(() => {
//     function getBlogList() {
//       setIsLoading(true)

//       fetch("http://localhost:4000/blogs")
//         .then((res) => res.json())
//         .then((res) => {
//           setTimeout(() => {
//             setIsLoading(false)

//             setBlogs(res)
//           }, 4000)
//         })
//         .catch((err: MyError) => {
//           setIsLoading(false)

//           setIsError(true)

//           setError(err)
//         })
//     }

//     getBlogList()
//   }, [])

//   return {
//     isLoading,
//     error,
//     isError,
//     data: blogs,
//   }
// }

export default function useBlogList(): QueryObserverResult<Blog[], MyError> {
  return useQuery<Blog[], MyError, Blog[]>(
    "blogs",
    () =>
      fetch("http://localhost:4000/blogs")
        .then((res) => {
          if (!res.ok) throw Error(res.statusText)

          return res.json()
        })
        .then((res) => {
          return new Promise<Blog[]>((resolve) => {
            setTimeout(() => {
              resolve(res)
            }, 4000)
          })
        }),
    {
      // refetchOnWindowFocus: false,
      // refetchOnMount: false,
      staleTime: 5 * 60 * 1000,
    }
  )
}
