import { CheckCircle, Fullscreen, Maximize2, Minimize2, Share2 } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../../constants/problemDetails';
import CodeEditor from '../common/CodeEditor';
import useFullScreen from '../../hooks/useFullScreen';
import { useEffect, useState } from 'react';
import { CopyButton } from '../common';
import useCodeEditorStore from '../../stores/useCodeEditorStore';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
const ProblemPageCodeEditor = ({ codeSnippets = {} }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(SUPPORTED_LANGUAGES[0].value);
  const [isFullScreen, handleFullScreen] = useFullScreen();
  const [code, setCode] = useState(codeSnippets[SUPPORTED_LANGUAGES[0].value] || '');

  const { codeMap, setCodeMap, lastEditedLanguage, setLastEditedLanguage } = useCodeEditorStore();

  const { problemId } = useParams();

  useEffect(() => {
    if (!problemId) return;
    const storedCode = codeMap[`${problemId}:${selectedLanguage}`];
    const fallbackCode = codeSnippets[selectedLanguage] || '';
    setCode(storedCode ?? fallbackCode);

    setSelectedLanguage(lastEditedLanguage);
  }, [problemId, selectedLanguage, codeSnippets, codeMap, lastEditedLanguage]);

  const handleEditorChange = (value) => {
    setCode(value);
    setCodeMap(problemId, selectedLanguage, value);
    setLastEditedLanguage(selectedLanguage);
  };

  const handleChangeLanguage = (language) => {
    setSelectedLanguage(language);
    setLastEditedLanguage(language);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Editor Header */}
      <div className="bg-base-200 p-2 flex-shrink-0 border-b border-base-300">
        <div className="flex items-center justify-between">
          <select
            className="select select-bordered select-sm w-40"
            value={selectedLanguage}
            onChange={(e) => handleChangeLanguage(e.target.value)}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.value}>
                {lang.name}
              </option>
            ))}
          </select>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (problemId) {
                  const shareUrl = `${window.location.origin}/problems/${problemId}`;
                  navigator.clipboard.writeText(shareUrl);
                  toast.success('Problem link copied to clipboard!');
                }
              }}
              className="btn btn-ghost btn-sm tooltip tooltip-bottom"
              data-tip="Copy problem link"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <div className="relative mx-3">
              <CopyButton text={code} />
            </div>

            <div className="flex items-center gap-1 text-sm text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span>Auto saved</span>
            </div>

            <button
              type="button"
              onClick={handleFullScreen}
              className="btn btn-ghost btn-sm"
              title="Focus Mode"
            >
              {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              {isFullScreen ? 'Minimize' : 'Maximize'}
            </button>
          </div>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 overflow-hidden">
        <CodeEditor language={selectedLanguage} value={code} onChange={handleEditorChange} />
      </div>
    </div>
  );
};

export default ProblemPageCodeEditor;
