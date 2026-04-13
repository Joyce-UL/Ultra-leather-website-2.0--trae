import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { customerApi } from '../services/api';

const Contact: React.FC = () => {
  const [language] = useState<'zh' | 'en'>('zh');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    subject: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await customerApi.submitForm(formData);
      setSubmitSuccess(true);
      // 重置表单
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        subject: ''
      });
      // 3秒后重置成功状态
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (err) {
      setError(language === 'zh' ? '提交失败，请稍后重试' : 'Submission failed, please try again later');
      console.error('Error submitting form:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-4">
              {language === 'zh' ? '联系我们' : 'Contact Us'}
            </h1>
            <p className="text-xl text-gray-300">
              {language === 'zh' 
                ? '如果您对我们的产品感兴趣，或者有任何问题，请随时联系我们' 
                : 'If you are interested in our products or have any questions, please feel free to contact us'}
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {language === 'zh' ? '发送消息' : 'Send Message'}
                </h2>
                {submitSuccess ? (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                    <p>{language === 'zh' ? '消息发送成功！我们会尽快与您联系。' : 'Message sent successfully! We will contact you soon.'}</p>
                  </div>
                ) : error ? (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    <p>{error}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          {language === 'zh' ? '姓名 *' : 'Name *'}
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                          placeholder={language === 'zh' ? '您的姓名' : 'Your name'}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          {language === 'zh' ? '邮箱 *' : 'Email *'}
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                          placeholder={language === 'zh' ? '您的邮箱' : 'Your email'}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          {language === 'zh' ? '电话' : 'Phone'}
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                          placeholder={language === 'zh' ? '您的电话' : 'Your phone'}
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                          {language === 'zh' ? '公司' : 'Company'}
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                          placeholder={language === 'zh' ? '您的公司' : 'Your company'}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        {language === 'zh' ? '主题' : 'Subject'}
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                      >
                        <option value="">{language === 'zh' ? '请选择主题' : 'Please select a subject'}</option>
                        <option value="product">{language === 'zh' ? '产品咨询' : 'Product Inquiry'}</option>
                        <option value="price">{language === 'zh' ? '价格咨询' : 'Price Inquiry'}</option>
                        <option value="custom">{language === 'zh' ? '定制需求' : 'Custom Requirements'}</option>
                        <option value="other">{language === 'zh' ? '其他' : 'Other'}</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        {language === 'zh' ? '留言 *' : 'Message *'}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                        placeholder={language === 'zh' ? '您的留言' : 'Your message'}
                      ></textarea>
                    </div>
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gray-900 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {language === 'zh' ? '发送中...' : 'Sending...'}
                          </div>
                        ) : (
                          language === 'zh' ? '发送消息' : 'Send Message'
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Contact Info */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {language === 'zh' ? '联系信息' : 'Contact Information'}
                </h2>
                <div className="space-y-8">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center text-white">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">{language === 'zh' ? '地址' : 'Address'}</h3>
                        <p className="text-gray-600">{language === 'zh' ? '东莞市XX区XX路XX号' : 'XX Road, XX District, Dongguan'}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center text-white">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">{language === 'zh' ? '电话' : 'Phone'}</h3>
                        <p className="text-gray-600">+86 769-XXXXXXX</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center text-white">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">{language === 'zh' ? '邮箱' : 'Email'}</h3>
                        <p className="text-gray-600">info@ultrapu.com</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center text-white">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">{language === 'zh' ? '工作时间' : 'Working Hours'}</h3>
                        <p className="text-gray-600">{language === 'zh' ? '周一至周五: 9:00 - 18:00' : 'Monday to Friday: 9:00 - 18:00'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">{language === 'zh' ? '关注我们' : 'Follow Us'}</h3>
                    <div className="flex space-x-4">
                      <a href="#" className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center text-white hover:bg-gray-800 transition duration-300">
                        <span className="sr-only">LinkedIn</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <a href="#" className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center text-white hover:bg-gray-800 transition duration-300">
                        <span className="sr-only">Facebook</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <a href="#" className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center text-white hover:bg-gray-800 transition duration-300">
                        <span className="sr-only">Instagram</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Map */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">{language === 'zh' ? '位置' : 'Location'}</h3>
                    <div className="h-64 bg-gray-200 rounded-lg overflow-hidden">
                      <img 
                        src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20office%20building%20exterior%2C%20minimalist%20style%2C%20black%20and%20white%20photography&image_size=landscape_16_9" 
                        alt="公司位置" 
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              {language === 'zh' ? '常见问题' : 'Frequently Asked Questions'}
            </h2>
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <button className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none">
                  <span className="font-medium text-gray-900">{language === 'zh' ? '如何获取产品样品？' : 'How to get product samples?'}</span>
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="px-6 py-4 border-t border-gray-200">
                  <p className="text-gray-600">
                    {language === 'zh' 
                      ? '您可以通过联系我们的客服团队，提供您的具体需求，我们会为您安排样品寄送。' 
                      : 'You can contact our customer service team, provide your specific needs, and we will arrange sample delivery for you.'}
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <button className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none">
                  <span className="font-medium text-gray-900">{language === 'zh' ? '产品的最小起订量是多少？' : 'What is the minimum order quantity?'}</span>
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="px-6 py-4 border-t border-gray-200">
                  <p className="text-gray-600">
                    {language === 'zh' 
                      ? '不同产品的最小起订量不同，一般为500米。具体请联系我们的销售团队确认。' 
                      : 'The minimum order quantity varies for different products, generally 500 meters. Please contact our sales team for confirmation.'}
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <button className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none">
                  <span className="font-medium text-gray-900">{language === 'zh' ? '产品的交货期是多久？' : 'What is the delivery time?'}</span>
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="px-6 py-4 border-t border-gray-200">
                  <p className="text-gray-600">
                    {language === 'zh' 
                      ? '常规产品的交货期为15-20个工作日，定制产品的交货期为25-30个工作日。' 
                      : 'The delivery time for regular products is 15-20 working days, and for custom products is 25-30 working days.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;