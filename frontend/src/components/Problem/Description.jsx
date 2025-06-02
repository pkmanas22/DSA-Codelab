import { Star, ThumbsUp, MessageSquare, ExternalLink, HelpCircle } from 'lucide-react';
import { Footer } from '../common';

const Description = ({ setActiveTab, activeTab }) => {
  return (
    <div className="h-full flex flex-col">
      {/* Tabs */}
      <div className="tabs tabs-bordered bg-base-200 flex-shrink-0">
        <a
          className={`tab ${activeTab === 'description' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('description')}
        >
          Description
        </a>
        <a
          className={`tab ${activeTab === 'editorial' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('editorial')}
        >
          Editorial
        </a>
        <a
          className={`tab ${activeTab === 'solutions' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('solutions')}
        >
          Solutions
        </a>
        <a
          className={`tab ${activeTab === 'submissions' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('submissions')}
        >
          Submissions
        </a>
      </div>

      {/* Content - Fixed height and scrollable */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto px-6 py-2">
          {activeTab === 'description' && (
            <div className="prose prose-sm max-w-none">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-base-content m-0">
                  2125. Number of Laser Beams in a Bank
                </h1>
                <div className="badge badge-success">Solved ✓</div>
              </div>

              <div className="flex gap-2 mb-6">
                <div className="badge badge-warning">Medium</div>
                <div className="badge badge-outline">Topics</div>
                <div className="badge badge-outline">Companies</div>
                <div className="badge badge-outline">Hint</div>
              </div>

              <div className="space-y-4 text-base-content">
                <p>
                  Anti-theft security devices are activated inside a bank. You are given a{' '}
                  <strong>0-indexed</strong> binary string array{' '}
                  <code className="bg-base-200 px-1 py-0.5 rounded">bank</code> representing the
                  floor plan of the bank, which is an
                  <code className="bg-base-200 px-1 py-0.5 rounded">m x n</code> 2D matrix.
                  <code className="bg-base-200 px-1 py-0.5 rounded">bank[i]</code> represents the{' '}
                  <code className="bg-base-200 px-1 py-0.5 rounded">
                    i<sup>th</sup>
                  </code>{' '}
                  row, consisting of
                  <code className="bg-base-200 px-1 py-0.5 rounded">'0'</code>s and
                  <code className="bg-base-200 px-1 py-0.5 rounded">'1'</code>s.
                  <code className="bg-base-200 px-1 py-0.5 rounded">'0'</code> means the cell is
                  empty, while
                  <code className="bg-base-200 px-1 py-0.5 rounded">'1'</code> means the cell has a
                  security device.
                </p>

                <p>
                  There is <strong>one</strong> laser beam between any <strong>two</strong> security
                  devices if <strong>both</strong> conditions are met:
                </p>

                <ul className="space-y-2">
                  <li>
                    The two devices are located on <strong>two different rows</strong>:
                    <code className="bg-base-200 px-1 py-0.5 rounded">r₁</code> and
                    <code className="bg-base-200 px-1 py-0.5 rounded">r₂</code>, where
                    <code className="bg-base-200 px-1 py-0.5 rounded">r₁ &lt; r₂</code>.
                  </li>
                  <li>
                    For <strong>each row</strong>{' '}
                    <code className="bg-base-200 px-1 py-0.5 rounded">i</code> where
                    <code className="bg-base-200 px-1 py-0.5 rounded">r₁ &lt; i &lt; r₂</code>,
                    there are <strong>no security devices</strong> in the
                    <code className="bg-base-200 px-1 py-0.5 rounded">
                      i<sup>th</sup>
                    </code>{' '}
                    row.
                  </li>
                </ul>

                <p>
                  Laser beams are independent, i.e., one beam does not interfere nor join with
                  another.
                </p>

                <p>
                  Return <em>the total number of laser beams in the bank</em>.
                </p>

                <div className="bg-base-200 p-4 rounded-lg mt-6">
                  <h3 className="font-semibold mb-2">Example 1:</h3>
                  <div className="space-y-2 font-mono text-sm">
                    <div>
                      <strong>Input:</strong> bank = ["011001","000000","010100","001000"]
                    </div>
                    <div>
                      <strong>Output:</strong> 8
                    </div>
                    <div>
                      <strong>Explanation:</strong> Between each of the following device pairs,
                      there is one beam...
                    </div>
                  </div>
                </div>

                <div className="bg-base-200 p-4 rounded-lg mt-6">
                  <h3 className="font-semibold mb-2">Example 2:</h3>
                  <div className="space-y-2 font-mono text-sm">
                    <div>
                      <strong>Input:</strong> bank = ["000","111"]
                    </div>
                    <div>
                      <strong>Output:</strong> 0
                    </div>
                    <div>
                      <strong>Explanation:</strong> No laser beams in this case because there are no
                      security devices on different rows.
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Constraints:</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• m == bank.length</li>
                    <li>• n == bank[i].length</li>
                    <li>• 1 ≤ m, n ≤ 500</li>
                    <li>• bank[i][j] is either '0' or '1'</li>
                  </ul>
                </div>
              </div>

              {/* <div className="flex items-center gap-4 mt-8 pt-4 border-t border-base-300">
                <button className="btn btn-ghost btn-sm">
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  1.9K
                </button>
                <button className="btn btn-ghost btn-sm">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  126
                </button>
                <button className="btn btn-ghost btn-sm">
                  <Star className="w-4 h-4" />
                </button>
                <button className="btn btn-ghost btn-sm">
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button className="btn btn-ghost btn-sm">
                  <HelpCircle className="w-4 h-4" />
                </button>
              </div> */}

              {/* footer */}
              <footer className="footer flex justify-center items-center mt-5">
                <p className="text-sm text-center mt-2 opacity-50">
                  Copyright © {new Date().getFullYear()} - All right reserved
                </p>
              </footer>
            </div>
          )}

          {activeTab === 'editorial' && (
            <div className="prose prose-sm max-w-none">
              <h2 className="text-xl font-bold mb-4">Editorial</h2>
              <p>Editorial content would go here...</p>
            </div>
          )}

          {activeTab === 'solutions' && (
            <div className="prose prose-sm max-w-none">
              <h2 className="text-xl font-bold mb-4">Solutions</h2>
              <p>Community solutions would go here...</p>
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
    </div>
  );
};

export default Description;
