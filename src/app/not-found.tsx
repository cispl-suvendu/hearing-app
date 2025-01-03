import Link from "next/link";

export default function Custom404() {
  return (
    <div className="bg-skyLight min-h-screen h-fit flex flex-col items-center justify-center">
      <h1 className="font-bold font-mono text-6xl text-primaryDark">404</h1>
      <h2 className="font-bold font-mono text-2xl m-6">Page not found!</h2>
      <Link href="/" className="btnPrimary">Back to home</Link>
    </div>
  )
}