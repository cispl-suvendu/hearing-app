import MainLayout from "@/components/layout"
export default function Template({ children }: { children: React.ReactNode }) {
    return <MainLayout>{children} </MainLayout>
  }