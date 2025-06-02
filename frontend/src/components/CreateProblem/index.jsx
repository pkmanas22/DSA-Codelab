import {
  BookOpen,
  Code,
  FileText,
  TestTube,
  CheckCircle,
  Settings,
  Save,
  Send,
} from 'lucide-react';
import MenuBarTab, { MenuBarTabItem } from '../common/MenuBarTab';
import RenderBasicDetails from './RenderBasicDetails';
import RenderExamples from './RenderExamples';
import RenderCodeTemplates from './RenderCodeTemplates';
import RenderReferenceSolutions from './RenderReferenceSolutions';
import RenderMetadata from './RenderMetadata';
import RenderTestcases from './RenderTestcases';

const CreateProblem = () => {
  const handleSaveDraft = () => {
    // TODO: Save as draft
  };

  const handleSubmitQuestion = () => {
    // TODO: Submit question
  };
  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      {/* Top Action Buttons */}
      <div className="flex flex-col flex-wrap justify-end sm:flex-row gap-4 mb-6 p-4 rounded-lg">
        <div className="flex gap-3">
          <button onClick={handleSaveDraft} className="btn btn-outline gap-2">
            <Save className="w-4 h-4" />
            Save as Draft
          </button>
          <button onClick={handleSubmitQuestion} className="btn btn-primary gap-2">
            <Send className="w-4 h-4" />
            Submit Question
          </button>
        </div>
      </div>
      <MenuBarTab>
        <MenuBarTabItem title="Basic Info" icon={FileText}>
          <RenderBasicDetails />
        </MenuBarTabItem>

        <MenuBarTabItem title="Examples" icon={BookOpen}>
          <RenderExamples />
        </MenuBarTabItem>

        <MenuBarTabItem title="Code Templates" icon={Code}>
          <RenderCodeTemplates />
        </MenuBarTabItem>

        <MenuBarTabItem title="Reference Solutions" icon={CheckCircle}>
          <RenderReferenceSolutions />
        </MenuBarTabItem>

        <MenuBarTabItem title="Test Cases" icon={TestTube}>
          <RenderTestcases />
        </MenuBarTabItem>

        <MenuBarTabItem title="Metadata" icon={Settings}>
          <RenderMetadata />
        </MenuBarTabItem>
      </MenuBarTab>
    </div>
  );
};

export default CreateProblem;
