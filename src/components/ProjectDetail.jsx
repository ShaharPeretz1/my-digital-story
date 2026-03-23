import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import projectsData from '../public/projects/projects.json';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const project = projectsData.find(p => p.id === projectId);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            to="/projects"
            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-6 group"
          >
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </Link>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">{project.title}</h1>
          
          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {project.date}
            </span>
            
            {project.files && project.files.length > 0 && (
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                {project.files.length} file{project.files.length > 1 ? 's' : ''}
              </span>
            )}

            {project.images && project.images.length > 0 && (
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {project.images.length} image{project.images.length > 1 ? 's' : ''}
              </span>
            )}
          </div>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {project.tags.map((tag, idx) => (
                <span 
                  key={idx}
                  className="px-4 py-1.5 text-sm font-medium bg-blue-50 text-blue-700 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Description */}
        {project.description && (
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">About This Project</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>
        )}

        {/* Image Gallery */}
        {project.images && project.images.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Visual Preview</h2>
            
            {/* Main Image */}
            <div className="mb-6 rounded-lg overflow-hidden bg-gray-100">
              <img
                src={project.images[selectedImage]}
                alt={`${project.title} - Image ${selectedImage + 1}`}
                className="w-full h-auto max-h-[600px] object-contain"
              />
            </div>

            {/* Thumbnail Gallery */}
            {project.images.length > 1 && (
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                {project.images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all ${
                      selectedImage === idx 
                        ? 'ring-2 ring-blue-500 ring-offset-2' 
                        : 'hover:ring-2 hover:ring-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Image Counter */}
            <div className="text-center mt-4 text-sm text-gray-500">
              Image {selectedImage + 1} of {project.images.length}
            </div>
          </div>
        )}

        {/* Download Files */}
        {project.files && project.files.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Download Files</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.files.map((file, idx) => (
                <a
                  key={idx}
                  href={file.path}
                  download
                  className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    {/* File Icon */}
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-sm">
                      {file.type}
                    </div>
                    
                    <div>
                      <p className="font-medium text-gray-900 group-hover:text-blue-700">
                        {file.name}
                      </p>
                      <p className="text-sm text-gray-500">{file.type} File</p>
                    </div>
                  </div>

                  {/* Download Icon */}
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
