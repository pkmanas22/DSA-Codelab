import { useState } from 'react';

const Testcases = ({ testCases, activeTestCase, setActiveTestCase }) => {
  const [activeTab, setActiveTab] = useState('testcase');

  return (
    <div className="h-full flex flex-col bg-base-100">
      {/* Test Header */}
      <div className="bg-base-200 border-b border-base-300 flex-shrink-0">
        <div className="tabs tabs-bordered">
          <a
            className={`tab ${activeTab === 'testcase' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('testcase')}
          >
            Testcase
          </a>
          <a
            className={`tab ${activeTab === 'result' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('result')}
          >
            Test Result
          </a>
        </div>
      </div>

      {/* Test Cases Content - Properly constrained and scrollable */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto p-4">
          {activeTab === 'testcase' && (
            <>
              <div className="flex gap-2 mb-4">
                {testCases.map((_, index) => (
                  <button
                    key={index}
                    className={`btn btn-sm ${
                      activeTestCase === index ? 'btn-primary' : 'btn-outline'
                    }`}
                    onClick={() => setActiveTestCase(index)}
                  >
                    Case {index + 1}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">bank =</label>
                  <div className="bg-base-200 p-3 rounded font-mono text-sm">
                    {testCases[activeTestCase].input}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Expected Output:</label>
                  <div className="bg-base-200 p-3 rounded font-mono text-sm">
                    {testCases[activeTestCase].output}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Explanation:</label>
                  <div className="bg-base-200 p-3 rounded text-sm">
                    {testCases[activeTestCase].explanation}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'result' && (
            <div className="space-y-4">
              <div className="text-center py-8">
                <p className="text-base-content/70">Run your code to see results here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Testcases;
