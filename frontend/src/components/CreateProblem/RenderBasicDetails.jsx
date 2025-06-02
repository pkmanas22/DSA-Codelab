import { Card } from '../common';
import TabNavigationButtons from '../common/TabNavigationButtons';

const RenderBasicDetails = () => {
  return (
    <>
      <Card title="Problem Details" subTitle="Basic information about the problem">
        <div className="form-control w-full space-y-3">
          <div>
            <label htmlFor="title" className="label">
              Problem Title
            </label>
            <input
              type="text"
              placeholder="e.g., Two Sum"
              className="input w-full"
              // {...register}
              // value={title}
              // onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="label">Difficulty</label>
            <select defaultValue="title" className="select w-full">
              <option disabled value="title">
                Select Difficulty
              </option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
          <div>
            <label className="label">Problem Descriptions</label>
            <textarea
              type="text"
              placeholder="Describe the problem in details"
              className="textarea w-full"
              // {...register}
              // value={title}
              // onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="label">Constraints</label>
            <textarea
              type="text"
              placeholder="e.g., 0 <= nums[i] <= 1000"
              className="textarea w-full"
              // {...register}
              // value={title}
              // onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
      </Card>
      <TabNavigationButtons />
    </>
  );
};

export default RenderBasicDetails;
