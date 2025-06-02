import { useState } from 'react';
import { Card } from '../common';
import { Plus, Trash2 } from 'lucide-react';
import TabNavigationButtons from '../common/TabNavigationButtons';

const RenderExamples = () => {
  const [examples, setExamples] = useState([
    { input: '', output: '', explanation: '' },
    { input: '', output: '', explanation: '' },
  ]);

  const addExample = () => {
    setExamples([...examples, { input: '', output: '', explanation: '' }]);
  };

  const removeExample = (index) => {
    if (examples.length > 2) {
      setExamples(examples.filter((_, i) => i !== index));
    }
  };

  const updateExample = (index, field, value) => {
    const updatedExamples = examples.map((example, i) =>
      i === index ? { ...example, [field]: value } : example
    );
    setExamples(updatedExamples);
  };

  return (
    <div className="space-y-4">
      <Card
        title={
          <div className="flex items-center w-full justify-between">
            <span>Examples</span>
            <button onClick={addExample} className="btn btn-sm btn-primary">
              <Plus className="w-4 h-4" />
              Add Example
            </button>
          </div>
        }
        subTitle="Provide clear examples with input, output, and explanations"
      >
        <div className="space-y-4 grid grid-cols-2 gap-3">
          {examples.map((example, index) => (
            <div
              key={index}
              className="h-full card border-dashed border-1 border-base-300 bg-base-50"
            >
              <div className="card-header p-4 pb-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">Example {index + 1}</h3>
                  {examples.length > 2 && (
                    <button onClick={() => removeExample(index)} className="btn btn-ghost btn-sm">
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
                    placeholder="Example input"
                    className="textarea textarea-bordered w-full"
                    value={example.input}
                    onChange={(e) => updateExample(index, 'input', e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-sm">Output</span>
                  </label>
                  <textarea
                    placeholder="Expected output"
                    className="textarea textarea-bordered w-full"
                    value={example.output}
                    onChange={(e) => updateExample(index, 'output', e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-sm">Explanation</span>
                  </label>
                  <textarea
                    placeholder="Explain the example"
                    className="textarea textarea-bordered w-full"
                    value={example.explanation}
                    onChange={(e) => updateExample(index, 'explanation', e.target.value)}
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

export default RenderExamples;
