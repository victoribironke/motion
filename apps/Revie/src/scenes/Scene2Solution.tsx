import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Scene2Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slide in from bottom
  const containerY = spring({ frame, fps, config: { damping: 14 } });
  const yOffset = interpolate(containerY, [0, 1], [200, 0]);

  // URL Input animation
  const urlOpacity = interpolate(frame, [15, 30], [0, 1], { extrapolateRight: "clamp" });
  
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
        className="flex flex-col items-center w-full max-w-3xl"
        style={{ transform: `translateY(${yOffset}px)` }}
      >
        <h2 className="font-display text-6xl text-ink font-bold mb-12 text-center">
          Just drop a link. Revie does the rest.
        </h2>

        {/* URL Input Bar */}
        <div 
          className="bg-ui-bg border border-ui-border rounded-full py-4 px-8 shadow-md w-full max-w-2xl flex items-center gap-4 mb-8"
          style={{ opacity: urlOpacity }}
        >
          <div className="w-6 h-6 rounded-full bg-accent animate-pulse" />
          <div className="font-sans text-ui-fg text-xl truncate w-full opacity-80">
            https://goo.gl/maps/xyz...
          </div>
        </div>

        {/* Generating State */}
        <div 
          className="text-accent font-bold text-xl flex items-center gap-2"
          style={{ 
            opacity: generatingOpacity * generatingFadeOut,
            transform: `scale(${generatingScale})` 
          }}
        >
          ✨ Analyzing 1,000+ reviews with AI...
        </div>

        {/* The Summary Card */}
        <div 
          className="bg-ui-bg border border-ui-border rounded-2xl p-8 shadow-2xl w-full max-w-2xl mt-[-30px]"
          style={{ 
            opacity: summaryProgress,
            transform: `scale(${interpolate(summaryProgress, [0, 1], [0.9, 1])}) translateY(${interpolate(summaryProgress, [0, 1], [20, 0])}px)`
          }}
        >
          <div className="flex items-center gap-4 mb-6">
             <div className="w-16 h-16 bg-ember rounded-xl flex items-center justify-center text-2xl">☕</div>
             <div>
                <h3 className="font-display text-3xl text-ink font-bold">The Daily Roast</h3>
                <p className="text-ui-muted text-lg">Coffee Shop • 4.8 ★</p>
             </div>
          </div>
          <p className="text-ui-fg leading-relaxed text-lg mb-4">
            <span className="font-bold text-accent">Vibe:</span> Cozy, slightly loud but great for working. Known for their exceptional oat milk lattes.
          </p>
          <div className="flex gap-2">
            <span className="bg-ember text-ink px-3 py-1 rounded-full text-sm font-medium">Free WiFi</span>
            <span className="bg-ember text-ink px-3 py-1 rounded-full text-sm font-medium">Street Parking</span>
            <span className="bg-ember text-ink px-3 py-1 rounded-full text-sm font-medium">Vegan Options</span>
          </div>
        </div>

      </div>
    </AbsoluteFill>
  );
};
