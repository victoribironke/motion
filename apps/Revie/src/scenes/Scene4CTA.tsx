import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Scene4CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slide and fade in
  const yOffset = interpolate(spring({ frame, fps, config: { damping: 14 } }), [0, 1], [50, 0]);
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Staggered appearance for the links
  const link1Progress = spring({ frame: frame - 15, fps, config: { damping: 12 } });
  const link2Progress = spring({ frame: frame - 30, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill className="bg-parchment items-center justify-center overflow-hidden" style={{ opacity }}>
      <div 
        className="flex flex-col items-center w-full max-w-4xl px-8"
        style={{ transform: `translateY(${yOffset}px)` }}
      >
        <h2 className="font-display text-7xl text-ui-fg font-bold mb-6 text-center drop-shadow-lg">
          Try Revie Today
        </h2>
        
        <p className="text-2xl text-ui-fg opacity-80 mb-16 text-center max-w-2xl">
          The ultimate AI-powered spot summarizer right in your pocket.
        </p>

        <div className="flex flex-col gap-6 w-full items-center">
          {/* Link 1: Web App */}
          <div 
            className="bg-ui-bg border border-ui-border rounded-2xl py-5 px-10 shadow-xl flex items-center justify-center w-full max-w-lg"
            style={{ 
              opacity: link1Progress,
              transform: `scale(${interpolate(link1Progress, [0, 1], [0.9, 1])})`
            }}
          >
            <span className="text-3xl mr-4">🌐</span>
            <span className="text-2xl font-bold text-ui-fg">revie-bot.vercel.app</span>
          </div>

          {/* Link 2: Telegram Bot */}
          <div 
            className="bg-ui-primary text-ui-primary-fg rounded-2xl py-5 px-10 shadow-xl flex items-center justify-center w-full max-w-lg"
            style={{ 
              opacity: link2Progress,
              transform: `scale(${interpolate(link2Progress, [0, 1], [0.9, 1])})`
            }}
          >
            <span className="text-3xl mr-4">🤖</span>
            <span className="text-2xl font-bold">t.me/revie_chatbot</span>
          </div>
        </div>

      </div>
    </AbsoluteFill>
  );
};
