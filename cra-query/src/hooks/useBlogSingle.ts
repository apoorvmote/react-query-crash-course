import { Blog, MyError } from "MyTypes"
import { useEffect, useState } from "react"
import { QueryObserverResult, useQuery, useQueryClient } from "react-query"

// interface BlogResult {
//   isLoading: boolean
//   isError: boolean
//   error: MyError | null
//   data?: Blog
// }

// export default function useBlogSingle(id?: string): BlogResult {
//   const [blog, setBlog] = useState<Blog | undefined>(undefined)

//   const [isError, setIsError] = useState(false)

//   const [error, setError] = useState<MyError | null>(null)

//   const [isLoading, setIsLoading] = useState(false)

//   useEffect(() => {
//     function getBlogSingle(id: string) {
//       setIsLoading(true)

//       fetch(`http://localhost:4000/blogs/${id}`)
//         .then((res) => res.json())
//         .then((res) => {
//           setTimeout(() => {
//             setIsLoading(false)

//             setBlog(res)
//           }, 4000)
//         })
//         .catch((err: MyError) => {
//           setIsLoading(false)

//           setIsError(true)

//           setError(err)
//         })
//     }

//     if (id) {
//       getBlogSingle(id)
//     }
//   }, [id])

//   return {
//     data: blog,
//     isLoading,
//     isError,
//     error,
//   }
// }

// export default function useBlogSingle(id?: string): QueryObserverResult<Blog, MyError> {
//   return useQuery<Blog, MyError, Blog>(
//     ["blogs", id],
//     () => {
//       return fetch(`http://localhost:4000/blogs/${id}`)
//         .then((res) => {
//           if (!res.ok) throw Error(res.statusText)

//           return res.json()
//         })
//         .then((res) => {
//           return new Promise<Blog>((resolve) => {
//             setTimeout(() => {
//               resolve(res)
//             }, 4000)
//           })
//         })
//     },
//     {
//       // refetchOnWindowFocus: false,
//       // refetchOnMount: false,
//       // staleTime: 5 * 60 * 1000,
//     }
//   )
// }

// export default function useBlogSingle(id?: string): QueryObserverResult<Blog, MyError> {
//   const client = useQueryClient()

//   const state = client.getQueryState<Blog[], MyError>("blogs")

//   let initialDataUpdatedAt = state?.dataUpdatedAt ?? Date.now()

//   return useQuery<Blog, MyError, Blog>(
//     ["blogs", id],
//     () => {
//       return fetch(`http://localhost:4000/blogs/${id}`)
//         .then((res) => {
//           if (!res.ok) throw Error(res.statusText)

//           return res.json()
//         })
//         .then((res) => {
//           return new Promise<Blog>((resolve) => {
//             setTimeout(() => {
//               resolve(res)

//               initialDataUpdatedAt = Date.now()
//             }, 4000)
//           })
//         })
//     },
//     {
//       staleTime: 5 * 60 * 1000,
//       initialData: () => {
//         const item = client.getQueryData<Blog[]>("blogs")?.find((item) => item.id === id)

//         if (item) {
//           // item.content = item.preview

//           return item
//         }

//         return undefined
//       },
//       initialDataUpdatedAt,
//     }
//   )
// }

interface CancelablePromise extends Promise<Blog> {
  cancel?: () => void
}

export default function useBlogSingle(id?: string): QueryObserverResult<Blog, MyError> {
  return useQuery<Blog, MyError, Blog>(["blogs", id], () => {
    const controller = new AbortController()

    const signal = controller.signal

    const promise: CancelablePromise = fetch(`http://localhost:4000/blogs/${id}`, {
      method: "GET",
      signal,
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
      })

    promise.cancel = () => controller.abort()

    return promise
  })
}
