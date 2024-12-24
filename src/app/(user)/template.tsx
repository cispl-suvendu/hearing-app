export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-skyLight h-fit">
      <div className="w-9/12	mx-auto">
        {children}
      </div>
    </div>
  )
}