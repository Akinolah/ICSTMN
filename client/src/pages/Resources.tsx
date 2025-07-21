import React, { useState } from 'react';
import { 
  FileText, 
  BookOpen, 
  Download, 
  Search, 
  Filter,
  ExternalLink,
  Star,
  Calendar,
  User,
  Tag,
  Heart
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

const Resources: React.FC = () => {
  const { resources, downloadResource, toggleFavoriteResource, getUserResources } = useApp();
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const userResources = user ? getUserResources(user.id) : [];

  const categories = [
    { key: 'all', label: 'All Resources', count: resources.length },
    { key: 'guidelines', label: 'Guidelines', count: resources.filter(r => r.category === 'guidelines').length },
    { key: 'research', label: 'Research', count: resources.filter(r => r.category === 'research').length },
    { key: 'career', label: 'Career Development', count: resources.filter(r => r.category === 'career').length },
    { key: 'assessment', label: 'Assessments', count: resources.filter(r => r.category === 'assessment').length },
    { key: 'finance', label: 'Finance', count: resources.filter(r => r.category === 'finance').length },
    { key: 'leadership', label: 'Leadership', count: resources.filter(r => r.category === 'leadership').length }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const isPublished = resource.status === 'published';
    return matchesCategory && matchesSearch && isPublished;
  });

  const featuredResources = resources.filter(resource => resource.featured && resource.status === 'published');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleDownload = (resource: any) => {
    if (!user) {
      alert('Please log in to download resources');
      return;
    }
    
    downloadResource(resource.id, user.id);
    alert(`Downloaded: ${resource.title}`);
  };

  const handleToggleFavorite = (resource: any) => {
    if (!user) {
      alert('Please log in to save favorites');
      return;
    }
    
    toggleFavoriteResource(resource.id, user.id);
  };

  const isResourceFavorited = (resourceId: string) => {
    return userResources.some(ur => ur.resourceId === resourceId && ur.isFavorite);
  };

  const hasDownloadedResource = (resourceId: string) => {
    return userResources.some(ur => ur.resourceId === resourceId);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 to-emerald-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Professional Resources</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            Access our comprehensive library of professional development resources, research publications, 
            guidelines, and tools designed to support your career growth and professional excellence.
          </p>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Resources</h2>
            <p className="text-xl text-gray-600">
              Our most popular and recently updated professional resources.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredResources.slice(0, 3).map((resource) => (
              <div
                key={resource.id}
                className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200 hover:border-green-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{resource.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{resource.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{resource.type} • {resource.size}</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-amber-400 fill-current mr-1" />
                    {resource.rating}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleDownload(resource)}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 px-4 rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-colors flex items-center justify-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </button>
                  <button 
                    onClick={() => handleToggleFavorite(resource)}
                    className={`p-2 rounded-lg border transition-colors ${
                      isResourceFavorited(resource.id) 
                        ? 'bg-red-50 border-red-200 text-red-600' 
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isResourceFavorited(resource.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-64">
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category.key} value={category.key}>
                    {category.label} ({category.count})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredResources.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No resources found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((resource) => (
                <div
                  key={resource.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex items-center space-x-2">
                        {hasDownloadedResource(resource.id) && (
                          <span className="w-2 h-2 bg-emerald-500 rounded-full" title="Downloaded"></span>
                        )}
                        <div className="flex items-center text-sm text-gray-500">
                          <Download className="w-4 h-4 mr-1" />
                          {resource.downloads}
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {resource.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {resource.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {resource.author}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(resource.date)}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{resource.type} • {resource.size}</span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-amber-400 fill-current mr-1" />
                          {resource.rating}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleDownload(resource)}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </button>
                      <button 
                        onClick={() => handleToggleFavorite(resource)}
                        className={`p-2 rounded-lg border transition-colors ${
                          isResourceFavorited(resource.id) 
                            ? 'bg-red-50 border-red-200 text-red-600' 
                            : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isResourceFavorited(resource.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Resource Request */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
            <p className="text-xl mb-6 text-green-100">
              Request specific resources or suggest new content that would benefit our professional community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Request Resource
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
                Suggest Content
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;