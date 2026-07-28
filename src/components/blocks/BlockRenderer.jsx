import { motion } from 'framer-motion'
import HeroBlock from './HeroBlock'
import TextBlock from './TextBlock'
import FlipCard from '../activities/FlipCard'
import Carousel from '../activities/Carousel'
import Quiz from '../activities/Quiz'
import VideoPlayer from '../activities/VideoPlayer'
import Reading from '../activities/Reading'
import Slides from '../activities/Slides'
import ImageSlides from '../activities/ImageSlides'
import Infographic from '../activities/Infographic'
import Flyer from '../activities/Flyer'
import Glossary from '../activities/Glossary'
import Versus from '../activities/Versus'
import RiskMatrix from '../activities/RiskMatrix'
import ColombiaMap from '../activities/ColombiaMap'
import PresentationSlides from '../activities/PresentationSlides'
import IframePresentation from '../activities/IframePresentation'
import ScenarioQuiz from '../activities/ScenarioQuiz'
import Reflection from '../activities/Reflection'
import SelfCheck from '../activities/SelfCheck'
import CaseCard from '../activities/CaseCard'
import DVABanner from '../activities/DVABanner'
import CallSimulation from '../activities/CallSimulation'
import ChecklistCheck from '../activities/ChecklistCheck'
import DownloadCard from '../activities/DownloadCard'
import ScenarioBuilder from '../activities/ScenarioBuilder'
import ActionPlan from '../activities/ActionPlan'
import InfoBox from './InfoBox'
import DataTable from './DataTable'
import ConnectionNote from './ConnectionNote'
import ModuleClosing from './ModuleClosing'
import ValuePyramid from '../activities/ValuePyramid'

const wrapMotion = (children, key) => (
  <motion.div
    key={key}
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
)

export default function BlockRenderer({ block, index, moduleNumber, estimatedTime, onQuizComplete, onScenarioFinish, onReflectionSave, reflectionAnswers, bookmarkedTema, onToggleBookmark }) {
  const key = `block-${index}`

  switch (block.type) {
    case 'hero':
      return (
        <HeroBlock
          key={key}
          block={block}
          moduleNumber={moduleNumber}
          estimatedTime={estimatedTime}
        />
      )

    case 'text':
      return wrapMotion(
        <TextBlock
          block={block}
          moduleNumber={moduleNumber}
          bookmarkedTema={bookmarkedTema}
          onToggleBookmark={onToggleBookmark}
        />,
        key
      )

    case 'reading':
      return wrapMotion(<Reading block={block} />, key)

    case 'flipcard':
      return wrapMotion(<FlipCard block={block} />, key)

    case 'carousel':
      return wrapMotion(<Carousel block={block} />, key)

    case 'slides':
      return wrapMotion(<Slides block={block} />, key)

    case 'video':
      return wrapMotion(<VideoPlayer block={block} />, key)

    case 'infographic':
      return wrapMotion(<Infographic block={block} />, key)

    case 'flyer':
      return wrapMotion(<Flyer block={block} />, key)

    case 'imageslides':
      return wrapMotion(<ImageSlides block={block} />, key)

    case 'glossary':
      return wrapMotion(<Glossary block={block} />, key)

    case 'versus':
      return wrapMotion(<Versus block={block} />, key)

    case 'riskmatrix':
      return wrapMotion(<RiskMatrix block={block} />, key)

    case 'colombiamap':
      return wrapMotion(<ColombiaMap block={block} />, key)

    case 'presentationslides':
      return wrapMotion(<PresentationSlides block={block} />, key)

    case 'iframepresentation':
      return wrapMotion(<IframePresentation block={block} />, key)

    case 'quiz':
      return wrapMotion(
        <Quiz block={block} onComplete={onQuizComplete} />,
        key
      )

    case 'scenario':
      return wrapMotion(
        <ScenarioQuiz block={block} onFinish={onScenarioFinish} />,
        key
      )

    case 'reflection':
      return wrapMotion(
        <Reflection
          block={block}
          value={reflectionAnswers ? reflectionAnswers[block.storageKey] : undefined}
          onSave={onReflectionSave}
        />,
        key
      )

    case 'selfcheck':
      return wrapMotion(<SelfCheck block={block} />, key)

    case 'casecard':
      return wrapMotion(<CaseCard block={block} />, key)

    case 'dva':
      return wrapMotion(<DVABanner />, key)

    case 'callsim':
      return wrapMotion(<CallSimulation block={block} />, key)

    case 'checklist':
      return wrapMotion(<ChecklistCheck block={block} />, key)

    case 'downloadcard':
      return wrapMotion(<DownloadCard block={block} />, key)

    case 'scenariobuilder':
      return wrapMotion(<ScenarioBuilder block={block} />, key)

    case 'actionplan':
      return wrapMotion(<ActionPlan block={block} />, key)

    case 'box':
      return wrapMotion(<InfoBox block={block} />, key)

    case 'datatable':
      return wrapMotion(<DataTable block={block} />, key)

    case 'connectionnote':
      return wrapMotion(<ConnectionNote block={block} />, key)

    case 'closing':
      return wrapMotion(<ModuleClosing block={block} />, key)

    case 'pyramid':
      return wrapMotion(<ValuePyramid block={block} />, key)

    default:
      return (
        <div key={key} className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700 font-body">
          Tipo de bloque desconocido: <code className="font-mono">{block.type}</code>
        </div>
      )
  }
}
