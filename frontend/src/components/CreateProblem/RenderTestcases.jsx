import { useState } from 'react';
import { Card } from '../common';
import { Plus, Trash2 } from 'lucide-react';
import TabNavigationButtons from '../common/TabNavigationButtons';

const RenderTestcases = () => {
  const [testcases, setTestcases] = useState([
    { input: '', output: '' },
    { input: '', output: '' },
  ]);

  const addTestcase = () => {
    setTestcases([...testcases, { input: '', output: '' }]);
  };

  const removeTestcase = (index) => {
    if (testcases.length > 2) {
      setTestcases(testcases.filter((_, i) => i !== index));
    }
  };

  const updateTestcase = (index, field, value) => {
    const updateTestcase = testcases.map((testcases, i) =>
      i === index ? { ...testcases, [field]: value } : testcases
    );
    setTestcases(updateTestcase);
  };

  return (
    <div className="space-y-4">
      <Card
        title={
          <div className="flex items-center w-full justify-between">
            <span>Testcases</span>
            <button onClick={addTestcase} className="btn btn-sm btn-primary">
              <Plus className="w-4 h-4" />
              Add Testcase
            </button>
          </div>
        }
        subTitle="Provide clear testcases with input and output"
      >
        <div className="space-y-4 grid grid-cols-2 gap-3">
          {testcases.map((testcase, index) => (
            <div
              key={index}
              className="h-full card border-dashed border-1 border-base-300 bg-base-50"
            >
              <div className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">Testcase {index + 1}</h3>
                  {testcases.length > 2 && (
                    <button onClick={() => removeTestcase(index)} className="btn btn-ghost btn-sm">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              <div className="card-body p-4 pt-0">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-sm">Input</span>
                  </label>
                  <textarea
                    placeholder="Input"
                    className="textarea textarea-bordered w-full"
                    value={testcase.input}
                    onChange={(e) => updateTestcase(index, 'input', e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-sm">Output</span>
                  </label>
                  <textarea
                    placeholder="Output"
                    className="textarea textarea-bordered w-full"
                    value={testcase.output}
                    onChange={(e) => updateTestcase(index, 'output', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <TabNavigationButtons />
    </div>
  );
};

export default RenderTestcases;
