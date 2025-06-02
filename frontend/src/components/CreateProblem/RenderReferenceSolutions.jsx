import { useState } from 'react';
import { Card } from '../common';
import { SUPPORTED_LANGUAGES } from '../../constants/problemDetails';
import CodeEditor from '../common/CodeEditor';
import { Trash2 } from 'lucide-react';
import TabNavigationButtons from '../common/TabNavigationButtons';

const RenderReferenceSolutions = () => {
  const [activeTab, setActiveTab] = useState('add');
  const [addedLanguages, setAddedLanguages] = useState([]);

  const toggleSelectedLanguage = (lang) => {
    setAddedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };
  return (
    <div className="space-y-4">
      <Card title="Code Templates" subTitle="Code templates for the problem">
        <div className="flex items-center flex-wrap gap-2">
          <button onClick={() => setActiveTab('add')} className="btn flex-1">
            Add Reference Solution
          </button>
          <button onClick={() => setActiveTab('manage')} className="btn flex-1">
            Manage Reference Solutions{' '}
            <div className="badge badge-sm badge-secondary">{addedLanguages.length}</div>
          </button>
        </div>

        <div className="w-full">
          <div
            className={`tab-content bg-base-100  p-6 transition-opacity duration-300 ease-in-out ${
              activeTab === 'add' ? 'block' : 'hidden'
            }`}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  onClick={() => toggleSelectedLanguage(lang)}
                  className={`btn btn-neutral ${addedLanguages.includes(lang) && 'disabled'}`}
                  disabled={addedLanguages.includes(lang)}
                  key={lang.id}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>

          <div
            className={`tab-content bg-base-100  p-6 transition-opacity duration-300 ease-in-out ${
              activeTab === 'manage' ? 'block' : 'hidden'
            }`}
          >
            {addedLanguages.length === 0 && (
              <div className="text-sm opacity-70 text-center">
                No languages added for reference solution, Kindly click on the language you want to
                add
              </div>
            )}

            {addedLanguages.map((lang, idx) => (
              <div
                key={lang?.id}
                className="space-y-2 card border-dashed border-1 border-base-300 bg-base-50 p-3 my-2"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">
                    {idx + 1}. {lang?.name} Solution
                  </p>

                  <button
                    onClick={() => toggleSelectedLanguage(lang)}
                    className="btn btn-ghost btn-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <CodeEditor language={lang?.value} />
              </div>
            ))}
          </div>
        </div>
      </Card>
      <TabNavigationButtons />
    </div>
  );
};

export default RenderReferenceSolutions;
