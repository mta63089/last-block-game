import SiteHeader from "@/components/site-header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <div className='flex flex-1'>{children}</div>
    </>
  );
}
