import { useEffect, useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { Play, Upload, Home, List, Plus, BookmarkPlus, Star, FileJson } from 'lucide-react';
import { useAuthStore } from '../../stores/useAuthStore';
import { MyLoader, PageNotFound, PlaylistModal, RightSideNavbar } from '../common';
import Contents from './Contents';
import ProblemPageCodeEditor from './ProblemPageCodeEditor';
import Testcases from './Testcases';
import { Link, useNavigate, useParams } from 'react-router-dom';
import routes from '../../routes';
import {
  useGetProblemById,
  useRunProblem,
  useSubmitProblem,
} from '../../hooks/reactQuery/useProblemApi';
import toast from 'react-hot-toast';
import { SUPPORTED_LANGUAGES } from '../../constants/problemDetails';
import useCodeEditorStore from '../../stores/useCodeEditorStore';
import { useGetAllPlaylists } from '../../hooks/reactQuery/usePlaylistApi';
import queryClient from '../../utils/queryClient';
import { QUERY_KEYS } from '../../constants/keys';

const LeetCodeInterface = () => {
  const [problem, setProblem] = useState({});

  const { problemId } = useParams();

  const navigate = useNavigate();

  const { isAuthenticated, addSolvedProblem } = useAuthStore();

  const { data, isLoading, isError } = useGetProblemById(problemId || '');
  const { mutate: myRunProblemHandler, isLoading: runProblemLoading } = useRunProblem();
  const { mutate: mySubmitProblemHandler, isLoading: submitProblemLoading } = useSubmitProblem();
  const { data: allPlaylists } = useGetAllPlaylists();

  const { codeMap, lastEditedLanguage } = useCodeEditorStore();

  useEffect(() => {
    if (data) {
      // console.log(data);
      setProblem(data?.data);
    }
  }, [data]);

  if (isLoading) {
    return <MyLoader />;
  }

  if (isError) {
    // toast.error(error.response.data?.error || 'Something went wrong');
    return <PageNotFound />;
  }

  const handleRunCode = () => {
    setProblem({
      ...problem,
      testcases: data?.data?.testcases,
    });
    if (!problemId || !lastEditedLanguage) return;
    const languageId = SUPPORTED_LANGUAGES.find((l) => l.value === lastEditedLanguage)?.id;

    const sourceCode = codeMap[`${problemId}:${lastEditedLanguage}`];

    if (
      !sourceCode ||
      !languageId ||
      problem?.codeSnippets[SUPPORTED_LANGUAGES[0].value] === sourceCode
    ) {
      toast.error('Looks like you have not written any code yet');
      return;
    }

    const testcases = problem?.testcases;
    if (!testcases) return;

    const stdin = testcases.reduce((acc, { input }) => [...acc, input], []);

    const expectedOutputs = testcases.reduce((acc, { output }) => [...acc, output], []);

    const payload = {
      sourceCode,
      languageId,
      stdin,
      expectedOutputs,
    };

    // console.log('Payload', payload);

    console.log('start running...');

    myRunProblemHandler(payload, {
      onSuccess: (res) => {
        console.log(res);
        if (res?.success) {
          toast.success(res?.message || 'Code ran successfully');
        } else {
          toast.error(res?.message || 'Something went wrong');
        }
        const updatedTestcases = testcases.map((t, i) => ({
          ...t,
          isPassed: res?.data[i]?.isPassed,
          status: res?.data[i]?.status,
          stdout: res?.data[i]?.stdout,
          time: res?.data[i]?.time,
        }));
        // console.log('updatedTestcases', updatedTestcases);

        setProblem({
          ...problem,
          testcases: updatedTestcases,
        });
      },
      onError: (err) => {
        toast.error(err.response.data?.error || 'Something went wrong');
      },
    });
  };

  const handleSubmitCode = () => {
    setProblem({
      ...problem,
      testcases: data?.data?.testcases,
    });
    console.log(data?.data?.testcases);

    if (!problemId || !lastEditedLanguage) return;
    const languageId = SUPPORTED_LANGUAGES.find((l) => l.value === lastEditedLanguage)?.id;

    const sourceCode = codeMap[`${problemId}:${lastEditedLanguage}`];

    if (
      !sourceCode ||
      !languageId ||
      problem?.codeSnippets[SUPPORTED_LANGUAGES[0].value] === sourceCode
    ) {
      toast.error('Looks like you have not written any code yet');
      return;
    }

    const payload = {
      sourceCode,
      languageId,
      problemId,
    };

    // console.log('Payload', payload);

    console.log('start submitting...');

    mySubmitProblemHandler(payload, {
      onSuccess: (res) => {
        console.log(res);
        if (!res?.success) {
          toast.error(res?.message || 'Something went wrong');
        } else {
          toast.success(res?.message || 'Submission successful');
        }

        addSolvedProblem(problemId);

        setProblem({
          ...problem,
          testcases: data?.data?.testcases,
          submissionData: res?.data,
        });
        // console.log('Submission data', res?.data);
        navigate(`/problems/${problemId}/#submission`, { replace: true });

        queryClient.invalidateQueries(QUERY_KEYS.SUBMISSIONS_BY_PROBLEM_ID);
      },
      onError: (err) => {
        toast.error(err.response.data?.error || 'Something went wrong');
      },
    });
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
            <div
              className="tooltip tooltip-bottom"
              data-tip={isAuthenticated ? 'Save to playlist' : 'Login to save to playlist'}
            >
              <button
                type="button"
                onClick={() => {
                  document.getElementById('add_to_playlist').showModal();
                }}
                className="btn btn-sm btn-outline gap-1"
                disabled={!isAuthenticated}
              >
                <BookmarkPlus className="w-4" />
                Save
              </button>
            </div>

            <div
              className="tooltip tooltip-bottom"
              data-tip={isAuthenticated ? 'Run Code' : 'Login to run code'}
            >
              <button
                type="button"
                className={`btn btn-primary btn-sm ${
                  (!isAuthenticated || runProblemLoading) && 'btn-disabled'
                }`}
                disabled={!isAuthenticated || runProblemLoading}
                onClick={handleRunCode}
              >
                {runProblemLoading && <span className="loading loading-spinner"></span>}
                <Play className="w-4 h-4" />
                Run
              </button>
            </div>

            <div
              className="tooltip tooltip-bottom"
              data-tip={isAuthenticated ? 'Submit Code' : 'Login to submit code'}
            >
              <button
                type="button"
                className={`btn btn-success btn-sm ${
                  (!isAuthenticated || submitProblemLoading) && 'btn-disabled'
                }`}
                disabled={!isAuthenticated || submitProblemLoading}
                onClick={handleSubmitCode}
              >
                {submitProblemLoading && <span className="loading loading-spinner"></span>}
                <Upload className="w-4 h-4" />
                Submit
              </button>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <RightSideNavbar />
        </div>
      </div>

      {/* Main Content */}
      <div className="h-[calc(100vh-4rem)] overflow-hidden">
        <PanelGroup direction="horizontal" className="h-full">
          {/* Left Panel - Problem Description */}
          <Panel defaultSize={45} minSize={30}>
            <Contents {...problem} />
          </Panel>

          <PanelResizeHandle className="w-2 bg-base-300 hover:bg-primary transition-colors flex justify-center items-center">
            <div className="h-20 w-0.5 bg-success rounded-full opacity-80" />
          </PanelResizeHandle>

          {/* Right Panel - Code Editor and Tests */}
          <Panel defaultSize={55} minSize={40}>
            <PanelGroup direction="vertical">
              {/* Code Editor */}
              <Panel defaultSize={80} minSize={40}>
                <ProblemPageCodeEditor codeSnippets={problem?.codeSnippets} />
              </Panel>

              <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary transition-colors flex justify-center items-center">
                <div className="w-6 h-0.5 bg-success rounded-full opacity-80" />
                <div className="w-6 h-0.5 bg-success rounded-full opacity-80" />
                <div className="w-6 h-0.5 bg-success rounded-full opacity-80" />
              </PanelResizeHandle>

              {/* Test Cases */}
              <Panel defaultSize={20} minSize={20}>
                <Testcases testcases={problem?.testcases} />
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>

      {/* Modal */}

      <PlaylistModal allPlaylists={allPlaylists?.data} {...{ problemId }} />
    </div>
  );
};

export default LeetCodeInterface;
