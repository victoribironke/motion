import "./index.css";
import { Composition } from "remotion";
import { ReviePromo } from "./ReviePromo";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadInstrument } from "@remotion/google-fonts/InstrumentSerif";

loadInter();
loadInstrument();

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ReviePromoLandscape"
        component={ReviePromo}
        durationInFrames={540}
        fps={30}
        width={1920}
        height={1080}
      />
      
      <Composition
        id="ReviePromoVertical"
        component={ReviePromo}
        durationInFrames={540}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
