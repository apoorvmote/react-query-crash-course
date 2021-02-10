import { Link, RouteComponentProps } from "@reach/router"

type Props = RouteComponentProps

function NotFound(props: Props): JSX.Element {
  return (
    <div>
      <h1>Page not found.</h1>
      <p>
        <Link to="/">Go back home</Link>
      </p>
    </div>
  )
}

export default NotFound
