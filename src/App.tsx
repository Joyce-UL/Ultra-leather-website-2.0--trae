import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { productApi } from './services/api';

function App() {
  const [language] = useState<'zh' | 'en'>('zh');
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 获取精选产品
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await productApi.getFeaturedProducts();
        setFeaturedProducts(data);
      } catch (error) {
        setError(language === 'zh' ? '获取产品失败，请稍后重试' : 'Failed to fetch products, please try again later');
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, [language]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gray-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {language === 'zh' ? '高品质人造皮革解决方案' : 'High-Quality Artificial Leather Solutions'}
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                  {language === 'zh' 
                    ? '澳丽德新材料致力于研发和生产环保、高品质的人造皮革，为全球客户提供专业的材料解决方案' 
                    : 'Ultra Leather is committed to developing and producing environmentally friendly, high-quality artificial leather, providing professional material solutions for global customers'}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="/products" className="bg-white text-gray-900 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition duration-300">
                    {language === 'zh' ? '探索产品' : 'Explore Products'}
                  </a>
                  <a href="/contact" className="border border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white hover:text-gray-900 transition duration-300">
                    {language === 'zh' ? '联系我们' : 'Contact Us'}
                  </a>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                  <img 
                    src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=high%20quality%20artificial%20leather%20texture%20close%20up%2C%20modern%20minimalist%20style%2C%20black%20and%20white%20photography&image_size=landscape_16_9" 
                    alt="高品质人造皮革" 
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white text-gray-900 p-4 rounded-md shadow-lg">
                  <p className="font-semibold">{language === 'zh' ? '环保认证' : 'Eco-Certified'}</p>
                  <p className="text-sm text-gray-600">REACH, GRS, OEKO TEX, ROHS</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {language === 'zh' ? '产品精选' : 'Featured Products'}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {language === 'zh' 
                  ? '我们提供多种高品质人造皮革产品，满足不同行业的需求' 
                  : 'We offer a variety of high-quality artificial leather products to meet the needs of different industries'}
              </p>
            </div>
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
                    productApi.getFeaturedProducts().then(data => setFeaturedProducts(data)).catch(() => setError(language === 'zh' ? '获取产品失败，请稍后重试' : 'Failed to fetch products, please try again later')).finally(() => setLoading(false));
                  }}
                  className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800"
                >
                  {language === 'zh' ? '重试' : 'Retry'}
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredProducts.map((product, index) => (
                    <div key={product.id || index} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300">
                      <div className="aspect-w-4 aspect-h-3">
                        <img 
                          src={product.image} 
                          alt={language === 'zh' ? product.name : product.nameEn} 
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {language === 'zh' ? product.name : product.nameEn}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {language === 'zh' ? product.description : product.descriptionEn}
                        </p>
                        <a href={`/products/${product.id}`} className="text-gray-900 font-medium hover:text-gray-600">
                          {language === 'zh' ? '查看详情' : 'View Details'} →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
                {featuredProducts.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-gray-600">
                      {language === 'zh' ? '暂无精选产品' : 'No featured products available'}
                    </p>
                  </div>
                )}
              </>
            )}
            <div className="mt-10 text-center">
              <a href="/products" className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                {language === 'zh' ? '查看全部产品' : 'View All Products'}
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                  <img 
                    src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20office%20environment%20with%20leather%20samples%2C%20minimalist%20style%2C%20black%20and%20white%20photography&image_size=landscape_16_9" 
                    alt="公司环境" 
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -top-4 -left-4 bg-gray-900 text-white p-4 rounded-md shadow-lg">
                  <p className="font-semibold">{language === 'zh' ? '10+ 年经验' : '10+ Years Experience'}</p>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {language === 'zh' ? '关于澳丽德' : 'About Ultra Leather'}
                </h2>
                <p className="text-gray-600 mb-6">
                  {language === 'zh' 
                    ? '东莞市澳丽德新材料有限公司成立于2010年，是一家专业生产高品质人造皮革的企业。我们致力于研发和生产环保、高品质的人造皮革产品，为全球客户提供专业的材料解决方案。' 
                    : 'Dongguan Ultra Leather New Material Co., Ltd. was established in 2010, specializing in the production of high-quality artificial leather. We are committed to developing and producing environmentally friendly, high-quality artificial leather products, providing professional material solutions for global customers.'}
                </p>
                <p className="text-gray-600 mb-8">
                  {language === 'zh' 
                    ? '我们拥有先进的生产设备和专业的研发团队，不断创新和改进产品质量，满足不同行业的需求。我们的产品远销全球多个国家和地区，受到客户的一致好评。' 
                    : 'We have advanced production equipment and a professional R&D team, continuously innovating and improving product quality to meet the needs of different industries. Our products are exported to many countries and regions worldwide, receiving consistent praise from customers.'}
                </p>
                <a href="/about" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800">
                  {language === 'zh' ? '了解更多' : 'Learn More'}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Certification Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {language === 'zh' ? '环保认证' : 'Environmental Certifications'}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {language === 'zh' 
                  ? '我们的产品通过多项国际环保认证，确保产品的环保性和安全性' 
                  : 'Our products have passed multiple international environmental certifications, ensuring the environmental friendliness and safety of our products'}
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">REACH</div>
                <p className="text-gray-600 text-sm">{language === 'zh' ? '欧盟化学品法规' : 'EU Chemicals Regulation'}</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">GRS</div>
                <p className="text-gray-600 text-sm">{language === 'zh' ? '全球回收标准' : 'Global Recycled Standard'}</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">OEKO-TEX</div>
                <p className="text-gray-600 text-sm">{language === 'zh' ? '生态纺织品标准' : 'Eco-Tex Standard'}</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">ROHS</div>
                <p className="text-gray-600 text-sm">{language === 'zh' ? '有害物质限制' : 'Restriction of Hazardous Substances'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{language === 'zh' ? '联系我们' : 'Contact Us'}</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                {language === 'zh' 
                  ? '如果您对我们的产品感兴趣，或者有任何问题，请随时联系我们' 
                  : 'If you are interested in our products or have any questions, please feel free to contact us'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      {language === 'zh' ? '姓名' : 'Name'}
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white"
                      placeholder={language === 'zh' ? '您的姓名' : 'Your name'}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      {language === 'zh' ? '邮箱' : 'Email'}
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white"
                      placeholder={language === 'zh' ? '您的邮箱' : 'Your email'}
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      {language === 'zh' ? '留言' : 'Message'}
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white"
                      placeholder={language === 'zh' ? '您的留言' : 'Your message'}
                    ></textarea>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full bg-white text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition duration-300"
                    >
                      {language === 'zh' ? '提交' : 'Submit'}
                    </button>
                  </div>
                </form>
              </div>
              <div>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">{language === 'zh' ? '地址' : 'Address'}</h3>
                      <p className="text-gray-300">{language === 'zh' ? '东莞市XX区XX路XX号' : 'XX Road, XX District, Dongguan'}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">{language === 'zh' ? '电话' : 'Phone'}</h3>
                      <p className="text-gray-300">+86 769-XXXXXXX</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">{language === 'zh' ? '邮箱' : 'Email'}</h3>
                      <p className="text-gray-300">info@ultrapu.com</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">{language === 'zh' ? '关注我们' : 'Follow Us'}</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition duration-300">
                      <span className="sr-only">LinkedIn</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition duration-300">
                      <span className="sr-only">Facebook</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition duration-300">
                      <span className="sr-only">Instagram</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App