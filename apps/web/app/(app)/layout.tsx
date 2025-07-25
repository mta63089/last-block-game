import SiteHeader from "@/components/site-header"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <SiteHeader />
      <div className="flex flex-1 pt-16">{children}</div>
    </div>
  )
}
