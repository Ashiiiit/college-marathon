import "./globals.css";

export const metadata = {
  title: "ATAL MARATHON × Meraki'26 | ANIIMS",
  description: "Official registration portal for the Meraki'26 ATALRUN 5KM Marathon. Push your limits and conquer the route from Cellular Jail to Netaji Stadium.",
  keywords: ["Meraki 26", "ATALRUN", "ANIIMS marathon", "Andaman marathon", "5KM run", "ATAL Foundation", "Sri Vijaya Puram events"],
  verification: {
    google: 'Xq8jl4jBTxALCg4aPeXhvIF_Z0ledJZ5mIHqrhMM-48', // <--- Paste it right here!
  },
  openGraph: {
    title: "ATAL MARATHON × Meraki'26",
    description: "Official registration for the 5KM ATALRUN.",
    url: 'https://atalrun.vercel.app', 
    siteName: "ATAL MARATHON",
    images: [
      {
        url: 'https://atalrun.vercel.app/Untitled%20design_20260312_121903_0000.png',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  // 👇 Google's Official "Site Name" Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ATAL MARATHON x MERAKI'26",
    "alternateName": ["Meraki'26", "ATAL Marathon", "ANIIMS Marathon"],
    "url": "https://atalrun.vercel.app/" 
  };

  return (
    <html lang="en">
      <head>
        {/* Inject the JSON-LD script directly into the head */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}