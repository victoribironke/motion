import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Scene3Feature: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slide scene in
  const yOffset = interpolate(spring({ frame, fps, config: { damping: 14 } }), [0, 1], [100, 0]);

  // Chat Bubble 1: User asking a question
  const bubble1Progress = spring({ frame: frame - 20, fps, config: { damping: 12 } });
  
  // Chat Bubble 2: Revie answering
  const bubble2Progress = spring({ frame: frame - 60, fps, config: { damping: 12 } });

  // Scene fade out (if needed)
  const sceneOpacity = interpolate(frame, [135, 150], [1, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill className="bg-parchment items-center justify-center overflow-hidden" style={{ opacity: sceneOpacity }}>
      
      <div 
        className="flex flex-col items-center w-full max-w-4xl px-8"
        style={{ transform: `translateY(${yOffset}px)` }}
      >
        <h2 className="font-display text-6xl text-ink font-bold mb-16 text-center">
          Ask anything. Get instant answers.
        </h2>

        <div className="w-full flex flex-col gap-6">
          {/* User Chat Bubble */}
          <div 
            className="self-end max-w-[70%] bg-ui-muted text-ui-fg rounded-2xl rounded-tr-sm p-5 text-xl shadow-sm"
            style={{ 
              opacity: bubble1Progress,
              transform: `scale(${bubble1Progress}) translateY(${interpolate(bubble1Progress, [0, 1], [20, 0])}px)`,
              transformOrigin: 'bottom right'
            }}
          >
            Are there vegan options? And is it good for a date night?
          </div>

          {/* Revie Chat Bubble */}
          <div 
            className="self-start max-w-[80%] bg-ui-primary text-ui-primary-fg rounded-2xl rounded-tl-sm p-6 text-xl shadow-lg border border-ui-border"
            style={{ 
              opacity: bubble2Progress,
              transform: `scale(${bubble2Progress}) translateY(${interpolate(bubble2Progress, [0, 1], [20, 0])}px)`,
              transformOrigin: 'bottom left'
            }}
          >
            <p className="mb-3">
              <span className="font-bold text-accent-soft">Yes to both!</span> 🌱
            </p>
            <p className="opacity-90 leading-relaxed">
              Reviews mention several great vegan pastries. It's definitely cozy enough for a date night, especially in the evenings when they dim the lights, though it can get a bit loud during peak hours.
            </p>
          </div>
        </div>

      </div>
    </AbsoluteFill>
  );
};
