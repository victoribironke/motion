import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Scene2Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isPortrait = height > width;

  // Slide in from bottom
  const containerY = spring({ frame, fps, config: { damping: 14 } });
  const yOffset = interpolate(containerY, [0, 1], [200, 0]);

  // URL Input animation
  const urlOpacity = interpolate(frame, [15, 30], [0, 1], { extrapolateRight: "clamp" });

  // Frame-driven pulse for the URL dot (CSS animations don't render in Remotion)
  const dotOpacity = interpolate(Math.sin(frame / 8), [-1, 1], [0.4, 1]);

  // Generating pulse
  const generatingScale = interpolate(
    Math.sin(frame / 5),
    [-1, 1],
    [0.98, 1.02]
  );
  const generatingOpacity = interpolate(frame, [45, 60], [0, 1], { extrapolateRight: "clamp" });
  const generatingFadeOut = interpolate(frame, [100, 110], [1, 0], { extrapolateRight: "clamp" });

  // Summary Card reveal
  const summaryProgress = spring({ frame: frame - 110, fps, config: { damping: 12 } });

  // Scene fade out
  const sceneOpacity = interpolate(frame, [165, 180], [1, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill className="bg-parchment items-center justify-center overflow-hidden" style={{ opacity: sceneOpacity }}>

      <div
        className={`flex flex-col items-center w-full ${isPortrait ? "px-16" : "max-w-3xl"}`}
        style={{ transform: `translateY(${yOffset}px)` }}
      >
        <h2 className={`font-display text-ink font-bold mb-12 text-center ${isPortrait ? "text-8xl leading-tight" : "text-6xl"}`}>
          Just drop a link. Revie does the rest.
        </h2>

        {/* URL Input Bar */}
        <div
          className={`bg-ui-bg border border-ui-border rounded-full shadow-md w-full flex items-center gap-4 mb-8 ${isPortrait ? "py-6 px-10" : "py-4 px-8 max-w-2xl"}`}
          style={{ opacity: urlOpacity }}
        >
          <div className={`shrink-0 rounded-full bg-accent ${isPortrait ? "w-8 h-8" : "w-6 h-6"}`} style={{ opacity: dotOpacity }} />
          <div className={`font-sans text-ui-fg truncate w-full opacity-80 ${isPortrait ? "text-4xl" : "text-xl"}`}>
            https://goo.gl/maps/xyz...
          </div>
        </div>

        {/* Generating State */}
        <div
          className={`text-accent font-bold flex items-center gap-2 ${isPortrait ? "text-4xl" : "text-xl"}`}
          style={{
            opacity: generatingOpacity * generatingFadeOut,
            transform: `scale(${generatingScale})`
          }}
        >
          ✨ Analyzing 1,000+ reviews with AI...
        </div>

        {/* The Summary Card */}
        <div
          className={`bg-ui-bg border border-ui-border rounded-2xl shadow-2xl w-full mt-[-30px] ${isPortrait ? "p-12" : "p-8 max-w-2xl"}`}
          style={{
            opacity: summaryProgress,
            transform: `scale(${interpolate(summaryProgress, [0, 1], [0.9, 1])}) translateY(${interpolate(summaryProgress, [0, 1], [20, 0])}px)`
          }}
        >
          <div className="flex items-center gap-4 mb-6">
             <div className={`bg-ember rounded-xl flex items-center justify-center ${isPortrait ? "w-28 h-28 text-6xl" : "w-16 h-16 text-2xl"}`}>☕</div>
             <div>
                <h3 className={`font-display text-ink font-bold ${isPortrait ? "text-6xl" : "text-3xl"}`}>The Daily Roast</h3>
                <p className={`text-ui-muted-fg ${isPortrait ? "text-3xl" : "text-lg"}`}>Coffee Shop • 4.8 ★</p>
             </div>
          </div>
          <p className={`text-ui-fg leading-relaxed mb-6 ${isPortrait ? "text-4xl" : "text-lg"}`}>
            <span className="font-bold text-accent">Vibe:</span> Cozy, slightly loud but great for working. Known for their exceptional oat milk lattes.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Free WiFi", "Street Parking", "Vegan Options"].map((tag) => (
              <span key={tag} className={`bg-ember text-ink rounded-full font-medium ${isPortrait ? "px-5 py-2 text-3xl" : "px-3 py-1 text-sm"}`}>{tag}</span>
            ))}
          </div>
        </div>

      </div>
    </AbsoluteFill>
  );
};
