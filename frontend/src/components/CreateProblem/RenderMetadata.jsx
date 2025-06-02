import React, { useState } from 'react';
import { Card } from '../common';
import { Building2, Lightbulb, Tag, Tags, X } from 'lucide-react';
import { COMPANIES_NAME, TAG_OPTIONS } from '../../constants/problemDetails';
import TabNavigationButtons from '../common/TabNavigationButtons';

const RenderMetadata = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [hints, setHints] = useState('');
  const [editorial, setEditorial] = useState('');

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleCompany = (company) => {
    setSelectedCompanies((prev) =>
      prev.includes(company) ? prev.filter((c) => c !== company) : [...prev, company]
    );
  };

  return (
    <div className="space-y-4">
      <Card title="Metadata" subTitle="Additional information">
        <div className="card border-dashed border-1 border-base-300 bg-base-50 p-3">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4" />
            Tags
          </div>
          <div className="card-body p-3">
            <div className="flex flex-wrap items-center gap-2">
              {selectedTags.map((tag) => (
                <div
                  key={tag}
                  className="badge badge-primary cursor-pointer"
                  onClick={() => toggleTag(tag)}
                >
                  {tag} <X className="w-4 h-4" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
              {TAG_OPTIONS.filter((tag) => !selectedTags.includes(tag)).map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className="btn btn-outline btn-sm cursor-pointer p-1"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="card border-dashed border-1 border-base-300 bg-base-50 p-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Companies
          </div>
          <div className="card-body p-3">
            <div className="flex flex-wrap items-center gap-2">
              {selectedCompanies.map((company) => (
                <div
                  key={company}
                  className="badge badge-secondary cursor-pointer"
                  onClick={() => toggleCompany(company)}
                >
                  {company} <X className="w-4 h-4" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
              {COMPANIES_NAME.filter((company) => !selectedCompanies.includes(company)).map(
                (company) => (
                  <button
                    key={company}
                    onClick={() => toggleCompany(company)}
                    className="btn btn-outline btn-sm cursor-pointer p-1"
                  >
                    {company}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        <div className="card border-dashed border-1 border-base-300 bg-base-50 p-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            Additional Content
          </div>
          <div className="card-body p-3">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Hints</span>
              </label>
              <textarea
                placeholder="Provide helpful hints for solving the problem..."
                className="textarea textarea-bordered w-full"
                value={hints}
                onChange={(e) => setHints(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Editorial</span>
              </label>
              <textarea
                placeholder="Write a detailed editorial explaining the solution approach..."
                className="textarea textarea-bordered w-full min-h-[150px]"
                value={editorial}
                onChange={(e) => setEditorial(e.target.value)}
              />
            </div>
          </div>
        </div>
      </Card>
      <TabNavigationButtons />
    </div>
  );
};

export default RenderMetadata;
