declare module "MyTypes" {
  export interface BlogInput {
    title: string
    content: string
  }

  export interface Blog extends BlogInput {
    id: string
    preview: string
  }

  export interface MyError {
    message?: string
  }
}
