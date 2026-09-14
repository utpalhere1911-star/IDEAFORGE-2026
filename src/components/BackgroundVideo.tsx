interface BackgroundVideoProps {
  src?: string;
}

export default function BackgroundVideo({ src }: BackgroundVideoProps) {
  return (
    <div className="background-video-layer" aria-hidden="true">
      {src ? (
        <video
          className="background-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : null}
      <div className="background-video-overlay" />
    </div>
  );
}
