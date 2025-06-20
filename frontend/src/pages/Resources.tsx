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
  Tag
} from 'lucide-react';

const Resources: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const resources = [
    {
      id: 1,
      title: 'Professional Ethics Guidelines 2024',
      description: 'Comprehensive guide to ethical practices and professional conduct standards for all members.',
      category: 'guidelines',
      type: 'PDF',
      size: '2.5 MB',
      downloads: 1250,
      rating: 4.8,
      date: '2024-01-15',
      author: 'Ethics Committee',
      featured: true
    },
    {
      id: 2,
      title: 'Industry Trends Report - Q1 2024',
      description: 'Latest trends, insights, and forecasts across various professional sectors in Nigeria.',
      category: 'research',
      type: 'PDF',
      size: '4.2 MB',
      downloads: 890,
      rating: 4.6,
      date: '2024-02-01',
      author: 'Research Team',
      featured: true
    },
    {
      id: 3,
      title: 'Career Development Toolkit',
      description: 'Essential tools and templates for career planning, goal setting, and professional growth.',
      category: 'career',
      type: 'ZIP',
      size: '8.7 MB',
      downloads: 2100,
      rating: 4.9,
      date: '2024-01-10',
      author: 'Professional Development',
      featured: false
    },
    {
      id: 4,
      title: 'Best Practices in Project Management',
      description: 'Proven methodologies and frameworks for successful project delivery in Nigerian context.',
      category: 'guidelines',
      type: 'PDF',
      size: '3.1 MB',
      downloads: 1456,
      rating: 4.7,
      date: '2024-02-10',
      author: 'Project Management Committee',
      featured: false
    },
    {
      id: 5,
      title: 'Digital Skills Assessment Framework',
      description: 'Comprehensive framework for assessing and developing digital competencies in the workplace.',
      category: 'assessment',
      type: 'PDF',
      size: '1.8 MB',
      downloads: 673,
      rating: 4.5,
      date: '2024-02-20',
      author: 'Digital Innovation Team',
      featured: false
    },
    {
      id: 6,
      title: 'Professional Networking Strategies',
      description: 'Effective strategies for building and maintaining professional relationships and networks.',
      category: 'career',
      type: 'PDF',
      size: '2.3 MB',
      downloads: 987,
      rating: 4.6,
      date: '2024-01-28',
      author: 'Member Services',
      featured: false
    },
    {
      id: 7,
      title: 'Financial Planning for Professionals',
      description: 'Guide to personal financial management, investment strategies, and retirement planning.',
      category: 'finance',
      type: 'PDF',
      size: '5.4 MB',
      downloads: 1834,
      rating: 4.8,
      date: '2024-02-05',
      author: 'Financial Advisory Board',
      featured: true
    },
    {
      id: 8,
      title: 'Leadership in the Modern Workplace',
      description: 'Contemporary leadership approaches and techniques for effective team management.',
      category: 'leadership',
      type: 'PDF',
      size: '3.7 MB',
      downloads: 1299,
      rating: 4.7,
      date: '2024-01-22',
      author: 'Leadership Institute',
      featured: false
    }
  ];

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
    return matchesCategory && matchesSearch;
  });

  const featuredResources = resources.filter(resource => resource.featured);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-emerald-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Professional Resources</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
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
            {featuredResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-gradient-to-br from-blue-50 to-emerald-50 p-6 rounded-2xl border border-blue-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center">
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
                
                <button className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-emerald-700 transition-colors flex items-center justify-center">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </button>
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-64">
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Download className="w-4 h-4 mr-1" />
                        {resource.downloads}
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
                      <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </button>
                      <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <ExternalLink className="w-4 h-4 text-gray-600" />
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
          <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
            <p className="text-xl mb-6 text-blue-100">
              Request specific resources or suggest new content that would benefit our professional community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Request Resource
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
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