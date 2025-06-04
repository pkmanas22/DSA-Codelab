import { useLocation } from 'react-router-dom';
import { CopyButton } from '../common';
import { useEffect, useState } from 'react';

const Description = ({
  title = '',
  description = '',
  isSolved = false,
  difficulty,
  tags = [],
  companies = [],
  examples = [],
  hints,
  editorial,
  constraints,
  referenceSolutions = {},
}) => {
  const [activeTab, setActiveTab] = useState('description');
  const { hash: activeHashPathName } = useLocation();

  useEffect(() => {
    const updateTabFromHash = () => {
      const hash = window.location.hash.slice(1);
      setActiveTab(hash || 'description');
    };

    updateTabFromHash(); // Initial set

    window.addEventListener('hashchange', updateTabFromHash);
    return () => window.removeEventListener('hashchange', updateTabFromHash);
  }, [activeHashPathName]);

  return (
    <div className="h-full flex flex-col">
      {/* Tabs */}
      <div className="tabs tabs-bordered bg-base-200 flex-shrink-0">
        <span
          className={`tab ${activeTab === 'description' ? 'tab-active' : ''}`}
          onClick={() => {
            setActiveTab('description');
            window.location.hash = 'description';
          }}
        >
          Description
        </span>
        <span
          className={`tab ${activeTab === 'editorial' ? 'tab-active' : ''}`}
          onClick={() => {
            setActiveTab('editorial');
            window.location.hash = 'editorial';
          }}
        >
          Editorial
        </span>
        <span
          className={`tab ${activeTab === 'solutions' ? 'tab-active' : ''}`}
          onClick={() => {
            setActiveTab('solutions');
            window.location.hash = 'solutions';
          }}
        >
          Solutions
        </span>
        <span
          className={`tab ${activeTab === 'submissions' ? 'tab-active' : ''}`}
          onClick={() => {
            setActiveTab('submissions');
            window.location.hash = 'submissions';
          }}
        >
          Submissions
        </span>
      </div>

      {/* Content - Fixed height and scrollable */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto px-6 py-2">
          {activeTab === 'description' && (
            <div className="prose prose-sm max-w-none">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-base-content m-0">{title}</h1>
                {isSolved && <div className="badge badge-success">Solved ✓</div>}
              </div>

              <div className="badge badge-warning capitalize my-3">{difficulty}</div>
              <div className="flex gap-2 mb-6">
                {companies.map((company) => (
                  <div key={company} className="badge badge-outline">
                    {company}
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-base-content">
                <p>{description}</p>

                {Array.isArray(examples) &&
                  examples.map((exmp, index) => (
                    <div key={index} className="bg-base-200 p-4 rounded-lg mt-6">
                      <h3 className="font-semibold mb-2">Example {index + 1}:</h3>
                      <pre className="space-y-2 font-mono text-sm text-pretty">
                        <div>
                          <strong>Input:</strong> {exmp?.input}
                        </div>
                        <div>
                          <strong>Output:</strong> {exmp?.output}
                        </div>
                        <div>
                          <strong>Explanation:</strong> {exmp?.explanation}
                        </div>
                      </pre>
                    </div>
                  ))}

                <div className="">
                  <h3 className="font-semibold mb-1">Constraints:</h3>
                  <ul className="space-y-1 text-sm ml-3">{constraints}</ul>
                </div>

                <div className="">
                  <h3 className="font-semibold mb-2">Tags:</h3>
                  <div className="flex gap-2">
                    {tags.map((tag) => (
                      <div key={tag} className="badge badge-outline">
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="">
                  <h3 className="font-semibold mb-1">Hints:</h3>
                  <ul className="space-y-1 text-sm ml-3">{hints}</ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'editorial' && (
            <div className="prose prose-sm max-w-none">
              <h2 className="text-xl font-bold mb-4">Editorial</h2>
              <p>{editorial}</p>
            </div>
          )}

          {activeTab === 'solutions' && (
            <div className="prose prose-sm max-w-none">
              <h2 className="text-xl font-bold mb-4">Solutions</h2>
              <div>
                {Object.entries(referenceSolutions).map(([lang, code]) => {
                  return (
                    <div key={lang}>
                      <h3 className="font-semibold my-2 flex justify-between">
                        {lang}{' '}
                        <span className="sticky top-0 right-0">
                          <CopyButton text={code} />
                        </span>
                      </h3>
                      <pre className="max-h-60 h-full text-xs bg-base-200 p-4 rounded-lg overflow-scroll relative">
                        {code}
                      </pre>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'submissions' && (
            <div className="prose prose-sm max-w-none">
              <h2 className="text-xl font-bold mb-4">Submissions</h2>
              <p>Your submissions would go here...</p>
            </div>
          )}
        </div>
      </div>
      {/* footer */}
      <footer className="footer flex justify-center items-center mt-1">
        <p className="text-sm text-center opacity-50">
          Copyright © {new Date().getFullYear()} - All right reserved
        </p>
      </footer>
    </div>
  );
};

export default Description;
