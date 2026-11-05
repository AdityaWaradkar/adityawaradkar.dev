export default function GrainOverlay() {
  return (
    <div 
      className="pointer-events-none fixed inset-0 z-[100] mix-blend-multiply opacity-50"
      style={{ backgroundImage: "url('/noise.svg')" }}
      aria-hidden="true"
    />
  );
}