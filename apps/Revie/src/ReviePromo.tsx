import { AbsoluteFill, Sequence } from "remotion";
import { Scene1Problem } from "./scenes/Scene1Problem";
import { Scene2Solution } from "./scenes/Scene2Solution";
import { Scene3Feature } from "./scenes/Scene3Feature";
import { Scene4CTA } from "./scenes/Scene4CTA";

export const ReviePromo: React.FC = () => {
  return (
    <AbsoluteFill className="bg-parchment">
      <Sequence durationInFrames={90}>
        <Scene1Problem />
      </Sequence>
      
      <Sequence from={90} durationInFrames={180}>
        <Scene2Solution />
      </Sequence>

      <Sequence from={270} durationInFrames={150}>
        <Scene3Feature />
      </Sequence>

      <Sequence from={420} durationInFrames={120}>
        <Scene4CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
