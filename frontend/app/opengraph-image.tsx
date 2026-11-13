import { ImageResponse } from 'next/og'

// -----------------------------------------------------------------------------
// Image Metadata
// Next.js reads these exports to generate the <meta> tags automatically.
// -----------------------------------------------------------------------------
export const alt = 'Aditya Waradkar Portfolio'
export const size = {
  width: 1200,
  height: 630, // Standard 1.91:1 ratio for social media cards
}
export const contentType = 'image/png'

// -----------------------------------------------------------------------------
// Image Generation
// This function runs on the server to dynamically generate the image using JSX.
// -----------------------------------------------------------------------------
export default async function Image() {
  return new ImageResponse(
    (
      // Main Container: Sets the background color and centers everything
      <div
        style={{
          background: '#FAF6F0', // Cream background (matches site)
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Inner Border Box: Creates a framed, editorial look */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #C4A882', // Brown light border
            padding: '60px 80px',
            borderRadius: '16px',
          }}
        >
          {/* Main Title */}
          <h1
            style={{
              fontSize: 72,
              color: '#4A3728', // Brown deep
              marginBottom: 20,
              fontWeight: 700,
            }}
          >
            Aditya Waradkar
          </h1>
          
          {/* Subtitle */}
          <p
            style={{
              fontSize: 32,
              color: '#7A5C45', // Brown mid
              margin: 0,
            }}
          >
            DevOps Engineer & Pencil Artist
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}