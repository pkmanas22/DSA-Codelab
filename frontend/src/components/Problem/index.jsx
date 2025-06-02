import { useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { Play, Upload, Home, List, Plus, BookmarkPlus, Star, FileJson } from 'lucide-react';
import { useAuthStore } from '../../stores/useAuthStore';
import { RightSideNavbar } from '../common';
import Description from './Description';
import ProblemPageCodeEditor from './ProblemPageCodeEditor';
import Testcases from './Testcases';
import { Link, useNavigate } from 'react-router-dom';
import routes from '../../routes';

const LeetCodeInterface = () => {
  const [activeTab, setActiveTab] = useState('description');
  const [activeTestCase, setActiveTestCase] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('java');
  const [code, setCode] = useState(`class Solution {
    public int numberOfBeams(String[] bank) {
        
    }
}`);

  const navigate = useNavigate();

  const testCases = [
    {
      input: '["011001","000000","010100","001000"]',
      output: '8',
      explanation:
        'Between each of the following device pairs, there is one beam. Total beams = 8.',
    },
    {
      input: '["000","111"]',
      output: '0',
      explanation:
        'No laser beams in this case because there are no security devices on different rows.',
    },
  ];

  const handleEditorChange = (value) => {
    setCode(value || '');
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-base-100 text-base-content">
      {/* Header */}
      <div className="navbar bg-base-200 border-b border-base-300 flex-shrink-0">
        <div className="navbar-start">
          <div className="flex items-center gap-2">
            <Link to={routes.root} className="btn btn-ghost btn-sm">
              <Home className="w-4 h-4" />
              DSA CodeLab
            </Link>
            <Link to={routes.problems.all} className="btn btn-ghost btn-sm">
              <List className="w-4 h-4" />
              All Problems
            </Link>
          </div>
        </div>

        <div className="navbar-center">
          <div className="flex items-center gap-3">
            <button className="btn btn-outline btn-sm" title="Add to Playlist">
              <Star className="w-4 h-4 text-yellow-500" />
            </button>
            <button className="btn btn-primary btn-sm" title="Run Code">
              <Play className="w-4 h-4" />
              Run
            </button>
            <button className="btn btn-success btn-sm" title="Submit Solution">
              <Upload className="w-4 h-4" />
              Submit
            </button>
          </div>
        </div>

        <div className="navbar-end">
          <RightSideNavbar />
        </div>
      </div>

      {/* Main Content - Fixed height calculation */}
      <div className="h-[calc(100vh-4rem)] overflow-hidden">
        <PanelGroup direction="horizontal" className="h-full">
          {/* Left Panel - Problem Description */}
          <Panel defaultSize={45} minSize={30}>
            <Description setActiveTab={setActiveTab} activeTab={activeTab} />
          </Panel>

          <PanelResizeHandle className="w-1 bg-base-300 hover:bg-primary transition-colors" />

          {/* Right Panel - Code Editor and Tests */}
          <Panel defaultSize={55} minSize={40}>
            <PanelGroup direction="vertical">
              {/* Code Editor */}
              <Panel defaultSize={80} minSize={40}>
                <ProblemPageCodeEditor
                  code={code}
                  handleEditorChange={handleEditorChange}
                  selectedLanguage={selectedLanguage}
                  setSelectedLanguage={setSelectedLanguage}
                />
              </Panel>

              <PanelResizeHandle className="h-1 bg-base-300 hover:bg-primary transition-colors" />

              {/* Test Cases */}
              <Panel defaultSize={20} minSize={20}>
                <Testcases
                  testCases={testCases}
                  activeTestCase={activeTestCase}
                  setActiveTestCase={setActiveTestCase}
                />
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
};

export default LeetCodeInterface;
