import { ImageResponse } from 'next/og'

// Image metadata
export const alt = 'Aditya Waradkar Portfolio'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#FAF6F0', // Cream
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #C4A882',
            padding: '60px 80px',
            borderRadius: '16px',
          }}
        >
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