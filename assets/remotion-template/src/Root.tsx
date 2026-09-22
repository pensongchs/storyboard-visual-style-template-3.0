import {Composition} from 'remotion';
import {
  StoryboardStyleV3FocusWindow,
  storyboardStyleV3FocusWindowDuration,
} from './FocusWindow';
import {
  StoryboardStyleV3EvidenceRail,
  StoryboardStyleV3SemanticSplit,
  storyboardStyleV3VariantDuration,
} from './StyleVariants';

export const Root = () => (
  <>
    <Composition
      id="StoryboardStyleV3-FocusWindow"
      component={StoryboardStyleV3FocusWindow}
      durationInFrames={storyboardStyleV3FocusWindowDuration}
      fps={30}
      width={1280}
      height={720}
    />
    <Composition
      id="StoryboardStyleV3-EvidenceRail"
      component={StoryboardStyleV3EvidenceRail}
      durationInFrames={storyboardStyleV3VariantDuration}
      fps={30}
      width={1280}
      height={720}
    />
    <Composition
      id="StoryboardStyleV3-SemanticSplit"
      component={StoryboardStyleV3SemanticSplit}
      durationInFrames={storyboardStyleV3VariantDuration}
      fps={30}
      width={1280}
      height={720}
    />
  </>
);
