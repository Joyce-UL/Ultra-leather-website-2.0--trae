import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { productApi } from '../services/api';

interface Product {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  description: string;
  descriptionEn: string;
  price: string;
  priceEn: string;
  image: string;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

const Products: React.FC = () => {
  const [language] = useState<'zh' | 'en'>('zh');
  const [category, setCategory] = useState<string>('all');
  const [sort, setSort] = useState<string>('newest');
  const [search, setSearch] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 分类选项
  const categories = [
    { value: 'all', label: language === 'zh' ? '全部' : 'All' },
    { value: 'pu', label: language === 'zh' ? 'PU系列' : 'PU Series' },
    { value: 'suede', label: language === 'zh' ? '绒面系列' : 'Suede Series' },
    { value: 'golf', label: language === 'zh' ? '高尔夫专用' : 'Golf Special' },
    { value: 'special', label: language === 'zh' ? '特种材料' : 'Special Materials' }
  ];

  // 排序选项
  const sortOptions = [
    { value: 'newest', label: language === 'zh' ? '最新' : 'Newest' },
    { value: 'price_asc', label: language === 'zh' ? '价格从低到高' : 'Price Low to High' },
    { value: 'price_desc', label: language === 'zh' ? '价格从高到低' : 'Price High to Low' }
  ];

  // 从API获取产品数据
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await productApi.getProducts({
          category: category === 'all' ? undefined : category,
          sort,
          search
        });
        setProducts(data);
      } catch (error) {
        setError(language === 'zh' ? '获取产品失败，请稍后重试' : 'Failed to fetch products, please try again later');
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, sort, search, language]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-4">
              {language === 'zh' ? '产品中心' : 'Product Center'}
            </h1>
            <p className="text-xl text-gray-300">
              {language === 'zh' 
                ? '我们提供多种高品质人造皮革产品，满足不同行业的需求' 
                : 'We offer a variety of high-quality artificial leather products to meet the needs of different industries'}
            </p>
          </div>
        </section>

        {/* Filter and Search Section */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'zh' ? '分类' : 'Category'}
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'zh' ? '排序' : 'Sort'}
                  </label>
                  <select
                    id="sort"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="w-full md:w-64">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'zh' ? '搜索' : 'Search'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={language === 'zh' ? '搜索产品...' : 'Search products...'}
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="text-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto mb-4"></div>
                <p className="text-gray-600">
                  {language === 'zh' ? '加载中...' : 'Loading...'}
                </p>
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={() => {
                    setLoading(true);
                    productApi.getProducts({
                      category: category === 'all' ? undefined : category,
                      sort,
                      search
                    }).then(data => setProducts(data)).catch(() => setError(language === 'zh' ? '获取产品失败，请稍后重试' : 'Failed to fetch products, please try again later')).finally(() => setLoading(false));
                  }}
                  className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800"
                >
                  {language === 'zh' ? '重试' : 'Retry'}
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.map(product => (
                    <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300">
                      <div className="aspect-w-4 aspect-h-3">
                        <img 
                          src={product.image} 
                          alt={language === 'zh' ? product.name : product.nameEn} 
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {language === 'zh' ? product.name : product.nameEn}
                          </h3>
                          <span className="text-sm font-medium text-gray-900">
                            {language === 'zh' ? product.price : product.priceEn}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">
                          {language === 'zh' ? product.description : product.descriptionEn}
                        </p>
                        <a 
                          href={`/products/${product.id}`} 
                          className="inline-flex items-center text-gray-900 font-medium hover:text-gray-600"
                        >
                          {language === 'zh' ? '查看详情' : 'View Details'} →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
                {products.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-gray-600">
                      {language === 'zh' ? '没有找到匹配的产品' : 'No matching products found'}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">
              {language === 'zh' ? '需要定制产品？' : 'Need Custom Products?'}
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {language === 'zh' 
                ? '我们可以根据您的需求定制特殊规格的人造皮革产品，欢迎联系我们' 
                : 'We can customize artificial leather products with special specifications according to your needs, please contact us'}
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-900 bg-white hover:bg-gray-100"
            >
              {language === 'zh' ? '联系我们' : 'Contact Us'}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Products;