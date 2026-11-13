// This component adds a subtle paper-grain texture over the entire site to give it an artistic, editorial feel.
export default function GrainOverlay() {
  return (
    <div 
      // pointer-events-none: Ensures the overlay doesn't block clicks on links/buttons
      // mix-blend-multiply: Blends the noise texture with the cream background
      // fixed inset-0: Covers the entire viewport
      // z-[100]: Keeps it above the content but below modals/lightboxes
      className="pointer-events-none fixed inset-0 z-[100] mix-blend-multiply opacity-50"
      style={{ backgroundImage: "url('/noise.svg')" }}
      aria-hidden="true"
    />
  );
}