import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Scene1Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isPortrait = height > width;

  // Animate three review cards popping up chaotically
  const card1Progress = spring({ frame: frame - 10, fps, config: { damping: 12 } });
  const card2Progress = spring({ frame: frame - 25, fps, config: { damping: 12 } });
  const card3Progress = spring({ frame: frame - 40, fps, config: { damping: 12 } });

  // Fade out the entire scene at the end (assuming scene is 90 frames)
  const opacity = interpolate(frame, [75, 90], [1, 0], { extrapolateRight: "clamp" });

  // Portrait frames have room above and below the headline, so spread the cards vertically
  const positions = isPortrait
    ? [
        { top: "8%", left: "8%" },
        { top: "63%", left: "40%" },
        { top: "81%", left: "5%" },
      ]
    : [
        { top: "15%", left: "10%" },
        { top: "55%", left: "55%" },
        { top: "65%", left: "15%" },
      ];

  const reviews = [
    { name: "John D.", text: "Food was okay but the wait was too long...", progress: card1Progress, rotate: "-6deg", ...positions[0] },
    { name: "Sarah W.", text: "Is there parking??? Couldn't find any. 2 stars.", progress: card2Progress, rotate: "4deg", ...positions[1] },
    { name: "Mike T.", text: "Way too loud, menu was confusing.", progress: card3Progress, rotate: "-2deg", ...positions[2] },
  ];

  return (
    <AbsoluteFill className="bg-parchment items-center justify-center overflow-hidden" style={{ opacity }}>
      <div className={`absolute inset-0 flex flex-col items-center justify-center z-10 ${isPortrait ? "px-16" : ""}`}>
         <h1
            className={`font-display text-ink font-bold text-center mb-8 drop-shadow-sm ${isPortrait ? "text-8xl leading-tight" : "text-7xl"}`}
            style={{
              opacity: spring({ frame, fps }),
              transform: `translateY(${interpolate(spring({ frame, fps }), [0, 1], [20, 0])}px)`
            }}
         >
           Scrolling through endless reviews?
         </h1>
      </div>

      {reviews.map((r, i) => {
        return (
          <div
            key={i}
            className={`absolute bg-ui-bg border border-ui-border rounded-xl shadow-xl ${isPortrait ? "p-10 w-[540px]" : "p-6 w-80"}`}
            style={{
              top: r.top,
              left: r.left,
              transform: `scale(${r.progress}) rotate(${r.rotate})`,
              opacity: r.progress,
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`bg-ui-muted rounded-full flex items-center justify-center text-ui-fg font-bold ${isPortrait ? "w-16 h-16 text-2xl" : "w-10 h-10"}`}>
                {r.name[0]}
              </div>
              <div>
                <div className={`font-bold text-ui-fg ${isPortrait ? "text-4xl" : ""}`}>{r.name}</div>
                <div className={`text-yellow-400 ${isPortrait ? "text-3xl" : "text-sm"}`}>★★☆☆☆</div>
              </div>
            </div>
            <p className={`text-ui-fg opacity-80 ${isPortrait ? "text-4xl" : ""}`}>{r.text}</p>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
