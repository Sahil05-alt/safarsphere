import { Link } from 'react-router-dom';
export default function NotFound() {
  return <main className="min-h-[100svh] grid place-items-center text-center p-6"><div><h1 className="h-lg mb-4">Lost on the ghats</h1><Link to="/" className="btn">Back home</Link></div></main>;
}
