import {Composition} from 'remotion';
import {SemanticMotionShowcase, SemanticSelectionScene, SemanticCostScene, SemanticNumberScene, SemanticRiskScene} from './SemanticMotionShowcase';
import {
  StoryboardTemplateV2Scene1,
  StoryboardTemplateV2Scene2,
  StoryboardTemplateV2Scene3,
  StoryboardTemplateV2Scene4,
  StoryboardTemplateV2Scene5,
  StoryboardTemplateV2Showcase,
  storyboardTemplateV2Durations,
  storyboardTemplateV2ShowcaseDuration,
} from './StoryboardTemplateV2';

export const Root = () => (
  <>
    <Composition id="StoryboardTemplate-SemanticMotion" component={SemanticMotionShowcase} durationInFrames={600} fps={30} width={1280} height={720} />
    <Composition id="Semantic-Selection" component={SemanticSelectionScene} durationInFrames={150} fps={30} width={1280} height={720} />
    <Composition id="Semantic-Cost" component={SemanticCostScene} durationInFrames={150} fps={30} width={1280} height={720} />
    <Composition id="Semantic-Number" component={SemanticNumberScene} durationInFrames={150} fps={30} width={1280} height={720} />
    <Composition id="Semantic-Risk" component={SemanticRiskScene} durationInFrames={150} fps={30} width={1280} height={720} />
    <Composition id="StoryboardTemplate-Showcase" component={StoryboardTemplateV2Showcase} durationInFrames={storyboardTemplateV2ShowcaseDuration} fps={30} width={1280} height={720} />
    <Composition id="StoryboardTemplate-01" component={StoryboardTemplateV2Scene1} durationInFrames={storyboardTemplateV2Durations.one} fps={30} width={1280} height={720} />
    <Composition id="StoryboardTemplate-02" component={StoryboardTemplateV2Scene2} durationInFrames={storyboardTemplateV2Durations.two} fps={30} width={1280} height={720} />
    <Composition id="StoryboardTemplate-03" component={StoryboardTemplateV2Scene3} durationInFrames={storyboardTemplateV2Durations.three} fps={30} width={1280} height={720} />
    <Composition id="StoryboardTemplate-04" component={StoryboardTemplateV2Scene4} durationInFrames={storyboardTemplateV2Durations.four} fps={30} width={1280} height={720} />
    <Composition id="StoryboardTemplate-05" component={StoryboardTemplateV2Scene5} durationInFrames={storyboardTemplateV2Durations.five} fps={30} width={1280} height={720} />
  </>
);
