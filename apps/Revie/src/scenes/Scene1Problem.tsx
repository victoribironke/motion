import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Scene1Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animate three review cards popping up chaotically
  const card1Progress = spring({ frame: frame - 10, fps, config: { damping: 12 } });
  const card2Progress = spring({ frame: frame - 25, fps, config: { damping: 12 } });
  const card3Progress = spring({ frame: frame - 40, fps, config: { damping: 12 } });
  
  // Fade out the entire scene at the end (assuming scene is 90 frames)
  const opacity = interpolate(frame, [75, 90], [1, 0], { extrapolateRight: "clamp" });

  const reviews = [
    { name: "John D.", text: "Food was okay but the wait was too long...", progress: card1Progress, rotate: "-6deg", top: "15%", left: "10%" },
    { name: "Sarah W.", text: "Is there parking??? Couldn't find any. 2 stars.", progress: card2Progress, rotate: "4deg", top: "55%", left: "55%" },
    { name: "Mike T.", text: "Way too loud, menu was confusing.", progress: card3Progress, rotate: "-2deg", top: "65%", left: "15%" },
  ];

  return (
    <AbsoluteFill className="bg-parchment items-center justify-center overflow-hidden" style={{ opacity }}>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
         <h1 
            className="font-display text-7xl text-ink font-bold text-center mb-8 drop-shadow-sm"
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
            className="absolute bg-ui-bg border border-ui-border rounded-xl p-6 shadow-xl w-80"
            style={{
              top: r.top,
              left: r.left,
              transform: `scale(${r.progress}) rotate(${r.rotate})`,
              opacity: r.progress,
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-ui-muted rounded-full flex items-center justify-center text-ui-fg font-bold">
                {r.name[0]}
              </div>
              <div>
                <div className="font-bold text-ui-fg">{r.name}</div>
                <div className="text-yellow-400 text-sm">★★☆☆☆</div>
              </div>
            </div>
            <p className="text-ui-fg opacity-80">{r.text}</p>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
